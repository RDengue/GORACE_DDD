export default interface CriptografiaProvider {
  criptografar(senha: string): Promise<string>;
  comparar(senha: string, senhaHash: string): Promise<boolean>;
}
