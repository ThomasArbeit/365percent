import BaseUserEntity from "~/models/entities/BaseUser";
import { BaseSetup } from "~/setup/BaseSetup";

export type UserTagProps = {
  user: BaseUserEntity,
}

type UserTagEmits = {}

export class UserTagSetup extends BaseSetup<UserTagProps, UserTagEmits> {
  user: BaseUserEntity;

  constructor(props: UserTagProps) {
    super(props)
    this.user = props.user;
  }
}
