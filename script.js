// Função principal para encontrar a combinação de ingredientes com o menor número de elementos
function findMinIngredientsCombination(ingredients, target) {
    // Ordena os ingredientes em ordem crescente para manter a ordem natural
    ingredients.sort((a, b) => a - b);
    
    // Variável para armazenar a melhor combinação encontrada
    let bestCombination = null;
    
    // Função recursiva para buscar combinações
    function backtrack(startIndex, currentCombination, remaining) {
        // Se encontramos uma combinação que soma exatamente ao target
        if (remaining === 0) {
            // Se é a primeira combinação encontrada ou se tem menos elementos que a melhor anterior
            if (!bestCombination || currentCombination.length < bestCombination.length) {
                bestCombination = [...currentCombination];
            }
            return;
        }
        
        // Se já temos uma combinação melhor que a atual, podemos parar esta busca
        if (bestCombination && currentCombination.length >= bestCombination.length) {
            return;
        }
        
        // Percorre os ingredientes restantes
        for (let i = startIndex; i < ingredients.length; i++) {
            const num = ingredients[i];
            
            // Se o número atual for maior que o remaining, pulamos para o próximo
            if (num > remaining) continue;
            
            // Adiciona o número à combinação atual
            currentCombination.push(num);
            
            // Chama recursivamente para o próximo número com o remaining atualizado
            backtrack(i + 1, currentCombination, remaining - num);
            
            // Remove o último número adicionado (backtrack)
            currentCombination.pop();
        }
    }
    
    // Inicia o backtracking
    backtrack(0, [], target);
    
    return bestCombination;
}

// Função para lidar com o clique no botão CRIAR
function handleCreateClick() {
    // Obtém os valores dos inputs
    const ingredientsInput = document.getElementById('ingredients').value;
    const targetInput = parseInt(document.getElementById('target').value);
    
    // Valida os inputs
    if (!ingredientsInput || isNaN(targetInput)) {
        showResult('Por favor, insira ingredientes válidos e um valor alvo.', false);
        return;
    }
    
    // Converte os ingredientes para array de números
    const ingredients = ingredientsInput.split(',')
        .map(item => parseInt(item.trim()))
        .filter(item => !isNaN(item));
    
    if (ingredients.length === 0) {
        showResult('Por favor, insira ingredientes válidos.', false);
        return;
    }
    
    // Encontra a combinação ótima
    const result = findMinIngredientsCombination(ingredients, targetInput);
    
    // Exibe o resultado em ordem crescente
    if (result) {
        showResult(`Combinação perfeita encontrada: [${result.sort((a, b) => a - b).join(', ')}]`, true);
    } else {
        showResult('Nenhuma combinação válida encontrada para este valor alvo.', false);
    }
}

// Função para exibir o resultado
function showResult(message, isSuccess) {
    const resultBox = document.getElementById('result');
    resultBox.textContent = message;
    resultBox.className = isSuccess ? 'result-box success' : 'result-box';
}

// Função para limpar os inputs (botão VOLTAR)
function handleBackClick() {
    document.getElementById('ingredients').value = '';
    document.getElementById('target').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('result').className = 'result-box';
}

// Adiciona os event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.querySelector('.create-btn');
    const backButton = document.querySelector('.back-btn');
    
    createButton.addEventListener('click', handleCreateClick);
    backButton.addEventListener('click', handleBackClick);
    
    // Permite pressionar Enter no input de target para acionar o CRIAR
    document.getElementById('target').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCreateClick();
        }
    });
});