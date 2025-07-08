import { BaseSetup } from "~/setup/BaseSetup"

export type SelectSetupProps = {
  modelValue: string | number | (string | number)[] | null,
  multiple: boolean,
  options?: any[]
  placeholder?: string
  label?: string
  optionLabel?: string
  optionValue?: string
  optionKey?: string
}

export type SelectSetupEmits = {
  (e: 'update:modelValue', value: any): void,
}

export class SelectSetup extends BaseSetup<SelectSetupProps, SelectSetupEmits> {

  isOpen = ref(false);
  search = ref('');
  
  constructor(props: SelectSetupProps, emits: SelectSetupEmits) {
    super(props, emits);
  }

  public get displaySelected() {
    if (this.isMultiple && Array.isArray(this.props.modelValue)) {
      const display = this.props.options
        ?.filter(option => this.props.modelValue?.includes(this.optionValue(option)))
        .map(option => this.optionLabel(option)) ?? [];
      return display;
    } else {
      const selected = this.props.options?.find(
        option => this.optionValue(option) === this.props.modelValue
      )
      return selected ? this.optionLabel(selected) : ''
    }
  }

  get isMultiple() {
    return this.props.multiple === true
  }

  public optionLabel = (option: any) => option[this.props.optionLabel ?? 'label']
  public optionValue = (option: any) => option[this.props.optionValue ?? 'value']
  public optionKey = (option: any) => option[this.props.optionKey ?? this.props.optionValue ?? 'value']
  public get filteredOptions () {
    if (this.search.value === '') return this.props.options;
    const lower = this.search.value.toLowerCase()
    return this.props.options?.filter(x => x[this.props.optionLabel ?? 'label'].toLowerCase().includes(lower))
  }
  
  public isSelected = (option: any) => {
    const value = this.optionValue(option)
    if (this.isMultiple && Array.isArray(this.props.modelValue)) {
      return this.props.modelValue.includes(value)
    }
    return this.props.modelValue === value
  }

  public selectOption (option: any) {
    console.log(option);
    const value = this.optionValue(option)
    if (this.isMultiple) {
      let current = (this.props.modelValue as any[]) ?? []
      if (current.includes(value)) {
        current = current.filter(v => v !== value)
      } else {
        current = [...current, value]
      }
      this.updateValue(current)
    } else {
      this.isSelected(option) ? this.updateValue(null) : this.updateValue(value);
      this.isOpen.value = false
    }
    this.search.value = '';
  }

  public toggleOpen = () => {
    this.isOpen.value = !this.isOpen.value
  }

  handleBlur = () => {
    setTimeout(() => {
      this.isOpen.value = false
    }, 100)
  }

  public updateValue(value: string | number | (string | number)[] | null) {
    console.log(value);
    this.emits?.('update:modelValue', value);
  }
}