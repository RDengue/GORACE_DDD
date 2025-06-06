import Transacao from "../model/transacao.entity";

export default interface TransacaoRepository {
  criar(transacao: Transacao): Promise<void>;
  buscarPorId(id: string): Promise<Transacao | null>;
  buscarPorMesAno(mes: number, ano: number): Promise<Transacao[]>;
}
