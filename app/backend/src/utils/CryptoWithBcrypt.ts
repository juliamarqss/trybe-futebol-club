import * as bcrypt from 'bcryptjs';

export default abstract class CryptoWithBcrypto {
  public static compare(password: string, userPassword: string) {
    const compare = bcrypt.compareSync(password, userPassword);
    return compare;
  }
}
