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

    // Carrega os dados dos cards do Local Storage
    function loadErrorsFromStorage() {
        const savedErrors = JSON.parse(localStorage.getItem('errors')) || [];
        savedErrors.forEach(({ description, solution }) => {
            addErrorCard(description, solution);
        });
    }

    // Salva os dados dos cards no Local Storage
    function saveErrorsToStorage() {
        const errors = [];
        errorList.querySelectorAll('.error-card').forEach(card => {
            const description = card.querySelector('.error-description').textContent;
            const solutionElement = card.querySelector('.solution-description');
            const solution = solutionElement ? solutionElement.textContent.replace('Solução: ', '') : '';
            errors.push({ description, solution });
        });
        localStorage.setItem('errors', JSON.stringify(errors));
    }

    // Função de pesquisa
    function searchErrors() {
        const query = searchInput.value.toLowerCase().trim();
        const cards = errorList.querySelectorAll('.error-card');

        cards.forEach(card => {
            const errorText = card.querySelector('.error-description').textContent.toLowerCase();
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
        saveErrorsToStorage(); // Salva os dados no Local Storage após adicionar o card
        errorModal.style.display = 'none';
    });

    // Função para adicionar um card de erro à lista
    function addErrorCard(description, solution) {
        const card = document.createElement('div');
        card.className = 'error-card';

        const errorText = document.createElement('p');
        errorText.className = 'error-description';
        errorText.textContent = description;

        const solutionText = document.createElement('p');
        if (solution) {
            solutionText.className = 'solution-description';
            solutionText.textContent = `Solução: ${solution}`;
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-button';

        const closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.className = 'close-button';
        closeButton.addEventListener('click', () => {
            card.remove();
            saveErrorsToStorage(); // Salva os dados no Local Storage após remover o card
        });

        // Evento para editar o card
        editButton.addEventListener('click', () => {
            const editDescription = document.createElement('textarea');
            editDescription.className = 'error-description';
            editDescription.value = errorText.textContent;

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
                    solutionText.remove();
                }
                card.innerHTML = '';
                card.appendChild(closeButton);
                card.appendChild(errorText);
                if (solutionText.textContent) card.appendChild(solutionText);
                card.appendChild(editButton);
                saveErrorsToStorage(); // Salva os dados no Local Storage após editar o card
            });

            card.innerHTML = '';
            card.appendChild(closeButton);
            card.appendChild(editDescription);
            card.appendChild(editSolution);
            card.appendChild(saveEditButton);
        });

        card.appendChild(errorText);
        if (solution) card.appendChild(solutionText);
        card.appendChild(editButton);
        card.appendChild(closeButton);

        errorList.appendChild(card);
    }

    // Carrega os dados dos cards quando a página é carregada
    loadErrorsFromStorage();
});
