import { getQuestsByUserId } from "~/utils/quest/getQuests";
import QuestEntity from "~/models/entities/QuestEntity";
import type { QuestType } from "~/models/types/QuestType";
import { BaseSetup } from "~/setup/BaseSetup";
type IndexSetupProps = {};
type IndexSetupEmit = {};
export default class IndexSetup extends BaseSetup<IndexSetupProps, IndexSetupEmit> {
  showModal = ref<boolean>(false);
  quests = ref<QuestType[]>([]);
  selectedQuest: QuestEntity;

  closeModal () {
    this.showModal.value = false;
    this.selectedQuest = new QuestEntity();
  }

  openModalQuest(quest?: QuestEntity) {
    this.showModal.value = true;
    this.selectedQuest = quest ?? new QuestEntity();
  }

  addQuestToList (quest: any) {
    this.quests.value.push(quest);
  }


  constructor(){
    super();
    this.selectedQuest = new QuestEntity();
  }

  protected override async onMounted() {
  if (this.self.userId) {
    const { data } = await getQuestsByUserId(this.self.userId);
    this.quests.value = data;
    this.playingQuest.getPlayingQuest(this.self.userId)
  } else {
    console.warn("User non initialisé");
  }
}
}
