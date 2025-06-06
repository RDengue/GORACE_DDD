import { HashPassword, Id, Result, StrongPassword, UseCase } from "@ddd/shared";
import CriptografiaProvider from "../provider/criptografia.provider";
import Usuario from "../model/usuario.entity";
import UsuarioRepository from "../provider/usuario.repository";

type Input = {
  nome: string;
  email: string;
  senha: string;
};

export default class RegistrarUsuario implements UseCase<Input, void> {
  constructor(
    private readonly repo: UsuarioRepository,
    private readonly cripto: CriptografiaProvider
  ) {}

  // Caso de uso é o maior cliente do domínio!!!
  async execute(input: Input): Promise<void> {
    const possivelSenha = Result.try<StrongPassword>(
      () => new StrongPassword(input.senha)
    );

    const possivelUsuario = Result.try<Usuario>(() => {
      return new Usuario({
        id: Id.createHash(),
        nome: input.nome,
        email: input.email,
      });
    });

    const resultado = Result.combine([possivelSenha, possivelUsuario]);
    resultado.throwIfFailed();

    const senhaForte: StrongPassword = possivelSenha.value;
    const senhaHash = await Result.trySync<string>(() =>
      this.cripto.criptografar(senhaForte.value)
    );

    const usuario = possivelUsuario.value.comSenha(
      new HashPassword(senhaHash.value)
    );

    const usuarioExistente = await this.repo.buscarPorEmail(usuario.email);

    if (usuarioExistente) throw new Error("user.exists");

    await this.repo.criar(usuario);
  }
}
