const templateHTML = `
<div style="
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
">
      <h4>Acompanhamento Pedagógico</h4>
            <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1em; 
            width: 93.5%;"
            >
              <div>
                <h3>School</h3>
                <div>{{nome_escola}}</div>
              </div>
              <div style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 0.5em; 
              width: 93.5%;
              padding: 1em 2em 1em 1em;
              border-radius: 5px;
              background-color: var(--gray-202);"
              >
              <div style="
                display: flex;
                flex-direction: column;
                gap: 1em;
                align-items: center;"
                >
                <h3>Observation Info.</h3>
                </div>
                <label style="
                font-weight: bold;
                gap: 0.2rem;">
                  Educator's name:
                  <div style="font-size: medium;
                  font-weight: 400;
                  color: rgb(48, 46, 46);">{{nomeAgente}}</div>
                </label>
                <label style="
                font-weight: bold;
                gap: 0.2rem;">
                  Data of observation:
                  <div style="font-size: medium;
                  font-weight: 400;
                  color: rgb(48, 46, 46);">
                    {{dataofobservation}}
                  </div>
                </label>
              </div>
              <div style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 0.5em; 
              width: 93.5%;
              padding: 1em 2em 1em 1em;
              border-radius: 5px;
              background-color: var(--gray-202);"
              >
              <div style="
                display: flex;
                flex-direction: column;
                gap: 1em;
                align-items: center;"
                >
                <h3>Cycle</h3>
                </div>
                <label style="
                font-weight: bold;
                gap: 0.2rem;">
                  Grade:
                  <div style="font-size: medium;
                  font-weight: 400;
                  color: rgb(48, 46, 46);">{{grade}}</div>
                </label>
                <label style="
                font-weight: bold;
                gap: 0.2rem;">
                  # of students:
                  <div style="font-size: medium;
                  font-weight: 400;
                  color: rgb(48, 46, 46);">{{ofstudents}}</div>
                </label>
                <label style="
                font-weight: bold;
                gap: 0.2rem;">
                  Subject:
                  <div style="font-size: medium;
                  font-weight: 400;
                  color: rgb(48, 46, 46);">{{tema}}</div>
                </label>
                <label style="
                font-weight: bold;
                gap: 0.2rem;">
                  Lesson plan Be #:
                  <div style="font-size: medium;
                  font-weight: 400;
                  color: rgb(48, 46, 46);">
                    {{lessonplanbe}}
                  </div>
                </label>
                <label style="
                font-weight: bold;
                gap: 0.2rem;">
                  Cycle:
                  <div style="font-size: medium;
                  font-weight: 400;
                  color: rgb(48, 46, 46);">{{cycle}}</div>
                </label>
              </div>
              <div style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 0.5em; 
              width: 93.5%;
              padding: 1em 2em 1em 1em;
              border-radius: 5px;
              background-color: var(--gray-202);"
              >
                <div style="
                display: flex;
                flex-direction: column;
                gap: 1em;
                align-items: center;"
                >
                  <h3>Learning setting</h3>
                  <div style="
                  display: flex;
                  justify-content: space-around;
                  width: 100%;
                  gap: 2em;"
                  >
                    <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 0.5em;
                    width: 100%;"
                    >
                      <label style="
                      font-weight: bold;
                      gap: 0.2rem;"
                      >
                        Digital projector/TV:
                        <div style="font-size: medium;
                        font-weight: 400;
                        color: rgb(48, 46, 46);"
                        >
                          {{digitalprojector}}
                        </div>
                      </label>
                      <label style="
                      font-weight: bold;
                      gap: 0.2rem;"
                      >
                        Board:
                        <div style="font-size: medium;
                        font-weight: 400;
                        color: rgb(48, 46, 46);"
                        >
                          {{board}}
                        </div>
                      </label>
                      <label style="
                      font-weight: bold;
                      gap: 0.2rem;"
                      >
                        English Corner:
                        <div style="font-size: medium;
                        font-weight: 400;
                        color: rgb(48, 46, 46);"
                        >
                          {{englishcorner}}
                        </div>
                      </label>
                    </div>
                    <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 0.5em;
                    width: 100%;"
                    >
                      <label style="
                      font-weight: bold;
                      gap: 0.2rem;"
                      >
                        Noise level:
                        <div style="font-size: medium;
                        font-weight: 400;
                        color: rgb(48, 46, 46);"
                        >
                          {{noiselevel}}
                        </div>
                      </label>
                      <label style="
                      font-weight: bold;
                      gap: 0.2rem;"
                      >
                        Resource audio qlty.:
                        <div style="font-size: medium;
                        font-weight: 400;
                        color: rgb(48, 46, 46);"
                        >
                          {{resourceaudioqlty}}
                        </div>
                      </label>
                      <label style="
                      font-weight: bold;
                      gap: 0.2rem;"
                      >
                        NGL/Be Materials:
                        <div style="font-size: medium;
                        font-weight: 400;
                        color: rgb(48, 46, 46);"
                        >
                          {{nglbematerials}}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 0.5em; 
                width: 93.5%;
                padding: 1em 2em 1em 1em;
                border-radius: 5px;
                background-color: var(--gray-202);"
                >
                <div style="
                display: flex;
                flex-direction: column;
                gap: 1em;
                align-items: center;"
                >
                  <h3>Lesson planing</h3>
                  </div>
                  <div className={styles.boxLearning}>
                    <label style="
                    font-weight: bold;
                    gap: 0.2rem;">
                      LP1 - A lesson plan was provided.:
                      <div style="font-size: medium;
                      font-weight: 400;
                      color: rgb(48, 46, 46);">
                        {{lp1lessonplan}}
                      </div>
                    </label>
                    <label style="
                    font-weight: bold;
                    gap: 0.2rem;">
                      LP2- All proposed goals were addressed.:
                      <div style="font-size: medium;
                      font-weight: 400;
                      color: rgb(48, 46, 46);">
                        {{lp2proposedgoals}}
                      </div>
                    </label>
                    <label style="
                    font-weight: bold;
                    gap: 0.2rem;">
                      LP3 - Resources used contributed to achieved student
                      outcomes.:
                      <div style="font-size: medium;
                      font-weight: 400;
                      color: rgb(48, 46, 46);">
                        {{lp3resourcesused}}
                      </div>
                    </label>
                    <label style="
                    font-weight: bold;
                    gap: 0.2rem;">
                      LP4 - Changes to LP positively contributed to achieved
                      student outcomes.:
                      <div style="font-size: medium;
                      font-weight: 400;
                      color: rgb(48, 46, 46);">
                        {{lp4changes}}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 0.5em; 
              width: 93.5%;
              padding: 1em 2em 1em 1em;
              border-radius: 5px;
              background-color: var(--gray-202);">
                <div style="
                display: flex;
                flex-direction: column;
                gap: 1em;
                align-items: center;"
                >
                  <h3>Final comments</h3>
                </div>
                <div style=" 
                width: 100%;
                flex-wrap: wrap;
                word-wrap: break-word;
                overflow-wrap: break-word;"
                >
                {{finalcoments}}
                </div>
              </div>
            </div>
        </div>
`;
export default templateHTML;
