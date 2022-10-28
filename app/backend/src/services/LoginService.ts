import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/UserModel';
import CryptoWithBcrypto from '../utils/CryptoWithBcrypt';
import Jwt from '../utils/Jwt';
import GeneratorError from '../utils/GeneratorError';

export default class LoginService {
  private _userModel = UserModel;

  public async login(userLogin: ILogin) {
    const { email, password } = userLogin;
    const findUser = await this._userModel.findOne({ where: { email }, raw: true });

    if (!findUser) {
      throw new GeneratorError(401, 'Incorrect email or password');
    }

    const passwordEncrypted = CryptoWithBcrypto.compare(password, findUser.password);

    if (!passwordEncrypted) {
      throw new GeneratorError(401, 'Incorrect email or password');
    }

    const payload = {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
      email: findUser.email,
    };

    const jwt = new Jwt();

    const token = jwt.authentication(payload);

    return token;
  }
}
