import React from 'react';
import styles from '@/styles/InfosContrato.module.css';

export interface InfosContratoProps {
  data: any[];
}

export default function ScreensInfosContrato(
  props: InfosContratoProps,
): JSX.Element {
  return (
    <div className={styles.contract_info}>
      {props.data.map((contrato, index) => (
        <div key={index}>
          <p>Ano de Assinatura: {contrato.ano_assinatura}</p>
          <p>Ano de Operação: {contrato.ano_operacao}</p>
          <p>Ano de Término: {contrato.ano_termino}</p>
          <p>Ativo: {contrato.ativo ? 'Sim' : 'Não'}</p>
          <p>Responsável pelo Frete: {contrato.resp_frete}</p>
          <p>Pedido Mínimo: {contrato.pedido_min}</p>
          <p>
            Reajuste IGPM/IPCA: {contrato.reajuste_igpm_ipca ? 'Sim' : 'Não'}
          </p>
        </div>
      ))}
    </div>
  );
}
