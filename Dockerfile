# Usando uma imagem leve do Node.js
FROM node:20.11.0-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo de dependências e instala as dependências
COPY package.json . 
RUN npm install

# Copia todo o código para o container
COPY . .

# Expondo a porta (certifique-se de que seu server.js use a porta 5000 ou a porta definida em process.env.PORT)
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
