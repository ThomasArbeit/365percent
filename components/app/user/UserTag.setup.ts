import BaseUserEntity from "~/models/entities/BaseUser";
import { BaseSetup } from "~/setup/BaseSetup";

export type UserTagProps = {
  id: string,
  email: string,
  pseudo: string,
  avatarUrl: string | null,
  globalXp: string,
  created_at: string,
}

type UserTagEmits = {}

export class UserTagSetup extends BaseSetup<UserTagProps, UserTagEmits> {
  user: BaseUserEntity;

  constructor(props: UserTagProps) {
    super(props)
    this.user = new BaseUserEntity(props);
  }
}
