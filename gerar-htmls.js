const fs = require('fs');
const path = require('path');

// Lê o arquivo JSON
const dados = JSON.parse(fs.readFileSync('receitas.json', 'utf-8'));

// Cria pasta "recipes" se ainda não existir
const pasta = path.join(__dirname, 'recipes');
if (!fs.existsSync(pasta)) {
  fs.mkdirSync(pasta);
}

// Para cada receita no JSON, cria um arquivo HTML
dados.receitas.forEach(receita => {
  const conteudoHTML = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>${receita.titulo}</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <div class="container">
    <h1>${receita.titulo}</h1>
    <img src="../${receita.imagem}" alt="${receita.titulo}" class="recipe-image">
    
    <h2>Ingredientes</h2>
    <ul>
      ${receita.ingredientes.map(item => `<li>${item}</li>`).join('')}
    </ul>
    
    <h2>Modo de Preparo</h2>
    <p>${receita.preparo}</p>

    <p><a href="../index.html">← Voltar para a Home</a></p>
  </div>
</body>
</html>
`;

  // Caminho do arquivo a ser salvo
  const nomeArquivo = path.join(pasta, `receita-${receita.id}.html`);

  // Salva o conteúdo no arquivo
  fs.writeFileSync(nomeArquivo, conteudoHTML, 'utf-8');

  console.log(`✅ Gerado: receita-${receita.id}.html`);
});
