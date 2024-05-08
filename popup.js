document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('note-form');
    const notesContainer = document.getElementById('notes-container');

    // Load notes from local storage when the extension opens
    loadNotes();

    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const message = document.getElementById('message').value;
        const createdAt = new Date().toLocaleString(); // Current date & time

        // Save the note to local storage
        saveNote(title, message, createdAt);

        // Clear the form fields
        noteForm.reset();

        // Reload notes
        loadNotes();
    });

    // Function to save note to local storage
    function saveNote(title, message, createdAt) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ title, message, createdAt });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Function to load notes from local storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <h3>${index + 1}. ${note.title}</h3>
                <p>${note.message}</p>
                <small>${note.createdAt}</small>
                <button class="delete-btn">Delete</button>
            `;
            notesContainer.appendChild(noteElement);

            // Add delete functionality
            const deleteBtn = noteElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteNote(index); // Pass the index of the note to delete
            });
        });
    }

    // Function to delete note from local storage
    function deleteNote(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1); // Remove the note at the specified index
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes(); // Reload notes after deletion
    }
});
