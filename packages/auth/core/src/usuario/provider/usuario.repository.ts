import { Email } from "@ddd/shared";
import Usuario from "../model/usuario.entity";

export default interface UsuarioRepository {
  criar(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: Email, comSenha?: boolean): Promise<Usuario | null>;
  //   buscarPorId(id: string): Promise<Usuario | null>;
  //   atualizar(usuario: Usuario): Promise<Usuario>;
  //   deletar(id: string): Promise<void>;
  //   listar(): Promise<Usuario[]>;
}
