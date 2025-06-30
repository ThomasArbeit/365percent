import { BaseSetup } from "~/setup/BaseSetup"

type ModalSetupProps = SetupProps<typeof ModalSetup.props>
type ModalSetupEmit = (event: 'close') => void;
export class ModalSetup extends BaseSetup<ModalSetupProps> {
  static readonly props = {
    show: {
      type: Boolean,
      required: true,
    }
  };

  constructor(props: ModalSetupProps, private emit: ModalSetupEmit) {
    super(props);
    watch(() => props.show, (val) => {
      val ? this.disableScroll() : this.enableScroll();
      val ? this.translateY.value = 0 : null;
    })
  }

  modal = ref<HTMLElement | null>(null);
  content = ref<HTMLElement | null>(null);

  public startY = ref(0);
  public translateY = ref(0);
  public isDragging = ref(false);

  onTouchStart = (e: TouchEvent) => {
    this.startY.value = e.touches[0].clientY
    this.isDragging.value = false
  }

  onTouchMove = (e: TouchEvent) => {
    const currentY = e.touches[0].clientY
    const deltaY = currentY - this.startY.value

    const contentEl = this.content.value
    if (!contentEl) return

    const isAtTop = contentEl.scrollTop === 0

    // Glissement vers le bas, uniquement si le scroll est en haut
    if (deltaY > 0 && isAtTop) {
      e.preventDefault()
      this.translateY.value = deltaY
      this.isDragging.value = true
    }
  }

  onTouchEnd = () => {
    if (this.isDragging.value && this.translateY.value > 150) {
      this.emit('close')
    } else {
      this.translateY.value = 0;
    }
  }

  onDismiss = () => this.emit('close')

  // Bloquer le scroll en arrière-plan
  disableScroll = () => document.body.style.overflow = 'hidden'
  enableScroll = () => document.body.style.overflow = ''

  protected override onUnmounted(): void {
    this.enableScroll();
  }
}