document.addEventListener('DOMContentLoaded', () => {
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
        const card = document.createElement('div');
        card.className = 'error-card';

        const errorText = document.createElement('p');
        errorText.textContent = errorDescription.value;

        const solutionText = document.createElement('p');
        if (solutionDescription.value) {
            solutionText.textContent = `Solução: ${solutionDescription.value}`;
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-button';

        const closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.className = 'close-button';
        closeButton.addEventListener('click', () => card.remove());

        card.appendChild(errorText);
        if (solutionDescription.value) card.appendChild(solutionText);
        card.appendChild(editButton);
        card.appendChild(closeButton);

        errorList.appendChild(card);
        errorModal.style.display = 'none';
    });
});
