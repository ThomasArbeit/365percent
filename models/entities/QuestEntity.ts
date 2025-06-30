import type { QuestModalSetupProps } from "~/components/app/quest/QuestModal.setup";
import { BaseEntity } from "./BaseEntity";
import { addQuest } from "~/utils/quest/addQuest";
import usePlayingQuestService from "~/service/quest/usePlayingQuestService";
import {ref} from 'vue';
import type { QuestType } from "../types/QuestType";

export default class QuestEntity extends BaseEntity<QuestType> {
  isRunning = ref(false)
  elapsed = ref(0) // en secondes
  interval: ReturnType<typeof setInterval> | null = null
  wasRunning = ref(false);

  constructor(quest: QuestType) {
    super(quest);
  }
  public get title() : string | undefined {
    return this.data.title;
  }
  public set title(v : string) {
    this.data.title = v;
  }
  
  public get description() : string | undefined {
    return this.data.description;
  }
  public set description(v : string) {
    this.data.description = v;
  }

  public get domain() : string | undefined {
    return this.data.domain;
  }
  public set domain(v : string) {
    this.data.domain = v;
  }

  public get formattedTime () {
    return formatTime(this.elapsed.value);
  }

  async addQuestAsync () { 
    const response = await addQuest(this.data, this.self.user.value.id);
    this.id = response.data?.[0].id;
  }

  startQuest () {
    const service = usePlayingQuestService.getInstance();
    service.setPlayingQuest(this)
    this.toggle();
  }
  
  toggle () {
    if (this.isRunning.value) {
      this.stop()
    } else {
      this.start()
    }
  }
  
  start () {
    this.isRunning.value = true
    this.interval = setInterval(() => {
      this.elapsed.value++
    }, 1000)
  }
  
  stop () {
    this.isRunning.value = false
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  clearInterval() {
    if (this.interval) clearInterval(this.interval);
  }
}