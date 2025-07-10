import { BaseSetup } from "~/setup/BaseSetup";

export type LevelBarSetupProps = {
  xp: number;
  level: string;
  xpToNext: number;
  xpCurrentLevel: number;
};
export type LevelBarSetupEmits = {(event: 'click'):void}

export default class LevelBarSetup extends BaseSetup<LevelBarSetupProps, LevelBarSetupEmits> {
  // progressPercent: number;
  constructor(props: LevelBarSetupProps, emits: LevelBarSetupEmits) {
    super(props, emits);
    // this.progressPercent = this.computeProgress();
  }
  computeProgress(): number {
    const gained = this.props.xp - this.props.xpCurrentLevel;
    const total = this.props.xpToNext - this.props.xpCurrentLevel;
    return Math.min(100, Math.max(0, (gained / total) * 100));
  }

  get progressPercent ():number {
    return 100 * this.props.xpCurrentLevel / this.props.xp;
  }
}