import QuestEntity from "~/models/entities/QuestEntity";
import type { QuestType } from "~/models/types/QuestType";
import { getFinishedQuestsTodayByUserId } from "~/utils/quest/getFinishedQuestsToday";
import { getPlayingQuest } from "~/utils/quest/getPlayingQuest";
import useAuthService from "../auth/useAuthService";

export default class useFinishedQuestsTodayService {
  private static instance: useFinishedQuestsTodayService | null = null;

  self = useAuthService.getInstance();
  finishedQuests = ref<QuestType[]>([]);
  
  constructor () {
    this.init();
  }

  static getInstance (): useFinishedQuestsTodayService {
    if (!this.instance) this.instance = new useFinishedQuestsTodayService();
    return this.instance;
  }

  get finishedQuestsSortedByDomain () {
    const groupedMap = new Map<string, number>();

    for (const quest of this.finishedQuests.value) {
      const domain = quest.domain || 'inconnu';
      const currentXp = groupedMap.get(domain) || 0;
      groupedMap.set(domain, currentXp + (quest.xp_reward ?? 0));
    }

    return Array.from(groupedMap.entries()).map(([domain, xp]) => ({
      domain,
      xp
    }));
  }

  get totalXp () {
    let total = 0;
    this.finishedQuestsSortedByDomain.forEach(q => {
      total += q.xp
    })
    return total;
  }

  private async getFinishedQuests () {
    const {data} = await getFinishedQuestsTodayByUserId(this.self.userId);
    this.finishedQuests.value = data;
  }

  public addFinishedQuest (quest: QuestType) {
    this.finishedQuests.value.push(quest);
  }

  async init() {
    await this.getFinishedQuests();
  }

}