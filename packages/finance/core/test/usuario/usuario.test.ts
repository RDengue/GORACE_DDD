import { Usuario } from "../../src";
import { UsuarioBuilder } from "../data/usuario.builder";

test("Deve retornar um usuario valido", () => {
  const usuario = UsuarioBuilder.novo().agora();
  expect(usuario).toBeInstanceOf(Usuario);
});

test("Deve retornar um usuario valido sem senha", () => {
  const usuario = UsuarioBuilder.novo().semSenha().agora();
  expect(usuario).toBeInstanceOf(Usuario);
});

test("Deve lançar erro se o nome for invalido", () => {
  expect(() => UsuarioBuilder.novo().semNome().agora()).toThrow();
});
