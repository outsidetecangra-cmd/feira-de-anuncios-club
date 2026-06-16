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
- Cadastro de anúncio com salvamento em `localStorage`
- Área de lojas participantes
- Clube de Associados com planos e captura de interessados
- Login admin mockado
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

- Usuário: `admin`
- Senha: `admin123`

O login é mockado para o MVP. A estrutura pode ser migrada depois para Firebase Auth, Cloudflare Access ou outro provedor.

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
