import type QuestEntity from "~/models/entities/QuestEntity";
import { BaseSetup } from "~/setup/BaseSetup";
export type FooterPlayerSetupProps = {};
export type FooterPlayerSetupEmits = {
  (e: 'click', val:QuestEntity):void;
};


export default class FooterPlayerSetup extends BaseSetup<FooterPlayerSetupProps,FooterPlayerSetupEmits> {
  constructor(props: FooterPlayerSetupProps, emits: FooterPlayerSetupEmits) {
    super(props, emits);
  }

  handleClick() {
    if (!this.playingQuest.quest) return;
    this.emits('click', this.playingQuest.quest)
  }
}