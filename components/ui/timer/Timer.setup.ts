import { BaseSetup } from '~/setup/BaseSetup'

export type TimerSetupProps = {};
export type TimerSetupEmits = {};

export default class TimerSetup extends BaseSetup<TimerSetupProps, TimerSetupEmits> {
  isRunning = ref(false)
  elapsed = ref(0) // en secondes
  interval: ReturnType<typeof setInterval> | null = null
  wasRunning = ref(false);
  
  constructor (props: TimerSetupProps, emit: TimerSetupEmits) {
    super(props, emit);
  }

  protected override onMounted(): void {
    watch(this.isRunning, (newVal) => {
      if (newVal) this.wasRunning.value = true;
      else setTimeout(() => (this.wasRunning.value = false), 400);
    })
  }

  protected override onUnmounted(): void {
    if (this.interval) clearInterval(this.interval);
  }

  get formattedTime () {
    return formatTime(this.elapsed.value);
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
}