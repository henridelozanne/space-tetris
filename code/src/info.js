function showInfo() {
    const modal = document.getElementById('info-modal');
    modal.classList.remove("not-visible");
    modal.classList.add('visible');
}

function closeInfo() {
    const modal = document.getElementById('info-modal');
    modal.classList.remove("visible");
    modal.classList.add('not-visible');
}