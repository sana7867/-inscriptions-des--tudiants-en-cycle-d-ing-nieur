document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = {
        firstName: this.firstName.value.trim(),
        lastName: this.lastName.value.trim(),
        year: this.year.value,
        department: this.department.value
    };

    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Supposons que data.student contient les données de l'étudiant existant si erreur il y a
            if (data.student) {
                const studentExistsDetails = `Un(e) étudiant(e) nommé(e) ${data.student.firstName} ${data.student.lastName} existe déjà dans la base de données.\n\n` +
                                             `Détails:\n` +
                                             `ID: ${data.student.id}\n` +
                                             `Prénom: ${data.student.firstName}\n` +
                                             `Nom: ${data.student.lastName}\n` +
                                             `Année: ${data.student.year}\n` +
                                             `Département: ${data.student.department}\n`;
                                             
                alert(studentExistsDetails);
            } else {
                // S'il n'y a pas de données étudiant, on affiche juste le message d'erreur
                alert(data.message);
            }
        } else {
            const studentAddedDetails = `L'étudiant(e) ${formData.firstName} ${formData.lastName} a été ajouté(e) avec succès.\n\n` +
                                        `Détails:\n` +
                                        `Prénom: ${formData.firstName}\n` +
                                        `Nom: ${formData.lastName}\n` +
                                        `Année: ${formData.year}\n` +
                                        `Département: ${formData.department}`;
            alert(studentAddedDetails);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    .finally(() => {
        this.reset();
    });
});
