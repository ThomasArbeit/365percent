
import useAuthService from "~/service/auth/useAuthService";
import usePlayingQuestService from "~/service/quest/usePlayingQuestService";
declare global {
  type SetupProps<T> = Readonly<import('vue').ExtractPropTypes<T>>
}

export class BaseSetup<P, E> {
props = {} as P;
emits?: E;
self = useAuthService.getInstance();
playingQuest = usePlayingQuestService.getInstance();
public router = useRouter();

constructor(props?: P, emits?: E) {
  this.props = props ?? {} as P;
  this.emits = emits;
  this.initHooks();
}

protected initHooks() {
  onMounted(() => this.onMounted());
  onUnmounted(() => this.onUnmounted());
}

protected onMounted() {};
protected onUnmounted() {};
}