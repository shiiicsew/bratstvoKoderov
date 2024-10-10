// Асинхронная функция для получения данных и отображения их в виде таблицы
async function fetchAndDisplayPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    // Тело таблицы
    const tableBody = document.getElementById('tableBody');

    posts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${post.id}</td><td>${post.title}</td><td>${post.body}</td>`;
        tableBody.appendChild(row);
    });

    // Глобальная переменная для фильтрации
    window.posts = posts;
}

// Функция для фильтрации таблицы на основе ввода
function filterTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();

    const tableBody = document.getElementById('tableBody');

    tableBody.innerHTML = '';

    let matchFound = false;

    // Фильтруем посты на основе поискового запроса
    window.posts.forEach(post => {
        if (post.title.toLowerCase().includes(filter) || post.body.toLowerCase().includes(filter)) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${post.id}</td><td>${post.title}</td><td>${post.body}</td>`;
            tableBody.appendChild(row);
            matchFound = true;
        }
    });

    // Показываем или скрываем сообщение "нет совпадений"
    document.getElementById('noMatch').style.display = matchFound ? 'none' : 'block';
}

// Функция для сортировки таблицы по заголовкам
let sortOrder = true; // true - по возрастанию, false - по убыванию

function sortTable(columnIndex) {
    const tableBody = document.getElementById('tableBody');

    const sortedPosts = [...window.posts];

    sortedPosts.sort((a, b) => {
        if (columnIndex === 0) { // ID
            return sortOrder ? a.id - b.id : b.id - a.id;
        } else if (columnIndex === 1) { // Title
            return sortOrder ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else if (columnIndex === 2) { // Body
            return sortOrder ? a.body.localeCompare(b.body) : b.body.localeCompare(a.body);
        }
        return 0;
    });

    // Очищаем текущее содержимое таблицы и заполняем отсортированными данными
    tableBody.innerHTML = '';

    sortedPosts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${post.id}</td><td>${post.title}</td><td>${post.body}</td>`;
        tableBody.appendChild(row);
    });

    sortOrder = !sortOrder; // Меняем порядок сортировки для следующего клика
}

// Обработчик событий для поля ввода поиска
document.getElementById('searchInput').addEventListener('input', () => {
    if (document.getElementById('searchInput').value.length >= 3) {
        filterTable();
    } else {
        fetchAndDisplayPosts();
        document.getElementById('noMatch').style.display = 'none';
    }
});

document.querySelectorAll('th').forEach((header, index) => {
    header.addEventListener('click', () => sortTable(index));
});

document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);