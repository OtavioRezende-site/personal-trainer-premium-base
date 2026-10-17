# Mídia do modelo

Os dois MP4 são os anexos originais, copiados sem alterações. Ambos usam H.264 e têm 10 segundos. As trilhas de áudio permanecem no arquivo, mas não são reproduzidas pelo hero (`muted`).

## SHA-256

```text
6492831d4c3cab85285b1129576ca3b358f1f450f59a6a7d342f78ee9e6041e6  public/videos/hero-desktop.mp4
3397d2287158aebec6bb47f40c7e7be87d9eccf8e9330378b951b5d538558cc4  public/videos/hero-mobile.mp4
```

## Substituir os vídeos

1. Substitua os arquivos em `public/videos/hero-desktop.mp4` e `public/videos/hero-mobile.mp4` com arquivos autorizados. Mantenha 16:9 para desktop e 9:16 para celular, preferencialmente MP4 H.264 com metadados de streaming (`faststart`) já fornecidos pelo editor. Este projeto não reprocessa seus originais.
2. Se usar outros nomes, altere `hero.desktopVideo` e `hero.mobileVideo` em `src/data/trainer.ts`.
3. Substitua também os quatro pôsteres: `hero-desktop.webp` (1920 px), `hero-desktop-small.webp` (960 px), `hero-mobile.webp` (900 px) e `hero-mobile-small.webp` (480 px). Preserve a proporção original de cada formato. Eles são necessários para rede lenta, redução de movimento e falha de reprodução.
4. Revise `desktopPosition`, `mobilePosition`, `tabletLandscapePosition` e `tabletPortraitPosition` ao longo do vídeo completo. Os focos dos anexos foram inspecionados em diferentes momentos; outro vídeo exige nova revisão. Não posicione texto sobre rostos ou a região principal do exercício.
5. Remova os frames ilustrativos de demonstração e use retrato/galeria aprovados. As pessoas exibidas nos anexos não são apresentadas como o profissional fictício nem como clientes com resultados reais.
6. Rode `npm run build` e `npm run test:e2e`. Inspecione também o aparelho de destino.

Exemplo opcional para extrair um pôster **sem modificar o MP4** (FFmpeg instalado):

```sh
ffmpeg -ss 4 -i public/videos/hero-desktop.mp4 -frames:v 1 -vf scale=1920:-1 -quality 82 public/images/hero-desktop.webp
ffmpeg -ss 4 -i public/videos/hero-desktop.mp4 -frames:v 1 -vf scale=960:-1 -quality 78 public/images/hero-desktop-small.webp
ffmpeg -ss 4 -i public/videos/hero-mobile.mp4 -frames:v 1 -vf scale=900:-1 -quality 82 public/images/hero-mobile.webp
ffmpeg -ss 4 -i public/videos/hero-mobile.mp4 -frames:v 1 -vf scale=480:-1 -quality 78 public/images/hero-mobile-small.webp
```

Escolha um frame que funcione na composição. Esses comandos escrevem somente imagens derivadas e pedem confirmação antes de sobrescrever um pôster existente.

## Imagens de demonstração

Todos os WebP da galeria, dos serviços e da apresentação foram extraídos dos próprios vídeos enviados. Não são provas de atendimento, qualificações ou resultados. O site os identifica como imagens ilustrativas. Nenhuma fotografia sintética, foto de banco ou depoimento foi criado.

As fontes Barlow Condensed e Manrope são distribuídas pelos pacotes `@fontsource`, com suas licenças incluídas em `node_modules/@fontsource/*/LICENSE`. São hospedadas junto da aplicação e não fazem chamadas ao Google Fonts.
