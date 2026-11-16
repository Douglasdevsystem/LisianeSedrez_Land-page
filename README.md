# LisianeSedrez_Land-page

Landing page da **Lisiane Sedrez Advocacia e Assessoria Jurídica**, com atuação em Direito do Trabalho e Previdenciário em Pelotas/RS.

Site estático feito em HTML, CSS e JavaScript puros, sem etapa de build.

## Estrutura

```
.
├── index.html            # página única
├── favicon.svg
├── vercel.json           # cabeçalhos de cache e segurança no Vercel
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

## Deploy no Vercel

1. Em vercel.com, clique em **Add New → Project** e importe este repositório.
2. Framework Preset: **Other**. Deixe Build Command e Output Directory em branco.
3. Clique em **Deploy**. Cada push na branch `main` gera um novo deploy automaticamente.
