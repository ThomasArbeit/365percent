import type { UserTagProps } from "~/components/app/user/UserTag.setup";
import { BaseEntity } from "./BaseEntity";
import type { LevelBarSetupProps } from "~/components/ui/level-bar/LevelBar.setup";
export type UserType = {
  id: string,
  email: string,
  pseudo: string,
  avatar_url: string | null,
  global_xp: number,
  created_at: string,
}

export default class BaseUserEntity extends BaseEntity<UserType> {

  constructor(props:UserType) {
    super(props);
  }

  
  public get pseudo() {
    return this.data.pseudo;
  }
  
  
  public get avatarUrl() {
    return this.data.avatar_url ?? 'default-avatar.png';
  }

  
  public get rank() {
    return getRankFromXp(this.data.global_xp);
  }

  public get nextXpStep () {
    return getNextXpStepFromXp(this.data.global_xp);
  }


  public get xpToNext () {
    if(this.nextXpStep) return this.nextXpStep - this.data.global_xp;
  }

  
  public get progress() : LevelBarSetupProps {
    return {
      xp: this.nextXpStep ?? 0,
      level: this.rank,
      xpCurrentLevel: this.data.global_xp,
      xpToNext: this.xpToNext ?? 0,
    }
  }

  addXpToTotal (xp: number) {
    this.data.global_xp += xp;
  }
  
}