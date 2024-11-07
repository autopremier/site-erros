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
        solutionInput.placeholder = 'Insira a solução aqui (opcional)...';
        solutionInput.className = 'solution-input';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar';
        saveButton.className = 'save-button';

        const closeButton = document.createElement('span');
        closeButton.textContent = '×'; // Símbolo de "X"
        closeButton.className = 'close-button';

        const solutionText = document.createElement('p');
        solutionText.className = 'solution-text';
        solutionText.style.display = 'none';

        saveButton.addEventListener('click', () => {
            solutionText.textContent = solutionInput.value.trim() ? `Solução: ${solutionInput.value}` : 'Nenhuma solução adicionada';
            solutionText.style.display = 'block';
            errorDescription.disabled = true;
            solutionInput.style.display = 'none';
            saveButton.style.display = 'none';
        });

        closeButton.addEventListener('click', () => {
            const confirmDelete = confirm("Deseja realmente excluir este erro?");
            if (confirmDelete) {
                errorList.removeChild(card);
            }
        });

        card.addEventListener('click', () => {
            if (saveButton.style.display === 'none') {
                solutionInput.style.display = 'block';
                saveButton.style.display = 'inline-block';
            }
        });

        card.appendChild(closeButton);
        card.append
