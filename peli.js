document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card');
    
    // Iterar sobre cada tarjeta utilizando el método forEach
    cards.forEach(card => {
        // Obtener elementos dentro de la tarjeta mediante desestructuración
        const { title, description, img, editBtn } = {
            title: card.querySelector('.card-title'),
            description: card.querySelector('.card-text'),
            img: card.querySelector('.card-img-top'),
            editBtn: card.querySelector('.btn-secondary')
        };

        // Crear botón de guardar mediante desestructuración
        const { saveBtn } = {
            saveBtn: (() => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-success';
                btn.innerText = 'Guardar';
                btn.style.display = 'none'; // Inicialmente oculto
                return btn;
            })()
        };

        // Crear campo de entrada para la imagen mediante desestructuración
        const { fileInput } = {
            fileInput: (() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.style.display = 'none'; // Inicialmente oculto
                return input;
            })()
        };

        // Función para activar el modo de edición utilizando función de flecha
        editBtn.addEventListener('click', event => {
            event.preventDefault(); // Evitar que la página se desplace al inicio
            title.contentEditable = true; // Hacer el título editable
            description.contentEditable = true; // Hacer la descripción editable
            img.style.display = 'none'; // Ocultar la imagen
            fileInput.style.display = 'inline-block'; // Mostrar el campo de entrada de la imagen
            editBtn.style.display = 'none'; // Ocultar el botón editar
            saveBtn.style.display = 'inline-block'; // Mostrar el botón guardar
        });

        // Función para guardar los cambios utilizando función de flecha
        saveBtn.addEventListener('click', () => {
            title.contentEditable = false; // Desactivar la edición del título
            description.contentEditable = false; // Desactivar la edición de la descripción
            img.style.display = 'block'; // Mostrar la imagen
            fileInput.style.display = 'none'; // Ocultar el campo de entrada de la imagen
            editBtn.style.display = 'inline-block'; // Mostrar el botón editar
            saveBtn.style.display = 'none'; // Ocultar el botón guardar
            
            // Actualizar la imagen si se ha seleccionado una nueva
            const [file] = fileInput.files;
            if (file) {
                const reader = new FileReader();
                reader.onload = e => img.src = e.target.result;
                reader.readAsDataURL(file);
            }
        });

        // Agregar el campo de entrada de la imagen después del botón editar
        editBtn.parentNode.insertBefore(fileInput, editBtn.nextSibling);
        // Agregar el botón guardar después del campo de entrada de la imagen
        editBtn.parentNode.insertBefore(saveBtn, fileInput.nextSibling);
    });
});
