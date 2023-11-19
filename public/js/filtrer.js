document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchByDepartmentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const department = document.getElementById('departmentSearch').value;

        // Faire une requête AJAX vers le serveur pour rechercher les étudiants du département
        fetch(`/students/department?department=${department}`)
            .then(response => response.json())
            .then(data => {
                const resultsDiv = document.getElementById('searchResults');
                if (data.students && data.students.length > 0) {
                    let resultsHTML = '<ul>';
                    for (const student of data.students) {
                        resultsHTML += `<li>ID: ${student.id}, Nom: ${student.firstName}, Prénom: ${student.lastName}, Année: ${student.year}, Département: ${student.department}</li>`;
                    }
                    resultsHTML += '</ul>';
                    resultsDiv.innerHTML = resultsHTML;
                } else {
                    resultsDiv.innerHTML = '<p>Aucun étudiant trouvé dans ce département.</p>';
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    });
});
