import type { QuestModalSetupProps } from "~/components/app/quest/QuestModal.setup";
import { BaseEntity } from "./BaseEntity";
import { addQuest } from "~/utils/quest/addQuest";
import usePlayingQuestService from "~/service/quest/usePlayingQuestService";
import {ref} from 'vue';
import type { QuestType } from "../types/QuestType";
import { startQuest } from "~/utils/quest/startQuest";
import { pauseQuest } from "~/utils/quest/pauseQuest";

export default class QuestEntity extends BaseEntity<QuestType> {
  isRunning = ref(false)
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

  public get durationSeconds() : number{
    return this.data.duration_seconds ?? 0;
  }
  public set durationSeconds(v : number) {
    this.data.duration_seconds = v;
  }

  public get formattedTime () {
    return formatTime(this.durationSeconds);
  }

  async addQuestAsync () { 
    const response = await addQuest(this.data, this.userId);
    this.id = response.data?.[0].id;
  }

  async startQuest () {
    const service = usePlayingQuestService.getInstance();
    service.setPlayingQuest(this)
    await startQuest(this.id, this.userId);
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
      this.durationSeconds++;
    }, 1000)
  }
  
  async stop () {
    await pauseQuest(this.id, this.userId, this.durationSeconds);
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