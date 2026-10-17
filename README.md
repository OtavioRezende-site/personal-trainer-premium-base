# Caio Almeida — Personal Trainer Premium

Landing page completa em português brasileiro. Next.js (App Router), TypeScript, Tailwind CSS e Motion, com mídia local e configuração tipada para reutilização.

**Caio Almeida é um perfil fictício de demonstração.** Não há qualificações, depoimentos, resultados, endereços, agenda ou contatos inventados. As modalidades são exemplos identificados. Os vídeos originais fornecidos estão integrados sem alteração.

## Rodar

Use Node.js 24 LTS (`.nvmrc`; testado com 24.19.0) e npm. Em um clone do repositório:

```sh
npm ci
npm run dev
```

O servidor escuta em todas as interfaces, na porta 3000. Para executar a versão de produção:

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

Não são necessários banco de dados, chaves, conta de terceiros ou variáveis de ambiente. Dependências e fontes estão no lockfile; fontes, imagens e vídeos são servidos localmente. O cache npm fica em `.npm-cache/`, ignorado pelo Git.

## Visualizar em um tablet, sem publicar o site

1. No seu computador, use os comandos acima para iniciar o projeto.
2. Conecte computador e tablet à mesma rede Wi-Fi. Evite redes de convidados com isolamento de dispositivos.
3. Descubra o **IPv4 da rede local do computador** nas configurações de rede (Windows: `ipconfig`; macOS: `ipconfig getifaddr en0`; Linux: `hostname -I`).
4. No Safari ou Chrome do tablet, digite `http://IP-DO-COMPUTADOR:3000`, substituindo pelo IPv4 real. O endereço do próprio tablet ou `localhost` não aponta para o computador.
5. Se necessário, permita a porta 3000 no firewall **apenas para a rede privada**. Ao terminar, pare o servidor com `Ctrl+C`.

Este método não exige implantação pública nem serviço pago. O ambiente de nuvem desta conversa não forneceu uma ferramenta de encaminhamento de porta/URL de preview; iniciar o servidor aqui, por si só, não cria um link acessível no tablet. Em uma IDE que ofereça encaminhamento de portas autenticado, use a porta 3000 e mantenha a visibilidade privada.

## Personalizar para o próximo profissional

Edite **[`src/data/trainer.ts`](src/data/trainer.ts)**. A interface `TrainerConfig` contém:

- Identidade, nome, assinatura, título e cores primárias.
- Textos e enquadramento do hero, vídeos e pôsteres.
- Foto, biografia, filosofia e credenciais verificadas.
- Modalidades e respectivos textos, imagens e itens de acompanhamento.
- Etapas do método, diferenciais, FAQ e chamada final.
- Galeria aprovada, depoimentos autorizados e áreas verificadas.
- WhatsApp, Instagram, e-mail, SEO e visibilidade de seções.

Antes de usar para um cliente real:

1. Substitua o perfil fictício e **todos** os textos demonstrativos, incluindo a resposta de FAQ sobre horários e valores.
2. Cadastre apenas os serviços confirmados (`enabled: true`, `verified: true`). Fora do modo demo, serviços sem verificação ficam ocultos.
3. Substitua as mídias ilustrativas por arquivos aprovados e escreva textos alternativos corretos. Marque `gallery[].approved` para as imagens autorizadas.
4. Credenciais exigem `verified: true`. Depoimentos exigem `authorized: true`. Não acrescente avaliações, estrelas ou resultados sem autorização/evidência.
5. Cadastre `contact.whatsapp` como `55` + DDD + telefone, sem usar um número de exemplo. A função aceita números brasileiros válidos estruturalmente; é preciso confirmar que o número pertence ao profissional. Personalize `contact.message`. O link `wa.me` é montado com a mensagem codificada. Sem contato válido, o botão apresenta uma janela informativa e não envia nada.
6. `contact.instagram` recebe somente o nome de usuário, com ou sem `@`. Use `null` para contatos ausentes.
7. Cadastre cidade/região e `verified: true` em `serviceAreas`. Ative `sections.location` somente com dados reais. O link de mapa é opcional; não há iframe ou requisição a mapas em segundo plano.
8. Defina `seo.siteUrl` com o domínio HTTPS autorizado e revise título/descrição. Só então altere `isDemo` para `false`. O demo fica `noindex`, com `robots.txt` bloqueado e sitemap vazio. O site real ganha canonical, sitemap e dados estruturados de pessoa com áreas verificadas; não inventa endereço de estabelecimento ou nota de clientes.
9. Revise cores e contraste. Tons auxiliares e tipografia estão em `src/app/globals.css`; as quatro cores primárias vêm de `trainer.brand`.
10. Execute os checks e revise o enquadramento em todos os trechos dos novos vídeos antes de qualquer publicação.

