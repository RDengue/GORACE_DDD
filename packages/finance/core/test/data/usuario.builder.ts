import Usuario, {
  UsuarioProps,
} from "../../src/transacao/model/transacao.entity";

export class UsuarioBuilder {
  private usuario: Partial<UsuarioProps>;

  constructor() {
    this.usuario = {
      id: "1",
      nome: "Usuário Teste",
      email: "usuario@teste.com",
      senha: "$2a$12$pQDEvTdId6eo3QMTnYg.7.L9eL9EZDuY.XGX52eAD9O43GI/NboWi",
    };
  }

  static novo(): UsuarioBuilder {
    return new UsuarioBuilder();
  }

  comId(id: string): UsuarioBuilder {
    this.usuario.id = id;
    return this;
  }

  comNome(nome: string): UsuarioBuilder {
    this.usuario.nome = nome;
    return this;
  }

  semNome(): UsuarioBuilder {
    this.usuario.nome = undefined;
    return this;
  }

  comEmail(email: string): UsuarioBuilder {
    this.usuario.email = email;
    return this;
  }

  comSenha(senha: string): UsuarioBuilder {
    this.usuario.senha = senha;
    return this;
  }

  semSenha(): UsuarioBuilder {
    this.usuario.senha = undefined;
    return this;
  }

  agora(): Usuario {
    return new Usuario(this.usuario as UsuarioProps);
  }
}
