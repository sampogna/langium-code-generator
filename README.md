# Langium Generator

O **Langium Generator** é uma ferramenta poderosa que utiliza uma sintaxe personalizada para definir classes e gerar uma aplicação CRUD totalmente funcional com HTML, CSS, JavaScript e integração com o Supabase. Ele automatiza a criação de uma interface web baseada nas definições de classes fornecidas e realiza a integração com o Supabase para armazenamento no backend e autenticação de usuários.

## Funcionalidades

- **Sintaxe Personalizada**: Defina suas classes usando uma sintaxe simples e intuitiva.
- **Geração de CRUD**: Cria automaticamente uma aplicação completa com as operações de Criar, Ler, Atualizar e Deletar.
- **Frontend Completo**: Gera arquivos HTML, CSS e JavaScript prontos para uso.
- **Integração com Supabase**: Conecta-se automaticamente ao Supabase para gerenciamento do banco de dados e autenticação de usuários.
- **Parâmetros de Conexão**: Requer a URL do projeto Supabase e um token JWT para chamadas seguras à API.

## Requisitos

Antes de usar o Langium Generator, certifique-se de ter:

- **Node.js** (versão 14 ou superior)
- **Conta no Supabase**: Incluindo a URL do projeto e o token JWT.
- **Arquivo de Definição de Sintaxe**: Um arquivo com a sintaxe personalizada descrevendo as classes que deseja gerar.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/yourusername/langium-generator.git
   cd langium-code-generator/project/crud-generator/
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Uso

1. Abra o VSCode na pasta `crud-generator`.

2. Gere os arquivos da linguagem:
   ```bash
   npm run langium:generate
   ```

3. Compile o projeto:
   ```bash
   npm run build
   ```

4. No VSCode, pressione `F5`. Uma nova janela será aberta. Nela, crie um arquivo `test.crudg` com o seguinte conteúdo:
   ```txt
   entity User {
     name: STRING;
     age: INT;
   }
   ```

5. Volte para a janela original do VSCode (ou utilize o terminal dentro de `crud-generator`) e execute o seguinte comando, lembrando de ajustar o caminho para o arquivo `test.crudg`:
   ```bash
   node ./bin/cli generate ~/test.crudg
   ```

6. Uma nova pasta chamada `generate` será criada (ou sobrescrita) dentro de `crud-generator/`. Nela, deve aparecer um arquivo `test.js` com o seguinte conteúdo:
   ```javascript
   "use strict";

   console.log('Hello, User!');
   ```

---

Esses são os primeiros passos para começar. Os arquivos mais relevantes para o projeto estão localizados em:

- `crud-generator/src/cli/generator.ts`
- `crud-generator/src/cli/main.ts`
- `crud-generator/src/language/crud-generator.langium`

**Importante:** sempre que realizar alterações nesses arquivos, repita o processo a partir do passo 2.
