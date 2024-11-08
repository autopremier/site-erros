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
            // Cria um campo de texto para editar o erro
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
                    if (card.contains(solutionText)) {
                        solutionText.remove();
                    }
                }

                // Remove os campos de edição e restaura o botão de edição
                card.replaceChild(errorText, editDescription);
                if (card.contains(editSolution)) {
                    card.replaceChild(solutionText, editSolution);
                }
                card.replaceChild(editButton, saveEditButton);
            });

            // Substitui o conteúdo do card pelo campo de edição
            card.replaceChild(editDescription, errorText);
            if (solution) {
                card.replaceChild(editSolution, solutionText);
            } else {
                card.appendChild(editSolution);
            }
            card.replaceChild(saveEditButton, editButton);
        });

        card.appendChild(errorText);
        if (solution) card.appendChild(solutionText);
        card.appendChild(editButton);
        card.appendChild(closeButton);

        errorList.appendChild(card);
    }
});
