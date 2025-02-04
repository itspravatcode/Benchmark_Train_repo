document.addEventListener('DOMContentLoaded', () => {
    const subjectsList = document.getElementById('subjects-list');

    subjectsList.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('subject-item')) {
            e.target.classList.add('dragging');
        }
    });

    subjectsList.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('subject-item')) {
            e.target.classList.remove('dragging');
        }
    });

    subjectsList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        const siblings = [...subjectsList.querySelectorAll('.subject-item:not(.dragging)')];
        const nextSibling = siblings.find(sibling => e.clientY < sibling.getBoundingClientRect().top + sibling.offsetHeight / 2);
        subjectsList.insertBefore(draggingItem, nextSibling);
    });
});