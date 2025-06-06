import { Currency, SimpleName } from "@ddd/shared";

export interface TransacaoProps {
  id: string;
  nome: string;
  valor: number;
  consolidado: boolean;
  data: Date;
}

export default class Transacao {
  readonly id: string;
  readonly nome: SimpleName;
  readonly valor: Currency;
  readonly consolidado: boolean;
  readonly data: Date;

  constructor(readonly props: TransacaoProps) {
    this.id = props.id;
    this.nome = new SimpleName(props.nome, 1, 120);
    this.valor = new Currency(props.valor);
    this.consolidado = props.consolidado ?? false;
    this.data = props.data ?? new Date();
  }

  baixar() {
    return this.clone({ consolidado: true });
  }

  estornar() {
    return this.clone({ consolidado: false });
  }

  clone(props: Partial<TransacaoProps>): Transacao {
    return new Transacao({ ...this.props, ...props });
  }
}
