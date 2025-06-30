import type { User } from "@supabase/supabase-js";
import type QuestEntity from "~/models/entities/QuestEntity";
import { BaseSetup } from "~/setup/BaseSetup";
export type QuestModalSetupProps = {
  modelValue: QuestEntity,
}
export type QuestModalSetupEmit = [(event: 'add') => void, (event: 'start') => void]

export class QuestModalSetup extends BaseSetup<QuestModalSetupProps, QuestModalSetupEmit> {
  quest?: QuestEntity;

  constructor(props?: QuestModalSetupProps) {
    super(props);
    if(props) this.quest = props.modelValue;
  }
}