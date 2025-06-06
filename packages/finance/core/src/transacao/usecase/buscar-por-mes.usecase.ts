import { UseCase } from "@ddd/shared";
import Transacao from "../model/transacao.entity";
import TransacaoRepository from "../provider/transacao.repository";

type Input = {
  mes: number;
  ano: number;
};

export default class BuscarPorMes implements UseCase<Input, Transacao[]> {
  constructor(private readonly repo: TransacaoRepository) {}

  async execute(input: Input): Promise<Transacao[]> {
    return await this.repo.buscarPorMesAno(input.mes, input.ano);
  }
}
