import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AutenticacaoController } from './autenticacao.controller';
import { UsuarioPrisma } from './usuario.prisma';
import { CriptografiaBcrypt } from './criptografia.bcrypt';

@Module({
  imports: [DbModule],
  controllers: [AutenticacaoController],
  providers: [UsuarioPrisma, CriptografiaBcrypt],
})
export class AuthModule {}
