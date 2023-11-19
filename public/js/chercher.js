document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtenir les valeurs de recherche
    var searchFirstName = document.getElementById('firstNameSearch').value.trim();
    var searchLastName = document.getElementById('lastNameSearch').value.trim();

    // Ici, vous feriez un appel API pour rechercher l'étudiant par prénom et nom
    fetch(`/students/search?firstName=${searchFirstName}&lastName=${searchLastName}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Étudiant non trouvé.");
            } else {
                // Afficher les résultats dans les champs
                document.getElementById('studentId').value = data.id;
                document.getElementById('studentDepartment').value = data.department;
                document.getElementById('studentYear').value = data.year;

                // Montrer le formulaire des résultats
                document.getElementById('resultsForm').style.display = 'block';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
 document.getElementById('showState').addEventListener('click', function() {
        // Simulez la récupération de l'année actuelle de l'étudiant
        const studentYear = parseInt(document.getElementById('studentYear').value) || 0;
        const yearsRemaining = 3 - studentYear;
        let message = "";

        if (studentYear >= 1 && studentYear <= 3) {
            message = `L'étudiant est en année ${studentYear}. Il reste ${yearsRemaining} année(s) à compléter.`;
        } else {
            message = "Veuillez entrer une année valide entre 1 et 3.";
        }

        alert(message);
    });




// Supposons que vous avez un bouton ou un autre élément pour déclencher l'action de "quitter"

