import { Email, UseCase } from "@ddd/shared";
import CriptografiaProvider from "../provider/criptografia.provider";
import Usuario from "../model/usuario.entity";
import UsuarioRepository from "../provider/usuario.repository";

type Input = {
  email: string;
  senha: string;
};

export default class LoginUsuario implements UseCase<Input, Usuario> {
  constructor(
    private readonly repo: UsuarioRepository,
    private readonly cripto: CriptografiaProvider
  ) {}

  async execute(input: Input): Promise<Usuario> {
    const email = new Email(input.email);

    const usuarioExistente = await this.repo.buscarPorEmail(email, true);
    if (!usuarioExistente) throw new Error("usuario.inexistente");

    const mesmaSenha = await this.cripto.comparar(
      input.senha,
      usuarioExistente.senha!.value
    );

    if (!mesmaSenha) throw new Error("senha.incorreta");
    return usuarioExistente.semSenha();
  }
}
