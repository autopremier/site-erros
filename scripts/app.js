document.addEventListener('DOMContentLoaded', () => {
    const errorList = document.getElementById('error-list');
    const addErrorButton = document.getElementById('addError');

    addErrorButton.addEventListener('click', () => {
        const errorCard = createErrorCard();
        errorList.appendChild(errorCard);
    });

    function createErrorCard() {
        const card = document.createElement('div');
        card.className = 'error-card';
        card.textContent = 'Novo erro - Clique para adicionar detalhes';
        card.addEventListener('click', () => editError(card));
        return card;
    }

    function editError(card) {
        const solution = prompt("Insira a solução para o erro:");
        if (solution) {
            card.textContent = `Erro resolvido: ${solution}`;
        }
    }
});
