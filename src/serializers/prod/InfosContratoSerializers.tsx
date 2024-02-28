import { EntitiesInfosContrato } from '@/entities';
import { SerializerInterface } from '@/interfaces';

interface InfosContratoMockPayload {
  id: string;
  uuid_ec: string;
  ano_assinatura: string;
  ano_operacao: string;
  ano_termino: string;
  resp_frete: string;
  pedido_min: number;
  reajuste_igpm_ipca: string;
  exclusividade: boolean;
  tipoexclusividade: string;
  incentivos: string[];
  qtdbolsas: string;
  tipocontrato: string;
  valorcontrato: string;
  repasse: string;
  comentario: string;
}

export default class InfosContratoSerializers implements SerializerInterface {
  toEntity(otd: InfosContratoMockPayload): EntitiesInfosContrato {
    return new EntitiesInfosContrato({
      id: otd.id,
      uuid_ec: otd.uuid_ec,
      ano_assinatura: otd.ano_assinatura,
      ano_operacao: otd.ano_operacao,
      ano_termino: otd.ano_termino,
      resp_frete: otd.resp_frete,
      pedido_min: otd.pedido_min,
      reajuste_igpm_ipca: otd.reajuste_igpm_ipca,
      exclusividade: otd.exclusividade,
      tipoexclusividade: otd.tipoexclusividade,
      incentivos: otd.incentivos,
      qtdbolsas: otd.qtdbolsas,
      tipocontrato: otd.tipocontrato,
      valorcontrato: otd.valorcontrato,
      repasse: otd.repasse,
      comentario: otd.comentario,
    });
  }
}
