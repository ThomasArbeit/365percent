import usePlayingQuestService from "~/service/quest/usePlayingQuestService";
import { BaseSetup } from "~/setup/BaseSetup";

export type QuestFinishSetupProps = {};
export type QuestFinishSetupEmits = {(event: 'click'):void};


export default class QuestFinishSetup extends BaseSetup<QuestFinishSetupProps, QuestFinishSetupEmits> {
  public finishedQuest = usePlayingQuestService.getInstance().quest;

  constructor(props: QuestFinishSetupProps, emits: QuestFinishSetupEmits) {
    super(props, emits);
  }

  protected override onUnmounted(): void {
    usePlayingQuestService.getInstance().reset()
  }

}