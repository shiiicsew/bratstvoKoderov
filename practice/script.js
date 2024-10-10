document.getElementById('openModal').addEventListener('click', function () {
    document.getElementById('modal').classList.remove('modal--hidden');
});

document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('modal').classList.add('modal--hidden');
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', function (event) {
    const modal = document.getElementById('modal');

    if (event.target === modal) {
        modal.classList.add('modal--hidden');
    }
});

document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    const organization = document.getElementById('organization').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!organization || !phone || !email) {
        event.preventDefault();
        alert("Пожалуйста, заполните все обязательные поля.");
    }
});

// LOGO
document.getElementById('logo').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const logoPreview = document.getElementById('logoPreview');
        logoPreview.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// RESET
document.getElementById('resetLogo').addEventListener('click', function (event) {
    event.stopPropagation();
    const logoPreview = document.getElementById('logoPreview');
    logoPreview.src = 'img/krutoiYa.jpeg';
    document.getElementById('logo').value = '';
});
