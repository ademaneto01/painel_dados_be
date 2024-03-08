import { EntitiesAcompanhamentoPDG, EntitiesAgenteExterno } from '@/entities';
import styles from '@/styles/VisualizeAcompanhamento.module.css';
import { PageContentContainer, BackButton } from '../../../shared';
import { BackendApiGet } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { useState, useEffect } from 'react';
import { PageEnumAcompanhamentoPDG } from '@/enums';
import handleApiErrors from '@/utils';

export default function VisualizeAcompanhamento() {
  const [data, setData] = useState<EntitiesAcompanhamentoPDG[]>([]);
  const [nomeAgente, setNomeAgente] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const {
    usersUpdated,
    setUsersUpdated,
    setPageAcompanhamento,
    showPageVisualizeAcompanhamento,
  } = useGlobalContext();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth_token');

      try {
        const backendApi = new BackendApiGet(`${token}`);

        const users = await backendApi.localizarAcompanhamentoById(
          showPageVisualizeAcompanhamento,
        );
        fetchAgenteExterno(users[0].id_prof);
        setData(users);
      } catch (error: any) {
        handleApiErrors(error, setError, setMsgError);
      } finally {
        setLoaded(true);
        setUsersUpdated(false);
      }
    }
    if (!loaded || usersUpdated) {
      fetchData();
    }
  }, [loaded, usersUpdated]);

  async function fetchAgenteExterno(props: string) {
    if (!props) {
      setNomeAgente('N/A');
      return;
    }
    const token = localStorage.getItem('auth_token');

    try {
      const backendApi = new BackendApiGet(`${token}`);

      const dataAgenteExterno = await backendApi.localizarAgenteId(props);
      const nomeAgente = dataAgenteExterno[0]?.nome || 'N/A';
      setNomeAgente(nomeAgente);
    } catch (error: any) {
      handleApiErrors(error, setError, setMsgError);
    }
  }
  return (
    <div className={styles.pageContainer}>
      <h4>Acompanhamento Pedagógico</h4>
      <PageContentContainer>
        <BackButton
          color={'var(--gray-300'}
          colorBackGround={'var(--white'}
          text="Voltar"
          onClick={() =>
            setPageAcompanhamento(PageEnumAcompanhamentoPDG.acompanhamentos)
          }
        />
        <div>
          {data.map((entity, index) => (
            <div key={index} className={styles.conteinerFullInfos}>
              <div>
                <h3>School</h3>
                <div>{entity.nome_escola}</div>
              </div>
              <div className={styles.conteinerWidthAll}>
                <h3>Observation Info.</h3>
                <label className={styles.labelStandard}>
                  Educator's name:
                  <div className={styles.boxTextInfos}>{nomeAgente}</div>
                </label>
                <label className={styles.labelStandard}>
                  Data of observation:
                  <div className={styles.boxTextInfos}>
                    {entity.dataofobservation}
                  </div>
                </label>
              </div>
              <div className={styles.conteinerWidthAll}>
                <h3>Cycle</h3>
                <label className={styles.labelStandard}>
                  Grade:
                  <div className={styles.boxTextInfos}>{entity.grade}</div>
                </label>
                <label className={styles.labelStandard}>
                  # of students:
                  <div className={styles.boxTextInfos}>{entity.ofstudents}</div>
                </label>
                <label className={styles.labelStandard}>
                  Subject:
                  <div className={styles.boxTextInfos}>{entity.tema}</div>
                </label>
                <label className={styles.labelStandard}>
                  Lesson plan Be #:
                  <div className={styles.boxTextInfos}>
                    {entity.lessonplanbe}
                  </div>
                </label>
                <label className={styles.labelStandard}>
                  Cycle:
                  <div className={styles.boxTextInfos}>{entity.cycle}</div>
                </label>
              </div>
              <div className={styles.conteinerWidthAll}>
                <div className={styles.boxToAlignTitleLearning}>
                  <h3>Learning setting</h3>
                  <div className={styles.conteinerLearning}>
                    <div className={styles.boxLearning}>
                      <label className={styles.labelStandard}>
                        Digital projector/TV:
                        <div className={styles.boxTextInfos}>
                          {entity.digitalprojector}
                        </div>
                      </label>
                      <label className={styles.labelStandard}>
                        Board:
                        <div className={styles.boxTextInfos}>
                          {entity.board}
                        </div>
                      </label>
                      <label className={styles.labelStandard}>
                        English Corner:
                        <div className={styles.boxTextInfos}>
                          {entity.englishcorner}
                        </div>
                      </label>
                    </div>
                    <div className={styles.boxLearning}>
                      <label className={styles.labelStandard}>
                        Noise level:
                        <div className={styles.boxTextInfos}>
                          {entity.noiselevel}
                        </div>
                      </label>
                      <label className={styles.labelStandard}>
                        Resource audio qlty.:
                        <div className={styles.boxTextInfos}>
                          {entity.resourceaudioqlty}
                        </div>
                      </label>
                      <label className={styles.labelStandard}>
                        NGL/Be Materials:
                        <div className={styles.boxTextInfos}>
                          {entity.nglbematerials}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.conteinerWidthAll}>
                <div className={styles.boxToAlignTitleLearning}>
                  <h3>Lesson planing</h3>
                  <div className={styles.boxLearning}>
                    <label className={styles.labelStandard}>
                      LP1 - A lesson plan was provided.:
                      <div className={styles.boxTextInfos}>
                        {entity.lp1lessonplan}
                      </div>
                    </label>
                    <label className={styles.labelStandard}>
                      LP2- All proposed goals were addressed.:
                      <div className={styles.boxTextInfos}>
                        {entity.lp2proposedgoals}
                      </div>
                    </label>
                    <label className={styles.labelStandard}>
                      LP3 - Resources used contributed to achieved student
                      outcomes.:
                      <div className={styles.boxTextInfos}>
                        {entity.lp3resourcesused}
                      </div>
                    </label>
                    <label className={styles.labelStandard}>
                      LP4 - Changes to LP positively contributed to achieved
                      student outcomes.:
                      <div className={styles.boxTextInfos}>
                        {entity.lp4changes}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.conteinerWidthAll}>
                <div className={styles.boxToAlignTitleLearning}>
                  <h3>Final comments</h3>
                </div>
                <div
                  className={styles.containerFinalComments}
                  dangerouslySetInnerHTML={{ __html: entity.finalcoments }}
                />
              </div>
            </div>
          ))}
        </div>
      </PageContentContainer>
    </div>
  );
}
