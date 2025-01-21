document.addEventListener('DOMContentLoaded', async function() {
    const adviceTextElement = document.getElementById('advice-text');
    const goatImageElement = document.getElementById('goat-image');

    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
            throw new Error('Erro ao buscar conselho.');
        }
        const data = await response.json();
        let advice = data.slip.advice;

        // Agora, vamos traduzir o conselho
        advice = await translateToPortuguese(advice);

        adviceTextElement.textContent = advice;
    } catch (error) {
        adviceTextElement.textContent = 'Não foi possível carregar um conselho. Tente novamente!';
        console.error('Erro na API Advice Slip:', error.message);
    }

    // Define a URL da imagem do bode
    const goatImageURL = 'http://placegoat.com/300/300';
    goatImageElement.src = goatImageURL;
    goatImageElement.alt = 'Bodezinho';
});

// Função para traduzir o conselho para português
async function translateToPortuguese(text) {
    try {
        const response = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,                // O texto a ser traduzido
                source: "en",           // Idioma de origem (inglês)
                target: "pt",           // Idioma de destino (português)
                format: "text",
                alternatives: 3,        // Você pode ajustar a quantidade de alternativas se quiser
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro ao traduzir o texto.");
        }

        const data = await response.json();
        return data.translatedText; // Retorna o texto traduzido
    } catch (error) {
        console.error("Erro na tradução:", error.message);
        return "Erro ao traduzir o texto.";
    }
}
