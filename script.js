fetch('receitas.json')
  .then(response => response.json()) // Converte o conteúdo para JSON
  .then(data => {
    const lista = document.getElementById('lista-receitas');

    data.receitas.forEach(receita => {
      const link = document.createElement('a');
      link.href = `recipes/receita-${receita.id}.html`;
      link.target = '_blank'; // Abre em nova aba
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
  })
  .catch(error => console.error('Erro ao carregar receitas:', error));
