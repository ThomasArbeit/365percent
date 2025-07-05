import QuestEntity from "~/models/entities/QuestEntity";
import type { QuestType } from "~/models/types/QuestType";
import { BaseSetup } from "~/setup/BaseSetup";
export type QuestModalSetupProps = { entity: QuestEntity }
export type QuestModalSetupEmit = {
  (event: 'add', newQuest: any): void, 
  (event: 'start'): void
}

export class QuestModalSetup extends BaseSetup<QuestModalSetupProps, QuestModalSetupEmit> {
  quest: QuestEntity

  constructor(props: QuestModalSetupProps, emits: QuestModalSetupEmit) {
    super(props, emits);
    this.quest = this.props.entity;
  }

  async addQuest() {
    const response = await this.quest.addQuestAsync();
    this.emits?.('add', response);
  }
}