document.addEventListener('DOMContentLoaded', () => {
    const errorList = document.getElementById('error-list');
    const addErrorButton = document.getElementById('addError');

    // Evento para adicionar novo erro
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

        const solutionInput = document.createElement('textarea');
        solutionInput.placeholder = 'Insira a solução aqui...';
        solutionInput.className = 'solution-input';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar Solução';
        saveButton.className = 'save-button';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.className = 'delete-button';

        const solutionText = document.createElement('p');
        solutionText.className = 'solution-text';
        solutionText.style.display = 'none'; // Escondido até que a solução seja salva

        // Evento para salvar a solução
        saveButton.addEventListener('click', () => {
            if (solutionInput.value.trim() !== '') {
                solutionText.textContent = `Solução: ${solutionInput.value}`;
                solutionText.style.display = 'block';
                solutionInput.style.display = 'none';
                saveButton.style.display = 'none';
            } else {
                alert('Por favor, insira uma solução antes de salvar.');
            }
        });

        // Evento para excluir o card
        deleteButton.addEventListener('click', () => {
            errorList.removeChild(card);
        });

        // Adicionar elementos ao card
        card.appendChild(errorDescription);
        card.appendChild(solutionInput);
        card.appendChild(saveButton);
        card.appendChild(solutionText);
        card.appendChild(deleteButton);

        return card;
    }
});
