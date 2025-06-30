import type { UserTagProps } from "~/components/app/user/UserTag.setup";
import { BaseEntity } from "./BaseEntity";

export default class BaseUserEntity extends BaseEntity<UserTagProps> {

  constructor(props:UserTagProps) {
    super(props);
  }

  
  public get pseudo() {
    return this.data.pseudo;
  }
  
  
  public get avatarUrl() {
    return this.data.avatarUrl ?? 'default-avatar.png';
  }

  
  public get rank() {
    return this.data.globalXp;
  }  
}