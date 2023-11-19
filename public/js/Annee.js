document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchByYearForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const year = document.getElementById('yearSearch').value;

        // Faire une requête AJAX vers le serveur pour rechercher les étudiants de l'année spécifiée
        fetch(`/students/year?year=${year}`)
            .then(response => response.json())
            .then(data => {
                const resultsDiv = document.getElementById('yearSearchResults');
                if (data.students && data.students.length > 0) {
                    let resultsHTML = '<ul>';
                    for (const student of data.students) {
                        resultsHTML += `<li>ID: ${student.id}, Nom: ${student.firstName}, Prénom: ${student.lastName}, Année: ${student.year}, Département: ${student.department}</li>`;
                    }
                    resultsHTML += '</ul>';
                    resultsDiv.innerHTML = resultsHTML;
                } else {
                    resultsDiv.innerHTML = '<p>Aucun étudiant trouvé pour cette année.</p>';
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    });
});
