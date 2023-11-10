interface UserProps {
  id: string;
  uuid_ec: string;
  ano_assinatura: string;
  ano_operacao: string;
  ano_termino: string;
  ativo: boolean;
  resp_frete: string;
  pedido_min: number;
  reajuste_igpm_ipca: boolean;
}

export default class EntitiesInfosContrato {
  readonly id: string;
  readonly uuid_ec: string;
  readonly ano_assinatura: string;
  readonly ano_operacao: string;
  readonly ano_termino: string;
  readonly ativo: boolean;
  readonly resp_frete: string;
  readonly pedido_min: number;
  readonly reajuste_igpm_ipca: boolean;

  constructor({
    id,
    uuid_ec,
    ano_assinatura,
    ano_operacao,
    ano_termino,
    ativo,
    resp_frete,
    pedido_min,
    reajuste_igpm_ipca,
  }: UserProps) {
    this.id = id;
    this.uuid_ec = uuid_ec;
    this.ano_assinatura = ano_assinatura;
    this.ano_operacao = ano_operacao;
    this.ano_termino = ano_termino;
    this.ativo = ativo;
    this.resp_frete = resp_frete;
    this.pedido_min = pedido_min;
    this.reajuste_igpm_ipca = reajuste_igpm_ipca;
  }
}
