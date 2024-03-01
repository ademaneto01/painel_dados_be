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
        <div key={index} className={styles.conteinerFullInfos}>
          <div className={styles.conteinerToAlingInfos}>
            <div className={styles.conteinerInfos}>
              <p>
                <strong>Data de Assinatura:</strong>{' '}
                {contrato.ano_assinatura ?? 'N/A'}
              </p>
              <p>
                <strong>Data de Operação:</strong>{' '}
                {contrato.ano_operacao ?? 'N/A'}
              </p>
              <p>
                <strong>Data de Término:</strong>{' '}
                {contrato.ano_termino ?? 'N/A'}
              </p>
              <p>
                <strong>Responsável pelo Frete:</strong>{' '}
                {contrato.resp_frete ?? 'N/A'}
              </p>
              <p>
                <strong>Tipo Contrato:</strong> {contrato.tipocontrato ?? 'N/A'}
              </p>
              <p>
                <strong>Valor Contrato:</strong>{' '}
                {contrato.valorcontrato ?? 'N/A'}
              </p>
              <p>
                <strong>Pedido Mínimo:</strong> {contrato.pedido_min ?? 'N/A'}
              </p>
            </div>
            <div className={styles.conteinerInfos}>
              <p>
                <strong>Reajuste:</strong>{' '}
                {contrato.reajuste_igpm_ipca ?? 'N/A'}
              </p>
              <p>
                <strong>Exclusividade:</strong>{' '}
                {contrato.exclusividade ? 'Sim' : 'Não'}
              </p>
              <p>
                <strong>Tipo Exclusividade:</strong>{' '}
                {contrato.tipoexclusividade ?? 'N/A'}
              </p>
              <p>
                <strong>Incentivos:</strong>{' '}
                {contrato.incentivos?.length > 0 ? contrato.incentivos : 'N/A'}
              </p>
              <p>
                <strong>QTD. Bolsas:</strong> {contrato.qtdbolsas ?? 'N/A'}
              </p>
              <p>
                <strong>% de Repasse:</strong> {contrato.repasse ?? 'N/A'}
              </p>
            </div>
          </div>
          <div className={styles.conteinerWidthAll}>
            <div className={styles.boxToAlignTitleLearning}>
              <h3>
                <strong>Comentário</strong>
              </h3>
            </div>
            <div
              className={styles.containerFinalComments}
              dangerouslySetInnerHTML={{ __html: contrato.comentario }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
