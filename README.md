# Next15 Persian Captcha

### Install deps

After cloning the project, you are going to have to install deps:

```bash
yarn
cp .env.local.example .env.local
```

### Run the app

To run the app in dev & prod mode, use commands below:

dev:

```bash
yarn dev
```

prod:

```bash
yarn build
yarn start
```

docker:

```bash
docker build -t next15-persian-captcha .
docker run --env-file .env.local -p 3000:3000 next15-persian-captcha
```
