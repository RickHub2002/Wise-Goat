document.getElementById('home-page').addEventListener('click', () => {
    window.location.href = 'main.html'
})

document.addEventListener('DOMContentLoaded', async function() {
    const goatAdvice = document.getElementById('goat-advice')
    const goatImage = document.getElementById('goat-image')
    goatImage.src = Math.random('/assets')
})