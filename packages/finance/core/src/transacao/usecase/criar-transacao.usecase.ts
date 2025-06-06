import { UseCase } from "@ddd/shared";
import Transacao from "../model/transacao.entity";
import TransacaoRepository from "../provider/transacao.repository";

export default class CriarTransacao implements UseCase<Transacao, void> {
  constructor(private readonly repo: TransacaoRepository) {}

  async execute(transacao: Transacao): Promise<void> {
    await this.repo.criar(transacao);
  }
}
