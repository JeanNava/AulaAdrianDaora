document.body.addEventListener('click', () => {
    fetch('/clicado', { method: 'POST' })
        .then(response => {
                console.error("crico");
        })
});