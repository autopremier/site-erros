document.addEventListener('DOMContentLoaded', () => {
    const errorList = document.getElementById('error-list');
    const addErrorButton = document.getElementById('addError');

    // Evento para adicionar novo campo de edição para um erro
    addErrorButton.addEventListener('click', () => {
        const errorCard = createErrorCard();
        errorList.appendChild(errorCard);
    });

    // Função para criar um novo card de erro
    function createErrorCard() {
        const card = document.createElement('div');
        card.className = 'error-card';

        const errorDescription = document.createElement('textarea');
        errorDescription.placeholder = 'Descreva o erro aqui...';
        errorDescription.className = 'error-description';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar';
        saveButton.className = 'save-button';

        const closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.className = 'close-button';

        // Evento para salvar o card e adicionar à lista
        saveButton.addEventListener('click', () => {
            const savedCard = document.createElement('div');
            savedCard.className = 'error-card';
            
            const savedText = document.createElement('p');
            savedText.textContent = errorDescription.value || 'Erro sem descrição';

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'edit-button';

            const savedCloseButton = closeButton.cloneNode(true);
            savedCloseButton.addEventListener('click', () => savedCard.remove());

            // Evento para editar o card
            editButton.addEventListener('click', () => {
                errorDescription.value = savedText.textContent;
                savedCard.replaceWith(card);
            });

            savedCard.appendChild(savedText);
            savedCard.appendChild(editButton);
            savedCard.appendChild(savedCloseButton);
            errorList.appendChild(savedCard);

            // Limpa a área de edição
            errorDescription.value = '';
        });

        closeButton.addEventListener('click', () => card.remove());

        card.appendChild(closeButton);
        card.appendChild(errorDescription);
        card.appendChild(saveButton);

        return card;
    }
});
