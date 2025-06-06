import { CriptografiaProvider } from '@ddd/auth';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CriptografiaBcrypt implements CriptografiaProvider {
  async criptografar(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(senha, salt);
  }

  async comparar(senha: string, senhaHash: string): Promise<boolean> {
    return await bcrypt.compare(senha, senhaHash);
  }
}
