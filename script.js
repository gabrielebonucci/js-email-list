// selezioni gli elementi
const list = document.getElementById('email-list');
const loader = document.getElementById('loading-message');
const generateBtn = document.getElementById('generate-btn');

function fetchAndViewEmails() {
    loader.style.display = 'block';
    list.innerHTML = '';
    
// contenitore vuoto per le chiamate
const requests = [];

// faccio 10 chiamate API con un ciclo for
for (let i = 0; i < 10; i++) {
    // Ad ogni ciclo, faccio una chiamata API con Axios.

    const promise = axios.get('https://flynn.boolean.careers/exercises/api/random/mail');

    requests.push(promise);

}

Promise.all(requests)
    // .then() si attiva solo quando tutte le 10 promesse hanno avuto successo.
.then(responses => {
    // Appena le risposte arrivano, nascondo il messaggio di caricamento
    loader.style.display = 'none';

    for (let i = 0; i < responses.length; i++) {
        
        const email = responses[i].data.response;

        const li = document.createElement('li');

        li.className = 'list-group-item';

        li.textContent = email;

        list.appendChild(li);
        
    }
})

.catch(error => {
// Se anche solo una chiamata fallisce, mostro l'errore
console.error("Siè verificato un errore", error);
list.innerHTML = '<li>Errore nel caricamento delle email!</li>';

});

}

generateBtn.addEventListener('click', fetchAndViewEmails);
fetchAndViewEmails();
