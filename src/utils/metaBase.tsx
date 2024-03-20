var jwt = require('jsonwebtoken');

var METABASE_SITE_URL = 'https://dados.be.education';
var METABASE_SECRET_KEY =
  'a00dcd93992562f5bfdedb18a918c7dd724ee5d450ecb0d73f46b9deeeddd906';
var payload = {
  resource: { dashboard: 10 },
  params: {
    escola_acompanhamento: ['Ágape Dom'],
    painel_de_acompanhamento: ['Ágape Dom'],
    escolas_form_cs: ['Ágape Dom'],
    escolas_lms: ['Ágape Dom'],
  },
  exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);
var iframeUrl =
  METABASE_SITE_URL +
  '/embed/dashboard/' +
  token +
  '#bordered=true&titled=true';
export default iframeUrl;
