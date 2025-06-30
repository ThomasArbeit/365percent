import type QuestEntity from "~/models/entities/QuestEntity";

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
    this.quest = undefined;
    this.questId.value = undefined;
    this.hasQuest.value = false;
  }
}