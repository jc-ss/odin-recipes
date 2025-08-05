// Variável para armazenar todas as receitas
let todasReceitas = [];

// Carrega as receitas do JSON
fetch('receitas.json')
  .then(response => response.json()) //Converte a resposta em objeto JavaScript
  .then(data => {
    todasReceitas = data.receitas; // Guarda todas as receitas
    mostrarReceitas(todasReceitas); // Mostra todas inicialmente
    configurarBusca(); // Configura os eventos de busca
  })
  .catch(error => console.error('Erro ao carregar receitas:', error));

/**
 * Exemplo de card de receita gerado:
 * <a class="card" href="recipes/receita-1.html">
 *   <img class="card-img" src="images/lasanha.jpg" alt="Lasanha">
 *   <h3>Lasanha</h3>
 * </a>
 */

// Função para mostrar receitas na tela
function mostrarReceitas(receitas) {
  const lista = document.getElementById('lista-receitas');
  lista.innerHTML = ''; // Limpa a lista atual

  // Se não há receitas para mostrar
  if (receitas.length === 0) {
    lista.innerHTML = '<div class="no-results">Nenhuma receita encontrada 😔</div>';
    return;
  }

  // Cria um card para cada receita
  receitas.forEach(receita => {
    const link = document.createElement('a'); //Cria um elemento <a>, um link
    link.href = `recipes/receita-${receita.id}.html`;//Define o link para a receita
    link.target = '_blank'; // Força a abrir em nova aba
    link.classList.add('card'); // Adiciona uma classe para estilização

    const imagem = document.createElement('img');
    // Usa uma imagem padrão se receita.imagem estiver vazia ou indefinida
    imagem.src = receita.imagem ? receita.imagem : 'images/fallback.jpg'; // Substitua pelo caminho da sua imagem padrão
    imagem.alt = receita.titulo; // Define o texto alternativo da imagem com base no título
    imagem.classList.add('card-img'); // Adiciona uma classe para estilização

    // Se a imagem falhar ao carregar, usa a imagem padrão
    imagem.onerror = function() {
      this.onerror = null; // Evita loop infinito caso a fallback também falhe
      this.src = 'images/fallback.jpg'; // Substitua pelo caminho da sua imagem padrão
    };

    const titulo = document.createElement('h3'); // Cria um elemento <h3> para o título
    titulo.textContent = receita.titulo; // Define o texto do título com base no título da receita

    link.appendChild(imagem); // Adiciona a imagem ao link
    link.appendChild(titulo); // Adiciona o título ao link
    lista.appendChild(link); // Adiciona o link à lista de receitas
  });
}


// Função para filtrar receitas baseado no termo de busca
function buscarReceitas(termo) { // Termo vem do do campo de busca
  // Converte o termo para minúsculas para busca case-insensitive
  const termoBusca = termo.toLowerCase().trim();

  // Se o campo está vazio, mostra todas as receitas
  if (termoBusca === '') {
    mostrarReceitas(todasReceitas);
    return;
  }

  // Filtra receitas pelo termo no título ou ingredientes
  const receitasFiltradas = todasReceitas.filter(receita => {
    // Verifica se o termo está no título
    const tituloContemTermo = receita.titulo.toLowerCase().includes(termoBusca);

    // Verifica se o termo está em algum ingrediente
    const ingredienteContemTermo = Array.isArray(receita.ingredientes) && receita.ingredientes.some(ingrediente =>
      ingrediente.toLowerCase().includes(termoBusca)
    );

    // Retorna true se encontrou o termo no título OU nos ingredientes
    return tituloContemTermo || ingredienteContemTermo;
  });

  // Mostra as receitas filtradas
  mostrarReceitas(receitasFiltradas);
}
  // Pega os elementos do DOM
  const formularioBusca = document.querySelector('.busca'); // Pega o form de busca
function configurarBusca() {
  // Pega os elementos do DOM
  const formularioBusca = document.querySelector('.busca'); // Pega o form de busca
  const campoBusca = document.querySelector('.busca input[type="text"]');
  const botaoBusca = document.querySelector('.busca button');

  // Verifica se o campo de busca existe antes de adicionar eventos
  if (!campoBusca) {
    console.warn('Campo de busca não encontrado!');
    return;
  }

  // Evento 1: Quando o usuário submete o formulário (aperta Enter ou clica no botão)
  formularioBusca.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Impede o formulário de recarregar a página
    const termo = campoBusca.value; // Pega o valor digitado
    buscarReceitas(termo); // Executa a busca
  });

  // Evento 2: Busca em tempo real enquanto o usuário digita
  campoBusca.addEventListener('input', function(evento) {
    const termo = evento.target.value; // Pega o valor atual do campo
    buscarReceitas(termo); // Executa a busca
  });

  // Evento 3: Quando clica no botão de busca
  botaoBusca.addEventListener('click', function(evento) {
    evento.preventDefault(); // Impede comportamento padrão
    const termo = campoBusca.value;
    buscarReceitas(termo);
  });
}