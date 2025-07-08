import QuestEntity from "~/models/entities/QuestEntity";
import type { QuestType } from "~/models/types/QuestType";
import { BaseSetup } from "~/setup/BaseSetup";
import { getUserDomains } from "~/utils/domain/getUserDomain";
export type QuestModalSetupProps = { entity: QuestEntity }
export type QuestModalSetupEmit = {
  (event: 'add', newQuest: any): void, 
  (event: 'start'): void
}

export class QuestModalSetup extends BaseSetup<QuestModalSetupProps, QuestModalSetupEmit> {
  quest: QuestEntity
  userDomainOptions = ref([]);

  constructor(props: QuestModalSetupProps, emits: QuestModalSetupEmit) {
    super(props, emits);
    this.quest = this.props.entity;
  }

  async addQuest() {
    const response = await this.quest.addQuestAsync();
    this.emits?.('add', response);
  }

  get isSameQuestAsRunning () {
    return this.quest.id === this.playingQuest.questId.value;
  }

  protected override async onMounted(): Promise<void> {
    watch(this.playingQuest.questId, (val) => {
      if (this.isSameQuestAsRunning && this.playingQuest.quest) {
        this.quest = this.playingQuest.quest;
      }
    })
    const { data } =  await getUserDomains(this.self.userId);
    this.userDomainOptions.value = data;
  }
}