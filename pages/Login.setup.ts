import { BaseSetup } from "~/setup/BaseSetup";
type LoginSetupProps = SetupProps<typeof LoginSetup.props>;
type LoginSetupEmit = {};

export default class LoginSetup extends BaseSetup<LoginSetupProps, LoginSetupEmit> {
  static readonly props = {};

  public email = ref<string>('');
  public password = ref<string>('');

  constructor(props?: LoginSetupProps) {
    super(props);
  }

  async login () {
    await this.self.login(this.email.value, this.password.value);
    this.router.push('/');
  }
}