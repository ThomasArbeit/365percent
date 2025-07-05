import { reactive } from 'vue';
import useAuthService from '~/service/auth/useAuthService';

type RawEntity = {id?: string};

export class BaseEntity<T extends RawEntity> {
  protected data = reactive({}) as T;
  protected self = useAuthService.getInstance();


  get id (): T['id'] { return this.data.id};
  
  public set id(v : string) {
    this.data.id = v;
  }
  
  get isNew () { return !this.id; }

  get userId() {
    return this.self.userData.id;
  }

  constructor(initialData?: T) {
    if (initialData) this.assignData(initialData);
  }

  assignData (payload: Partial<T>) {
    Object.assign(this.data, payload)
  }
}