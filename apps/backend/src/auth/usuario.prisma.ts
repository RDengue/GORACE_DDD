import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { Usuario, UsuarioRepository, UsuarioProps } from '@ddd/auth';
import { Email } from '@ddd/shared';

@Injectable()
export class UsuarioPrisma implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async criar(usuario: Usuario): Promise<void> {
    console.log('Criando usuário no banco de dados', usuario);
    await this.prisma.usuario.create({
      data: {
        nome: usuario.nome.value,
        email: usuario.email.value,
        senha: usuario.senha!.value,
      },
    });
  }

  async buscarPorEmail(
    email: Email,
    comSenha: boolean = false,
  ): Promise<Usuario | null> {
    const dados = await this.prisma.usuario.findUnique({
      omit: { senha: !comSenha },
      where: {
        email: email.value,
      },
    });
    return dados ? new Usuario(dados as UsuarioProps) : null;
  }
}
