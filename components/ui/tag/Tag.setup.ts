import { BaseSetup } from "~/setup/BaseSetup"

export type TagSetupProps = {
  label: string,
};
export type TagSetupEmits = {
  (event: 'click'): void;
};

export default class TagSetup extends BaseSetup<TagSetupProps, TagSetupEmits> {
  constructor(props: TagSetupProps, emits?: TagSetupEmits) {
    super(props, emits);
  }
}