// Variável para armazenar todas as receitas
let todasReceitas = [];

// Carrega as receitas do JSON
fetch('receitas.json')
  .then(response => response.json())
  .then(data => {
    todasReceitas = data.receitas; // Guarda todas as receitas
    mostrarReceitas(todasReceitas); // Mostra todas inicialmente
    configurarBusca(); // Configura os eventos de busca
  })
  .catch(error => console.error('Erro ao carregar receitas:', error));

// Função para mostrar receitas na tela
function mostrarReceitas(receitas) {
  const lista = document.getElementById('lista-receitas');
  lista.innerHTML = ''; // Limpa a lista atual

  // Se não há receitas para mostrar
  if (receitas.length === 0) {
    lista.innerHTML = '<p style="text-align: center; color: #666;">Nenhuma receita encontrada.</p>';
    return;
  }

  // Cria um card para cada receita
  receitas.forEach(receita => {
    const link = document.createElement('a');
    link.href = `recipes/receita-${receita.id}.html`;
    link.target = '_blank';
    link.classList.add('card');

    const imagem = document.createElement('img');
    imagem.src = receita.imagem;
    imagem.alt = receita.titulo;
    imagem.classList.add('card-img');

    const titulo = document.createElement('h3');
    titulo.textContent = receita.titulo;

    link.appendChild(imagem);
    link.appendChild(titulo);
    lista.appendChild(link);
  });
}

// Função para filtrar receitas baseado no termo de busca
function buscarReceitas(termo) {
  // Converte o termo para minúsculas para busca case-insensitive
  const termoBusca = termo.toLowerCase().trim();
  
  // Se o campo está vazio, mostra todas as receitas
  if (termoBusca === '') {
    mostrarReceitas(todasReceitas);
    return;
  }

  // Filtra as receitas que contêm o termo no título ou ingredientes
  const receitasFiltradas = todasReceitas.filter(receita => {
    // Verifica se o termo está no título
    const tituloContemTermo = receita.titulo.toLowerCase().includes(termoBusca);
    
    // Verifica se o termo está em algum ingrediente
    const ingredienteContemTermo = receita.ingredientes.some(ingrediente => 
      ingrediente.toLowerCase().includes(termoBusca)
    );
    
    // Retorna true se encontrou o termo no título OU nos ingredientes
    return tituloContemTermo || ingredienteContemTermo;
  });

  // Mostra as receitas filtradas
  mostrarReceitas(receitasFiltradas);
}

// Configura os eventos de busca
function configurarBusca() {
  // Pega os elementos do DOM
  const formularioBusca = document.querySelector('.busca');
  const campoBusca = document.querySelector('.busca input[type="text"]');
  const botaoBusca = document.querySelector('.busca button');

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