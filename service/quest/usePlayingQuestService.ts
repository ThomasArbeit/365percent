import QuestEntity from "~/models/entities/QuestEntity";
import type { QuestType } from "~/models/types/QuestType";
import { getPlayingQuest } from "~/utils/quest/getPlayingQuest";

export default class usePlayingQuestService {
  private static instance: usePlayingQuestService | null = null;

  public quest: QuestEntity | undefined;
  public hasQuest = ref<boolean>(false);
  public questId = ref<string | undefined>(undefined);

  static getInstance (): usePlayingQuestService {
    if (!this.instance) this.instance = new usePlayingQuestService();
    return this.instance;
  }

  setPlayingQuest(playingQuest: QuestEntity) {
    this.clearPlayingQuest();
    this.questId.value = playingQuest.id;
    this.quest = playingQuest;
    setTimeout(() => {
      this.hasQuest.value = true;
    }, 400);
  }
  
  
  clearPlayingQuest () {
    this.quest?.clearInterval();
    this.quest?.stop();
    this.reset();
  }
  
  reset () {
    this.quest = undefined;
    this.questId.value = undefined;
    this.hasQuest.value = false;
  }


  async getPlayingQuest (userId: QuestEntity['userId']) {
    const { data } = await getPlayingQuest(userId);
    if (data) {
      this.quest = new QuestEntity(data as QuestType);
      this.quest.durationSeconds = data.paused_at ? data.duration_seconds : getSecondsSince(data.started_at)
      this.quest.start();
      this.hasQuest.value = true;
      this.questId.value = this.quest.id;
    }
  }
}