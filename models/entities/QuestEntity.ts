import { BaseEntity } from "./BaseEntity";
import { addQuest } from "~/utils/quest/addQuest";
import usePlayingQuestService from "~/service/quest/usePlayingQuestService";
import {ref} from 'vue';
import type { QuestType } from "../types/QuestType";
import { startQuest } from "~/utils/quest/startQuest";
import { pauseQuest } from "~/utils/quest/pauseQuest";
import { finishQuest } from "~/utils/quest/finishQuest";
import useFinishedQuestsTodayService from "~/service/quest/useFinishedQuestsTodayService";
import useAuthService from "~/service/auth/useAuthService";
import { addXPToUser } from "~/utils/user/addXpToUser";

export default class QuestEntity extends BaseEntity<QuestType> {
  isRunning = ref(false)
  interval: ReturnType<typeof setInterval> | null = null
  wasRunning = ref(false);
  timeInterval = ref(0);
  userId = useAuthService.getInstance().user?.id;

  constructor(quest?: QuestType) {
    super();
    if (quest) this.assignData(quest);
    this.setTimeInterval();
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

  public get domain() : string | null {
    return this.data.domain ?? null;
  }
  public set domain(v : string) {
    this.data.domain = v;
  }

  public get status() : string {
    return this.data.status ?? 'pending';
  }

  public get isFinished(): boolean {
    return this.status === 'finished';
  }

  public get xpReward (): number {
    return this.data.xp_reward ?? 0;
  }
  

  public get durationSeconds() : number{
    return this.data.duration_seconds ?? 0;
  }
  public set durationSeconds(v : number) {
    this.data.duration_seconds = v;
  }

  public get formattedTime () {
    return formatTime(this.timeInterval.value);
  }

  async addQuestAsync () {
    if(!this.userId) return;
    const response = await addQuest(this.data, this.userId);
    this.id = response.data?.[0].id;
    return response.data?.[0];
  }

  async startQuest () {
    const service = usePlayingQuestService.getInstance();
    service.setPlayingQuest(this)
    await this.toggle();
  }
  
  async toggle () {
    if(!this.userId) return;
    if (this.isRunning.value) {
      await this.stop()
    } else {
      this.data.started_at = new Date().toISOString();
      this.setTimeInterval();
      await this.start();
      await startQuest(this.id, this.userId);
    }
  }

  setTimeInterval () {
    this.timeInterval.value = Math.floor((Date.now() - new Date(this.data.started_at ?? new Date()).getTime()) / 1000) + (this.data.duration_seconds ?? 0);
  }
  
  async start () {
    this.isRunning.value = true
    this.interval = setInterval(() => {
      this.setTimeInterval();
    }, 1000)
  }
  
  async stop () {
    if(!this.userId) return;
    await pauseQuest(this.id, this.userId, this.timeInterval.value);
    this.data.duration_seconds = this.timeInterval.value;
    this.isRunning.value = false
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  async finish () {
    if(!this.userId) return;
    await finishQuest(this.id, this.userId, this.timeInterval.value);
    await addXPToUser(this.userId, this.timeInterval.value);
    this.data.duration_seconds = this.timeInterval.value;
    this.data.status = 'finished';
    this.data.xp_reward = this.timeInterval.value;
    useFinishedQuestsTodayService.getInstance().addFinishedQuest(this.data);
    useAuthService.getInstance().user?.addXpToTotal(this.timeInterval.value);
    this.isRunning.value = false
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.router.push({name: 'Questfinish'});
  }

  clearInterval() {
    if (this.interval) clearInterval(this.interval);
  }
}