const adviceAPI = "https://api.adviceslip.com/advice";
const placeGoatBaseURL = "http://placegoat.com";

// Função para buscar a frase da API Advice Slip
async function fetchAdvice() {
  try {
    const response = await fetch(adviceAPI);
    if (!response.ok) {
      throw new Error("Erro ao buscar conselho.");
    }

    const data = await response.json();
    return data.slip.advice; // Retorna apenas o conselho
  } catch (error) {
    console.error("Erro na API Advice Slip:", error.message);
    return "Não foi possível carregar um conselho. Tente novamente!";
  }
}

// Função para gerar o URL da imagem do bode
function generateGoatImageURL(width, height) {
  return `${placeGoatBaseURL}/${width}/${height}`;
}

// Função principal para exibir o conselho e o bode na página
async function displayAdviceAndGoat() {
  // Seleciona os elementos do DOM
  const adviceTextElement = document.getElementById("advice-text");
  const goatImageElement = document.getElementById("goat-image");

  // Busca o conselho da API
  const advice = await fetchAdvice();

  // Atualiza o texto do conselho no DOM
  adviceTextElement.textContent = advice;

  // Gera e insere a imagem do bode no DOM
  const goatImageURL = generateGoatImageURL(300, 300); // Exemplo: largura 300px, altura 300px
  goatImageElement.src = goatImageURL;
  goatImageElement.alt = "Bodezinho";
}

// Executa a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  displayAdviceAndGoat();
});
