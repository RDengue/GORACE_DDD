import { Body, Controller, Post } from '@nestjs/common';
import { CriptografiaBcrypt } from './criptografia.bcrypt';
import { LoginUsuario, RegistrarUsuario } from '@ddd/auth';
import { UsuarioPrisma } from './usuario.prisma';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AutenticacaoController {
  constructor(
    private readonly repo: UsuarioPrisma,
    private readonly cripto: CriptografiaBcrypt,
  ) {}

  @Post('register')
  async register(
    @Body() usuario: { nome: string; email: string; senha: string },
  ) {
    const casoDeUso = new RegistrarUsuario(this.repo, this.cripto);
    await casoDeUso.execute({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
    });
    return { message: 'register.success' };
  }
  @Post('login')
  async login(@Body() dto: { email: string; senha: string }) {
    const casoDeUso = new LoginUsuario(this.repo, this.cripto);
    const usuario = await casoDeUso.execute({
      email: dto.email,
      senha: dto.senha,
    });
    return {
      token: jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email.value,
          iniciais: usuario.nome.initials(),
        },
        process.env.JWT_SECRET,
        { expiresIn: '15d' },
      ),
    };
  }
}
