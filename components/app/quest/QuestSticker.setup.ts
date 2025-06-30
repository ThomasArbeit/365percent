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
    this.quest = new QuestEntity(props);
  }

  get isSameQuestAsRunning () {
    if (this.playingQuest.quest) {
      return this.quest.id === this.playingQuest.questId.value;
    }
  }
}