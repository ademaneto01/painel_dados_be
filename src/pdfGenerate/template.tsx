const templateHTML = `
<div style="
width: auto; 
height: auto; 
padding-left: 30px;
padding-right: 30px; 
padding-bottom: 140px; 
font-size: 18px;

">
<div style=" margin-left: 0px;">
<div style="color: #A6CE38; font-size: 34px; font-weight: bold;">Acompanhamento Pedagógico</div>
<div style="margin-top: 10px; color: #31599C; font-size: 34px;">Práticas de alto impacto</div>
<img src="logobe.png" alt="Logo" style="position:absolute; margin-top: -110px; margin-left: 600px; width: 200px; height: auto;">
</div>
<div style="margin-top: 25px; margin-left: 0px; display: flex; flex-wrap: wrap;">
<div style="color: #31599C; margin-right: 150px; margin-bottom: 10px;">Escola: {{nome_escola}}</div>
<div style="color: #31599C; margin-right: 100px; margin-bottom: 10px;">Data: {{dataofobservation}}</div>
<div style="color: #31599C; margin-right: 128px; margin-bottom: 10px;">Educador: {{nomeAgente}}</div>
<div style="color: #31599C; margin-right: 100px; margin-bottom: 10px;">Assessor: {{ASSESSOR}}</div>
<div style="color: #31599C; margin-right: 162px; margin-bottom: 10px;">Série Escolar: {{grade}}</div>
<div style="color: #31599C; margin-right: 100px; margin-bottom: 10px;">Nº de estudantes: {{ofstudents}}</div>
<div style="color: #31599C; margin-right: 160px; margin-bottom: 10px;">Componente: {{tema}}</div>
<div style="color: #31599C; margin-right: 100px; margin-bottom: 10px;">Nº LP Be: {{lessonplanbe}}</div>
<div style="color: #31599C; margin-right: 100px; margin-bottom: 10px;">Ciclo: {{cycle}}</div>
</div>
<div style="margin-top: 25px; margin-left: 0px; display: flex; flex-wrap: wrap;">
<div style="color: #31599C; margin-right: 210px; margin-bottom: 20px; font-weight: bold;">Feedback e Feedforward</div>
<div style="color: #31599C; margin-right: 210px; margin-bottom: 10px;">Esta seção destina-se a trazer alguns pontos de 
    atenção e contribuições para as boas práticas de sala de aula.</div>
</div>
<div style="margin-top: 25px; margin-left: 0px;">
<div style="border: 1px solid #31599C; text-align: center; background-color: #c9daf8; color: #31599C; font-weight: bold; padding: 10px; margin-bottom: 10px;">
    Sugestões e metas de desenvolvimento
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{finalcoments}}
    </div>
</div>
</div>
<div style="margin-top: 200px; margin-left: 0px; display: flex; flex-wrap: wrap;">
<div style="color: #31599C; margin-right: 210px; margin-bottom: 5px; font-weight: bold;">Relatório de observação</div>
</div>
<div style="margin-top: 25px; margin-left: 0px;">
<div style="text-align: center; border: 1px solid #31599C; background-color: #c9daf8; color: #31599C; font-weight: bold; padding: 10px; margin-bottom: 10px;">
    O educador…
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Se comunica de forma clara, principalmente ao dar instruções.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{E1}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Promove a autonomia e auto-eficácia dos estudantes.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{E2}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Fornece feedback para a produção dos alunos.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{E3}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Tem uma boa relação com o grupo.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{E4}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Garante que os estudantes estejam cientes dos objetivos.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{E5}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Se engaja e lida com conteúdos emergentes.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{E6}}
    </div>
</div>
</div>
<div style="margin-top: 25px; margin-left: 0px;">
<div style="border: 1px solid #31599C; text-align: center; background-color: #c9daf8; color: #31599C; font-weight: bold; padding: 10px; margin-bottom: 10px;">
    Conteúdo, conceitos ou atividades foram…
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Modelados e/ou exemplificados ao longo da aula.
    </div>
    <div style="max-width: 16%; background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{M1}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Resumidos ou transformados de forma estratégica.
    </div>
    <div style="max-width: 16%; background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{M2}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Organizados e estruturados com auxílio visual.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{M3}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Integrados ao conhecimento prévio do aluno.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{M4}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Apresentados e explicados através de exemplos relevantes.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{M5}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Apresentados de forma progressiva e conexa.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{M6}}
    </div>
</div>
</div>
<div style="margin-top: 25px; margin-left: 0px;">
<div style="border: 1px solid #31599C; text-align: center; background-color: #c9daf8; color: #31599C; font-weight: bold; padding: 10px; margin-bottom: 10px;">
    Os estudantes…
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Cooperaram durante a aula, aprendendo com seus pares.
    </div>
    <div style="max-width: 16%; background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{L1}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Abordaram as oportunidades de prática de forma deliberada.
    </div>
    <div style="max-width: 16%; background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{L2}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Verbalizaram perguntas e opiniões, ou buscaram ajuda.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{L3}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Formam um grupo coeso, criando bom clima de aprendizagem.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{L4}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Refletiram e avaliaram as aprendizagens.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{L5}}
    </div>
</div>
<div style="display: flex; flex-wrap: wrap;">
    <div style="background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        Se mostraram engajados durante a aula.
    </div>
    <div style="max-width: 16%;background-color: transparent; border: 1px solid #31599C; color: #31599C; margin-bottom: 10px; padding: 10px; flex-grow: 1;">
        {{L6}}
    </div>
</div>
</div>
<div style="display: flex; align-items: center;">
    <img src="balloon_be.png" alt="Logo" style="margin-left: -20px; margin-right: 10px; margin-top: 30px; width: 100px; height: auto;">
    <div style="color: #31599C; font-size: 15px; font-weight: bold; margin-left: 500px;">Acompanhamento de Aula</div>
</div>        
</div>
<div style="height: 100px;"></div>
        </div>
`;
export default templateHTML;
