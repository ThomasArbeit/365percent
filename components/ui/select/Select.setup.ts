import { BaseSetup } from "~/setup/BaseSetup";

export type SelectSetupProps = {
  modelValue: string,
  options?: Array<any>,
}
export type SelectSetupEmits = {
  (event: 'update:modelValue', value: any): void,
}

export default class SelectSetup extends BaseSetup<SelectSetupProps, SelectSetupEmits> {
  search = ref('');
  isOpen = ref(false);
  filteredOptions = ref(this.props.options ? [...this.props.options] : []);
  selectedTags = ref([]);

  constructor(props: SelectSetupProps, emits: SelectSetupEmits) {
    super(props, emits)
  }
}