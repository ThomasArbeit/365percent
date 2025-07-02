import { BaseSetup } from "~/setup/BaseSetup";
import QuestEntity from "~/models/entities/QuestEntity";
import type { QuestType } from "~/models/types/QuestType";
export type QuestStickerProps = QuestType
export type QuestStickerEmit = {
  (e: 'click', val: QuestEntity): void; 
};

export default class QuestStickerSetup extends BaseSetup<QuestStickerProps, QuestStickerEmit> {
  quest: QuestEntity;

  constructor(props: QuestStickerProps, emits: QuestStickerEmit) {
    super(props,emits);
    // console.log(props.duration_seconds);
    this.quest = new QuestEntity(props);
  }

  get isSameQuestAsRunning () {
    return this.quest.id === this.playingQuest.questId.value;
  }

  protected override onMounted(): void {
    watch(this.playingQuest.questId, (val) => {
      if (this.isSameQuestAsRunning && this.playingQuest.quest) {
        this.quest = this.playingQuest.quest;
      }
    })
  }
}