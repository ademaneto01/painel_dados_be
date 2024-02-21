const templateHTML = `
<div style="
width: auto; 
height: auto;
padding-top: 2rem; 
padding-left: 2rem;
padding-right: 2rem; 
padding-bottom: 5.5rem;
">
    <div style=" margin-left: 2rem; margin-top: 3%;">
    <div style="color: #A6CE38; font-size: 340%; font-weight: bold;">Acompanhamento Pedagógico</div>
    <div style="margin-top: 1rem; color: #31599C; font-size: 220%; margin-bottom: 1rem">Práticas de alto impacto</div>
    <img src="logobe.png" alt="Logo" style="position:absolute; margin-top: -7rem; margin-left: 75%; margin-right: 2rem; width: 16rem; height: auto;">
    </div>
    <div style="margin-top: 1.5rem; margin-left: 2rem;">
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 130%; background-color: transparent; border: transparent; color: #31599C; margin-bottom: 0.3rem; padding: 0.3rem; flex-grow: 1;">
        Escola: {{nome_escola}}
        </div>
        <div style="font-size: 130%; min-width: 65%; background-color: transparent; border: transparent; color: #31599C; margin-bottom: 0.3rem; padding: 0.3rem; flex-grow: 1;">
        Data: {{dataofobservation}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 130%; background-color: transparent; border: transparent; color: #31599C; margin-bottom: 0.3rem; padding: 0.3rem; flex-grow: 1;">
        Educador: {{nomeAgente}}
        </div>
        <div style="font-size: 130%; min-width: 65%; background-color: transparent; border: transparent; color: #31599C; margin-bottom: 0.3rem; padding: 0.3rem; flex-grow: 1;">
        Assessor: {{assessor}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 130%; background-color: transparent; border: transparent; color: #31599C; margin-bottom: 0.3rem; padding: 0.3rem; flex-grow: 1;">
        Nº de estudantes: {{ofstudents}}
        </div>
        <div style="font-size: 130%; min-width: 65%; background-color: transparent; border: transparent; color: #31599C; margin-bottom: 0.3rem; padding: 0.3rem; flex-grow: 1;">
        Série Escolar: {{grade}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 130%; background-color: transparent; border: transparent; color: #31599C; margin-bottom: 0.3rem; padding: 0.3rem; flex-grow: 1;">
        Componente: {{tema}}
        </div>
        <div style="font-size: 130%; min-width: 65%; background-color: transparent; border: transparent; color: #31599C; margin-bottom: 0.3rem; padding: 0.3rem; flex-grow: 1;">
        Nº LP Be: {{lessonplanbe}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 130%; min-width: 65%; background-color: transparent; border: transparent; color: #31599C; margin-bottom: 0.3rem; padding: 0.3rem; flex-grow: 1;">
        Ciclo: {{cycle}}
        </div>
    </div>
    <div style="margin-top: 1.5rem; margin-right: 2rem;">
        <div style="font-size: 210%; color: #31599C; margin-right: 13rem; margin-bottom: 0.7rem; font-weight: bold;">Relatório de observação</div>
        </div>
        <div style="font-size: 200%; border: 0.07rem solid #31599C; text-align: center; background-color: #c9daf8; color: #31599C; font-weight: bold; padding: 0.7rem; margin-bottom: 0.7rem;">
        O educador…
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Se comunica de forma clara, principalmente ao dar instruções.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{E1}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Promove a autonomia e auto-eficácia dos estudantes.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{E2}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Fornece feedback para a produção dos alunos.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{E3}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Tem uma boa relação com o grupo.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{E4}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Garante que os estudantes estejam cientes dos objetivos.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{E5}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Se engaja e lida com conteúdos emergentes.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{E6}}
        </div>
    </div>
    <div style="margin-top: 1.5rem; margin-left: 2rem;">
        <div style="font-size: 200%; border: 0.07rem solid #31599C; text-align: center; background-color: #c9daf8; color: #31599C; font-weight: bold; padding: 0.7rem; margin-bottom: 0.7rem;">
        Conteúdo, conceitos ou atividades foram…
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Modelados e/ou exemplificados ao longo da aula.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{M1}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Resumidos ou transformados de forma estratégica.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{M2}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Organizados e estruturados com auxílio visual.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{M3}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Integrados ao conhecimento prévio do aluno.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{M4}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Apresentados e explicados através de exemplos relevantes.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{M5}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Apresentados de forma progressiva e conexa.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{M6}}
        </div>
    </div>
    <div style="margin-top: 1.5rem; margin-left: 2rem;">
        <div style="font-size: 200%; border: 0.07rem solid #31599C; text-align: center; background-color: #c9daf8; color: #31599C; font-weight: bold; padding: 0.7rem; margin-bottom: 0.7rem;">
        Os estudantes…
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Cooperaram durante a aula, aprendendo com seus pares.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{L1}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Abordaram as oportunidades de prática de forma deliberada.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{L2}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Verbalizaram perguntas e opiniões, ou buscaram ajuda.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{L3}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Formam um grupo coeso, criando bom clima de aprendizagem.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{L4}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Refletiram e avaliaram as aprendizagens.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{L5}}
        </div>
    </div>
    <div style="display: flex; flex-wrap: wrap;">
        <div style="font-size: 150%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; margin-left: 2rem; flex-grow: 1;">
        Se mostraram engajados durante a aula.
        </div>
        <div style="font-size: 150%; max-width: 25%; background-color: transparent; border: 0.07rem solid #31599C; color: #31599C; margin-bottom: 0.7rem; padding: 0.7rem; flex-grow: 1;">
        {{L6}}
        </div>
    </div>
    <div style="display: flex; align-items: center;">
        <img src="balloon_be.png" alt="Logo" style="margin-left: -1%; margin-right: 0.7rem; margin-top: 0.3rem; width: 15%; height: auto;">
        <div style="color: #31599C; font-size: 1.2rem; font-weight: bold; margin-left: 67%; margin-right: 0.7rem;">Acompanhamento de Aula 1/2</div>
    </div>        
    </div>
    <div style="height: 30%;"></div>
</div>
`;
export default templateHTML;
