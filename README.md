# Feira de Anúncios Club

MVP de micro marketplace/classificados multi-lojas com clube de associados para o domínio `feiradeanuncios.club`.

## Stack

- React + Vite
- TypeScript
- TailwindCSS
- Persistência inicial em `localStorage`
- Estrutura pronta para Cloudflare Pages

## Funcionalidades

- Home comercial e responsiva
- Lista de anúncios com busca e filtro por categoria
- Página de detalhes com WhatsApp e compartilhamento
- Solicitação de anúncio por WhatsApp
- Área de lojas participantes
- Clube de Associados com planos e captura de interessados
- Login admin mockado somente para desenvolvimento ou ambiente explicitamente restrito
- Painel admin para ativar/desativar, destacar, marcar associado e excluir anúncios

## Rodar localmente

Requer Node.js `^20.19.0` ou `>=22.12.0`.

```bash
npm install
npm run dev
```

Abra a URL exibida pelo Vite no navegador.

## Build

```bash
npm run build
```

Os arquivos finais ficam em `dist/`.

## Acesso admin

- Em desenvolvimento local, o mock usa por padrão:
  - Usuário: `admin`
  - Senha: `admin123`
- Em produção, o painel mockado fica desabilitado por padrão.
- Se você realmente precisar reativá-lo em um ambiente restrito, defina:
  - `VITE_ENABLE_MOCK_ADMIN=true`
  - `VITE_MOCK_ADMIN_USER=...`
  - `VITE_MOCK_ADMIN_PASSWORD=...`

O login continua sendo mockado. Não trate essas credenciais como segredo de produção: variáveis `VITE_*` ficam expostas no bundle do cliente. Para uso real, coloque o painel atrás de Cloudflare Access e migre a autenticação/autorização para backend.

## Segurança aplicada

- Headers de produção em `public/_headers` para Cloudflare Pages com `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy` e `HSTS`.
- Sem CORS permissivo por padrão. O projeto é estático e não expõe API pública que justifique `Access-Control-Allow-Origin: *`.
- Sanitização de dados lidos do `localStorage`, inclusive `ads`, `leads`, telefones, enums e URLs de imagem.
- Imagens externas limitadas a `https` e aos hosts hoje usados pelo projeto, com `referrerPolicy="no-referrer"` no render.
- Sessão admin mockada movida para `sessionStorage` com expiração curta, em vez de flag persistente sem validade.

## Limite atual de RLS

Hoje não existe RLS real porque o projeto ainda não usa banco nem backend confiável. Tudo que roda no navegador pode ser alterado pelo próprio cliente.

Para ter RLS de verdade, o caminho correto é:

- migrar anúncios, leads e ações administrativas para backend ou Pages Functions;
- autenticar usuários com um provedor real;
- aplicar autorização no servidor;
- só então ativar políticas de banco, por exemplo em Supabase/Postgres ou outra camada que suporte RLS.

## Deploy no Cloudflare Pages

1. Suba o projeto para um repositório Git.
2. Acesse Cloudflare Dashboard.
3. Entre em Workers & Pages > Create application > Pages.
4. Conecte o repositório.
5. Configure:
   - Framework preset: `React (Vite)` ou `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: deixe vazio, usando a raiz do repositório
   - Node.js: o arquivo `.node-version` fixa `20.19.0`
   - O arquivo `public/_headers` será copiado para o build e aplicado pelo Cloudflare Pages aos assets estáticos
6. Salve e publique.

## Domínio feiradeanuncios.club com Godaddy + Cloudflare

1. Adicione `feiradeanuncios.club` na Cloudflare.
2. Copie os nameservers informados pela Cloudflare.
3. Acesse a Godaddy e altere os nameservers do domínio para os nameservers da Cloudflare.
4. Atenção: ao trocar nameservers, a zona DNS passa a ser gerenciada na Cloudflare. Confira registros de e-mail antes e depois, se houver e-mail nesse domínio.
5. Aguarde a propagação DNS. Normalmente é rápido, mas pode levar até 48 horas globalmente.
6. No Cloudflare Pages, abra o projeto publicado.
7. Vá em Custom domains e adicione `feiradeanuncios.club`.
8. Confirme a configuração sugerida pela Cloudflare.
9. Após validação, o Pages passa a servir o site no domínio personalizado.

## Próximos passos recomendados

- Migrar anúncios e lojas para Firebase Firestore ou Cloudflare D1.
- Implementar upload real de imagens.
- Trocar login mockado por autenticação real.
- Criar painel para cadastrar lojas.
- Adicionar moderação e termos de uso.
