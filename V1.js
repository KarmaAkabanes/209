document.getElementById("myButton").addEventListener("click", function () {
    const form = document.getElementById('postalCodeForm');
    const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
    const communesList = document.getElementById('communesList');
    const errorMessage = document.getElementById('communesList');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const postalCode = document.getElementById('postalCode').value;
        const postalCodeRegex = /^\d{5}$/;

        if (!postalCodeRegex.test(postalCode)) {
            errorMessage.textContent = 'Veuillez entrer un code postal valide (5 chiffres).';
            errorMessage.classList.remove('hidden');
            return;
        }

        fetch(apiUrl + postalCode)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    errorMessage.textContent = 'Le code postal demandé n\'existe pas.';
                } else {
                    communesList.innerHTML = data.map(commune => `<li>${commune.nom}</li>`).join('');
                }
            })
    });
});