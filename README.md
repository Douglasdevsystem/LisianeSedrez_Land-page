# LisianeSedrez_Land-page

Landing page da **Lisiane Sedrez Advocacia e Assessoria Jurídica**, com atuação em Direito do Trabalho e Previdenciário em Pelotas/RS.

Site estático feito em HTML, CSS e JavaScript puros, sem etapa de build.

## Estrutura

```
.
├── index.html            # página única
├── favicon.svg
├── vercel.json           # cabeçalhos, cache e cron do Vercel
├── api/
│   ├── instagram.js          # busca os últimos posts do Instagram
│   └── instagram-refresh.js  # renova o token automaticamente (cron)
└── assets/
    ├── css/styles.css
    ├── js/script.js      # abas, checklist, menu mobile, links de WhatsApp
    └── img/              # fotos
```

## Rodar localmente

```bash
python -m http.server 5500
# abra http://127.0.0.1:5500
```

## Configuração

- **WhatsApp:** altere a constante `WHATSAPP` no início de `assets/js/script.js` (formato `55` + DDD + número, só dígitos). Todos os botões usam esse número.
- **OAB:** inclua o número de inscrição na seção "Sobre" do `index.html` (há um comentário marcando o local).

## Feed automático do Instagram

A seção "Conteúdo no Instagram" carrega sozinha os 6 posts mais recentes de
[@lisianesedrezadvocacia](https://www.instagram.com/lisianesedrezadvocacia/).
Sem token configurado (ou rodando localmente), ela mostra um cartão com link para o perfil.

1. A conta do Instagram precisa ser **Profissional** (Comercial ou Criador de conteúdo).
2. Em developers.facebook.com, crie um app do tipo **Business** e adicione o produto
   **Instagram → API setup with Instagram login**.
3. Em "Generate access tokens", adicione a conta @lisianesedrezadvocacia e gere o token
   (ele já é de longa duração, 60 dias).
4. No Vercel, em **Settings → Environment Variables**, crie:
   - `INSTAGRAM_TOKEN` = o token gerado
   - `CRON_SECRET` = uma senha aleatória qualquer (protege a rota de renovação)
5. Faça um novo deploy. O cron em `vercel.json` renova o token nos dias 1 e 15 de cada mês.

## Deploy no Vercel

1. Em vercel.com, clique em **Add New → Project** e importe este repositório.
2. Framework Preset: **Other**. Deixe Build Command e Output Directory em branco.
3. Clique em **Deploy**. Cada push na branch `main` gera um novo deploy automaticamente.
