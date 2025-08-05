const fs = require('fs'); // Módulo para manipulação de arquivos
const path = require('path'); //Forma segura de lidar com caminhos de arquivos
// em diferentes sistemas operacionais

// Lê o arquivo JSON
const dados = JSON.parse(fs.readFileSync('receitas.json', 'utf-8'));

// Cria pasta "recipes" se ainda não existir tanto pra Windows quanto pra Linux
const pasta = path.join(__dirname, 'recipes');
if (!fs.existsSync(pasta)) {
  fs.mkdirSync(pasta);
}

// Para cada receita no JSON, cria um arquivo HTML
dados.receitas.forEach(receita => {
  const conteudoHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${receita.titulo} - Odin Recipes</title>
  
  <!-- Fonte Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- CSS da receita -->
  <link rel="stylesheet" href="../recipe-style.css">
</head>
<body>
  <!-- Header com botão voltar -->
  <header class="header">
    <a href="../index.html" class="back-link">Voltar para Home</a>
  </header>

  <!-- Container principal -->
  <div class="recipe-container">
    <!-- Card da receita -->
    <div class="recipe-card">
      <!-- Título -->
      <h1 class="recipe-title">${receita.titulo}</h1>
      
      <!-- Imagem -->
      <img src="../${receita.imagem}" alt="${receita.titulo}" class="recipe-image">
      
      <!-- Conteúdo -->
      <div class="recipe-content">
        <!-- Seção de ingredientes -->
        <div class="recipe-section">
          <h2 class="section-title">Ingredientes</h2>
          <ul class="ingredients-list">
            ${receita.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
          </ul>
        </div>
        
        <!-- Seção de preparo -->
        <div class="recipe-section">
          <h2 class="section-title">Modo de Preparo</h2>
          <div class="preparation-text">
            ${receita.preparo}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Botão voltar no final -->
    <div class="bottom-back">
      <a href="../index.html" class="back-link">Explorar mais receitas</a>
    </div>
  </div>
</body>
</html>`;

  // Caminho do arquivo a ser salvo
  const nomeArquivo = path.join(pasta, `receita-${receita.id}.html`);

  // Salva o conteúdo no arquivo
  fs.writeFileSync(nomeArquivo, conteudoHTML, 'utf-8');

  console.log(`✅ Gerado: receita-${receita.id}.html`);
});

console.log(`\n🎉 ${dados.receitas.length} páginas de receitas geradas com sucesso!`);