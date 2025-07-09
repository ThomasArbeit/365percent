import type { Ref } from 'vue';
import { BaseSetup } from "~/setup/BaseSetup";


export type TextAreaProps = {
  modelValue?: string,
  label?: string,
  placeholder?: string,
  variant?: string,
  size?: 'xl' | 'lg' | 'md' | 'sm',
}

export type TextAreaEmit = {
  (e: 'update:modelValue', value: string): void,
  (e: 'enter'): void,
}


export class TextAreaSetup extends BaseSetup<TextAreaProps, TextAreaEmit> {
  textarea: Ref<HTMLTextAreaElement | null>

  constructor(props: TextAreaProps, emits: TextAreaEmit, textarea: Ref<HTMLTextAreaElement | null>) {
    super(props, emits)
    this.textarea = textarea
  }

  protected override onMounted(): void {
    this.autoResize();
  }

  onInput = (e: Event) => {
    this.autoResize();
    const target = e.target as HTMLTextAreaElement;
    this.emits?.('update:modelValue', target.value)
  }

  autoResize = () => {
    if (!this.textarea.value) return;
    this.textarea.value.style.height = 'auto'
    this.textarea.value.style.height = `${this.textarea.value.scrollHeight}px`
  }
}