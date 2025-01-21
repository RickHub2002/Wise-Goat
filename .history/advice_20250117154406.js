document.addEventListener('DOMContentLoaded', async function() {
    const adviceTextElement = document.getElementById('advice-text');
    const goatImageElement = document.getElementById('goat-image');

    try {
        // Passo 1: Obter o conselho em inglês
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
            throw new Error('Erro ao buscar conselho.');
        }
        const data = await response.json();
        const adviceInEnglish = data.slip.advice;

        // Passo 2: Traduzir o conselho para o português
        const translatedAdvice = await translateToPortuguese(adviceInEnglish);

        // Exibir o conselho traduzido
        adviceTextElement.textContent = translatedAdvice;

    } catch (error) {
        adviceTextElement.textContent = 'Não foi possível carregar um conselho. Tente novamente!';
        console.error('Erro na API Advice Slip:', error.message);
    }

    // Passo 3: Definir a URL da imagem do bode
    const goatImageURL = 'http://placegoat.com/300/300';
    goatImageElement.src = goatImageURL;
    goatImageElement.alt = 'Bodezinho';
});

// Função para traduzir o texto para o português usando a API LibreTranslate
async function translateToPortuguese(text) {
    try {
        const response = await fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: 'en',
                target: 'pt',
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao traduzir o texto.');
        }

        const data = await response.json();
        return data.translatedText; // Retorna o texto traduzido
    } catch (error) {
        console.error('Erro na tradução:', error.message);
        return text; // Caso ocorra um erro, retorna o texto original
    }
}
