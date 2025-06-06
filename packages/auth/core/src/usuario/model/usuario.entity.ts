import { Email, PersonName, HashPassword, Result } from "@ddd/shared";

export interface UsuarioProps {
  id: string;
  nome: string;
  email: string;
  senha?: string;
}

export default class Usuario {
  readonly id: string;
  readonly nome: PersonName;
  readonly email: Email;
  readonly senha?: HashPassword;

  constructor(readonly props: UsuarioProps) {
    this.id = props.id;

    const possivelNome = Result.try<PersonName>(
      () => new PersonName(props.nome)
    );
    const possivelEmail = Result.try<Email>(() => new Email(props.email));
    const possivelSenha = props.senha
      ? Result.try<HashPassword>(() => new HashPassword(props.senha!))
      : null;

    const resultado = Result.combine([
      possivelNome,
      possivelEmail,
      possivelSenha,
    ]);

    resultado.throwIfFailed();

    this.nome = possivelNome.value;
    this.email = possivelEmail.value;
    this.senha = possivelSenha?.value;
  }

  semSenha(): Usuario {
    return this.clone({ senha: undefined });
  }

  comSenha(senha: HashPassword): Usuario {
    return this.clone({ senha: senha.value });
  }

  clone(props: Partial<UsuarioProps>): Usuario {
    return new Usuario({ ...this.props, ...props });
  }
}
