import { BaseSetup } from "~/setup/BaseSetup";
import * as icons from "lucide-vue-next";

export type IconSetupProps = {
  name: string,
  size?: number,
  color?: string,
  strokeWidth?: number,
  defaultClass?: string
};
export type IconSetupEmit = {};

export default class IconSetup extends BaseSetup<IconSetupProps, IconSetupEmit> {
  constructor(props: IconSetupProps) {
    super(props);
  }

  get icon () {
    return icons[this.props.name];
  }
}