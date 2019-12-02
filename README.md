# Meetapp

Aplicativo desenvolvido como desafio do curso bootcamp GoStack da Rocketseat.
O sistema é para auxiliar a criação e divulgação de Meetups, as principais funcionalidades são:

- Cadastrar novos usuários;
- Criar, alterar e excluir evento de Meetups;
- Se inscrever e cancelar uma inscrição em qualquer Meetup;

## Instalação local

- Clone este repositório:

```
git clone https://github.com/vitormiacri/bootcamp-meetapp clinic-api
```

### Backend

Para executar o **servidor da api**, siga os passos abaixo:

- Acesse a pasta `backend`:

```
cd backend
```

- Execute o comando abaixo para instalar as dependências:

```
npm install
or
yarn install
```

- Renomeie o arquivo _.env.example_ para _.env_ e preencha as variáveis de ambiente.

- Agora é só rodar o comando:

```
npm run dev
or
yarn dev
```

### Frontend

Para executar a **aplicação Web** , siga os passos abaixo:

- Acesse a pasta `frontend`:

```
cd frontend
```

- Execute o comando abaixo para instalar as dependências:

```
npm install
or
yarn install
```

- Agora é só rodar o comando:

```
npm start
or
yarn start
```

## Instalação Mobile

> Atenção! Para a construção do aplicativo mobile, foi utilizado React Native, somente testado na plataforma **Android**

- Siga os passos abaixo para rodar a aplicação:

  > Caso ainda não tenha configurado um ambiente android em sua máquina siga esse [tutorial](https://facebook.github.io/react-native/docs/getting-started)

- Caso ainda não tenha feito, clone este repositório, caso contrário, pule para o próximo passo:

```
git clone https://github.com/vitormiacri/stocks-price
```

- Acesse a pasta `meetapp`:

```
cd meetapp
```

- Baixe as dependências:

```
npm install
or
yarn install
```

- Plug e/ou configure o seu emulador ou dispositivo;

- Depois do ambiente com a SDK e o emulador ou dispotivo Android configurado plugado, instale a aplicação:

```
react-native run-android
```

- Agora é só rodar o comando e aguardar o aplicativo iniciar:

```
npm start
or
yarn start
```
