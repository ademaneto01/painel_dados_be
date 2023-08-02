# Use a imagem base do Node.js com um servidor HTTP embutido (por exemplo, Nginx)
FROM node:14 as build-stage

# Crie um diretório para o frontend dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY painel_dados_be/BeyondPainel/package*.json ./

# Instale as dependências do Node.js para o frontend
RUN yarn

# Copie o resto do código fonte do frontend para o contêiner
COPY painel_dados_be/BeyondPainel/ .

# Construa a aplicação para produção (verifique qual é o comando para construir o frontend no seu projeto)
RUN yarn build

# Use um servidor HTTP embutido (por exemplo, Nginx) para servir os arquivos estáticos do frontend
FROM nginx:alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
