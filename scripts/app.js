document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const errorList = document.getElementById('error-list');
    const addErrorButton = document.getElementById('addError');
    const errorModal = document.getElementById('errorModal');
    const closeModalButton = document.getElementById('closeModal');
    const saveErrorButton = document.getElementById('saveError');
    const errorDescription = document.getElementById('errorDescription');
    const solutionPrompt = document.getElementById('solutionPrompt');
    const addSolutionButton = document.getElementById('addSolution');
    const skipSolutionButton = document.getElementById('skipSolution');
    const solutionDescription = document.getElementById('solutionDescription');

    // Função de pesquisa
    function searchErrors() {
        const query = searchInput.value.toLowerCase();
        const cards = errorList.querySelectorAll('.error-card');

        cards.forEach(card => {
            const errorText = card.querySelector('p').textContent.toLowerCase();
            if (errorText.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Adiciona o evento de clique no ícone de pesquisa
    searchButton.addEventListener('click', searchErrors);

    // Adiciona o evento de "Enter" no campo de pesquisa
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchErrors();
        }
    });

    // Exibe o modal para adicionar novo erro
    addErrorButton.addEventListener('click', () => {
        errorModal.style.display = 'flex';
        errorDescription.value = '';
        solutionDescription.value = '';
        solutionPrompt.style.display = 'block';
        solutionDescription.style.display = 'none';
    });

    // Fecha o modal
    closeModalButton.addEventListener('click', () => {
        errorModal.style.display = 'none';
    });

    // Escolha para adicionar solução
    addSolutionButton.addEventListener('click', () => {
        solutionPrompt.style.display = 'none';
        solutionDescription.style.display = 'block';
    });

    skipSolutionButton.addEventListener('click', () => {
        solutionPrompt.style.display = 'none';
    });

    // Salva o erro e adiciona à lista
    saveErrorButton.addEventListener('click', () => {
        addErrorCard(errorDescription.value, solutionDescription.value);
        errorModal.style.display = 'none';
    });

    // Função para adicionar um card de erro à lista
    function addErrorCard(description, solution) {
        const card = document.createElement('div');
        card.className = 'error-card';

        const errorText = document.createElement('p');
        errorText.textContent = description;

        const solutionText = document.createElement('p');
        if (solution) {
            solutionText.textContent = `Solução: ${solution}`;
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-button';

        const closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.className = 'close-button';
        closeButton.addEventListener('click', () => card.remove());

        // Evento para editar o card
        editButton.addEventListener('click', () => {
            // Cria legendas e campos de texto para editar o erro e solução
            const errorLabel = document.createElement('label');
            errorLabel.textContent = 'Erro:';
            errorLabel.className = 'label';

            const editDescription = document.createElement('textarea');
            editDescription.className = 'error-description';
            editDescription.value = errorText.textContent;

            const solutionLabel = document.createElement('label');
            solutionLabel.textContent = 'Solução:';
            solutionLabel.className = 'label';

            const editSolution = document.createElement('textarea');
            editSolution.className = 'solution-input';
            editSolution.value = solution ? solutionText.textContent.replace('Solução: ', '') : '';

            const saveEditButton = document.createElement('button');
            saveEditButton.textContent = 'Salvar';
            saveEditButton.className = 'save-button';

            // Salva as alterações e substitui o conteúdo do card
            saveEditButton.addEventListener('click', () => {
                errorText.textContent = editDescription.value;
                if (editSolution.value) {
                    solutionText.textContent = `Solução: ${editSolution.value}`;
                    if (!card.contains(solutionText)) {
                        card.insertBefore(solutionText, editButton);
                    }
                } else {
                    if (card.contains(solutionText)) {
                        solutionText.remove();
                    }
                }

                // Remove os campos de edição e restaura o botão de edição
                card.innerHTML = '';
                card.appendChild(closeButton);
                card.appendChild(errorText);
                if (solutionText.textContent) card.appendChild(solutionText);
                card.appendChild(editButton);
            });

            // Substitui o conteúdo do card pelo campo de edição com legendas
            card.innerHTML = '';
            card.appendChild(closeButton);
            card.appendChild(errorLabel);
            card.appendChild(editDescription);
            card.appendChild(solutionLabel);
            card.appendChild(editSolution);
            card.appendChild(saveEditButton);
        });

        card.appendChild(errorText);
        if (solution) card.appendChild(solutionText);
        card.appendChild(editButton);
        card.appendChild(closeButton);

        errorList.appendChild(card);
    }
});