Os controles em `sections` ocultam módulos e retiram os respectivos links do menu. Se não há dados aprovados, os módulos de depoimentos, localização e serviços não exibem conteúdo vazio. Elementos visuais genéricos e títulos de seção ficam nos componentes; dados de negócio ficam na configuração.

## Vídeos e imagens

Os arquivos enviados foram copiados para os caminhos definitivos:

| Arquivo | Origem enviada | Dimensões | Duração |
| --- | --- | --- | --- |
| `public/videos/hero-desktop.mp4` | `Trainer_coaching_client_in_gym_20261017132848.mp4` | 1920 × 1080 | 10 s |
| `public/videos/hero-mobile.mp4` | `Trainer_coaching_client_in_gym_20261017133329.mp4` | 1080 × 1920 | 10 s |

A integridade dos originais foi confirmada por SHA-256. Não foram gerados novos vídeos nem houve transcodificação, remoção de áudio ou alteração do conteúdo. O player é sempre mudo. Veja [`docs/MEDIA.md`](docs/MEDIA.md) para hashes, pôsteres e substituição.

- A partir de 1024 px: vídeo horizontal. Abaixo de 768 px: vertical. Tablets de 768 a 1023 px usam horizontal em paisagem e vertical em retrato.
- Só um elemento de vídeo recebe a fonte selecionada após a hidratação. Redimensionar/girar a tela pode carregar a outra fonte; a anterior deixa de ser utilizada.
- `muted`, `autoplay`, `loop`, `playsInline`, sem controles nativos. Há botão de pausa/reprodução acessível.
- `prefers-reduced-motion` ou economia de dados deixam o pôster estático e não carregam MP4 automaticamente. A reprodução continua disponível por ação explícita.
- Erro de rede, codec incompatível ou bloqueio de autoplay preservam o pôster e os CTAs. Ao voltar de uma aba em segundo plano, a reprodução permanece pausada até nova ação.
- `object-fit: cover` mantém a proporção. `hero.desktopPosition`, `hero.mobilePosition`, `hero.tabletLandscapePosition` e `hero.tabletPortraitPosition` controlam o foco. No celular, a mídia ocupa a região superior do hero e o degradê continua para a área de texto inferior, preservando os rostos. Em telas muito baixas, a altura mínima de 760 px mantém espaço de leitura.
- O hero reserva sua altura; as imagens abaixo têm proporções explícitas e são otimizadas pelo `next/image`. Os pôsteres têm art direction e `srcset` sem carregar os dois formatos desnecessariamente.

## Estrutura

```text
src/app/                   Rotas, layout, SEO, privacidade e estilos
src/components/            Hero, mídia, navegação, seções e interações
src/data/trainer.ts         Perfil configurável e interface TypeScript
src/lib/                   Filtros de conteúdo e construção dos contatos
tests/landing.spec.ts       Testes de integração, layout e acessibilidade
public/videos/             Os dois vídeos originais
public/images/             Pôsteres e frames de demonstração
```

## Verificação no navegador

```sh
# Uma vez em uma máquina sem Chromium instalado:
npx playwright install chromium

npm run build
npm run test:e2e
```

O teste usa `/usr/bin/chromium` se disponível; em outras máquinas usa o navegador gerenciado pelo Playwright. O runner sobe e para seu servidor de produção automaticamente quando não há outro em execução na porta 3000.

A suíte verifica as larguras 320, 360, 375, 390, 414, 430, 768, 820, 1024, 1440 e 1920 px, além de tablet em paisagem. Exercita o carregamento da fonte correta, ausência de overflow, navegação móvel, foco/Escape, abas por teclado, FAQ, fallback de mídia, redução de movimento, bloqueio de autoplay, privacidade, SEO e filtros de dados reais. Axe verifica regras WCAG A/AA no desktop e no celular. Os relatórios ficam em `playwright-report/` e `test-results/` (ignorados pelo Git).

A automação cobre Chromium. A validação final em Safari/iOS e no aparelho real continua recomendada, especialmente após substituir vídeos. As políticas de autoplay variam por navegador e modo de economia de energia.

## Privacidade e publicação

Não há analytics, pixel, formulário, cookies publicitários ou scripts externos. Os contatos externos só abrem por ação do visitante. O aviso em `/privacidade` deve ser revisto caso novos serviços sejam adicionados.

Nenhuma implantação pública, compra de serviço ou envio ao GitHub é realizado pelos comandos de desenvolvimento. Publicar é uma etapa separada que exige autorização do responsável.
