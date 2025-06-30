import { getQuestsByUserId } from "~/utils/quest/getQuests";
import type { QuestModalSetupProps } from "~/components/app/quest/QuestModal.setup";
import QuestEntity from "~/models/entities/QuestEntity";
import type { QuestType } from "~/models/types/QuestType";
import { BaseSetup } from "~/setup/BaseSetup";
type IndexSetupProps = {};
type IndexSetupEmit = {};
export default class IndexSetup extends BaseSetup<IndexSetupProps, IndexSetupEmit> {
  showModal = ref<boolean>(false);
  quests = ref<QuestEntity[]>([]);
  selectedQuest = ref<QuestEntity>();

  closeModal () {
    this.showModal.value = false;
    this.selectedQuest.value = undefined;
  }

  openModalQuest (quest?: QuestEntity) {
    this.showModal.value = true;
    this.selectedQuest.value = quest;
  }

  constructor(){
    super();
    this.selectedQuest.value = undefined;
  }

  protected override async onMounted() {
  if (this.self?.user?.value?.id) {
    const { data } = await getQuestsByUserId(this.self.user.value.id);
    this.quests.value = data;
  } else {
    console.warn("User non initialisé");
  }
}
}
