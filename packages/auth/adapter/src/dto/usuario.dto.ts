import { UsuarioProps } from "@ddd/auth";

export default interface UsuarioDTO extends Omit<UsuarioProps, "senha"> {
  iniciais: string;
}
