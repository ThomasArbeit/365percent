import type { QuestType } from "~/models/types/QuestType";
import useFinishedQuestsTodayService from "~/service/quest/useFinishedQuestsTodayService";
import { BaseSetup } from "~/setup/BaseSetup"
import { getFinishedQuestsTodayByUserId } from "~/utils/quest/getFinishedQuestsToday";

export type DashboardCardSetupProps = {};
export type DashboardCardSetupEmits = {(event: 'click'):void};

export default class DashboardCardSetup extends BaseSetup<DashboardCardSetupProps, DashboardCardSetupProps> {

  finishedQuestTodayService = useFinishedQuestsTodayService.getInstance();

  constructor(props: DashboardCardSetupProps, emits: DashboardCardSetupEmits) {
    super(props, emits);
  }
}