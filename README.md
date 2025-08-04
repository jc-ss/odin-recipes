# Odin Recipes

Este é um projeto feito como parte do [The Odin Project](https://www.theodinproject.com/), que evoluiu de uma página HTML básica para uma aplicação web completa com funcionalidades dinâmicas.

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e grid responsivo
- **JavaScript ES6+** - Funcionalidades interativas
- **JSON** - Armazenamento de dados
- **Node.js** - Automação de geração de páginas

## ✨ Funcionalidades

- 📱 **Design responsivo** - Funciona em desktop e mobile
- 🔍 **Busca em tempo real** - Pesquise por título ou ingredientes
- 🎯 **Busca inteligente** - Case-insensitive, busca em múltiplos campos
- 🤖 **Geração automática** - Páginas de receitas criadas automaticamente
- 📊 **Dados estruturados** - Sistema baseado em JSON para fácil manutenção

## 🛠️ Como usar

### Opção 1: Apenas visualizar
1. Clone o repositório:
   ```bash
   git clone git@github.com:jc-ss/odin-recipes.git
   cd odin-recipes
   ```

2. Gere as páginas das receitas:
   ```bash
   node gerar-htmls.js
   ```

3. Abra o `index.html` no seu navegador

### Opção 2: Para desenvolvimento
1. Siga os passos 1-2 acima
2. Modifique o `receitas.json` para adicionar novas receitas
3. Execute `node gerar-htmls.js` novamente para atualizar as páginas
4. Atualize o navegador

## 📁 Estrutura do Projeto

```
odin-recipes/
├── index.html              # Página principal
├── style.css               # Estilos CSS
├── script.js               # Lógica JavaScript
├── receitas.json           # Base de dados das receitas
├── gerar-htmls.js          # Gerador automático de páginas
├── recipes/                # Páginas geradas automaticamente
│   ├── receita-1.html
│   └── receita-2.html
└── images/                 # Imagens das receitas
    ├── lasanha.jpg
    └── carreteiro.jpg
```

## 🔧 Adicionando Novas Receitas

1. Adicione a receita no arquivo `receitas.json`:
   ```json
   {
     "id": 3,
     "titulo": "Nova Receita",
     "imagem": "images/nova-receita.jpg",
     "ingredientes": ["ingrediente 1", "ingrediente 2"],
     "preparo": "Modo de preparo..."
   }
   ```

2. Execute o gerador:
   ```bash
   node gerar-htmls.js
   ```

3. A nova receita aparecerá automaticamente na página principal!

## 🎯 Próximas Funcionalidades

- [ ] **Formulário para adicionar receitas** - Usuários poderão cadastrar novas receitas via interface web
- [ ] **Modo escuro** - Toggle entre tema claro e escuro
- [ ] **Melhoria no design** - Interface mais moderna e atrativa

## 📈 Evolução do Projeto

- **v1.0**: HTML estático básico
- **v2.0**: CSS responsivo + múltiplas páginas  
- **v3.0**: Sistema JSON + geração automática
- **v4.0**: Busca em tempo real + JavaScript avançado
- **v5.0** *(em desenvolvimento)*: Formulário para adicionar receitas + modo escuro + design aprimorado

---

Projeto em constante evolução para demonstrar conhecimentos em desenvolvimento web full stack! 🚀