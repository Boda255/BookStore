const booksData = {
    // تنمية بشرية
    'الاب الغني والاب الفقير': { price: 30, image: 'photos/hu1.webp', author: 'Robert Kiyosaki' },
    'فن اللامبالاة': { price: 8, image: 'photos/hu2.jpeg', author: 'Mark Manson' },
    'العادات الذرية': { price: 10, image: 'photos/hu3.jpeg', author: 'James Clear' },
    'human development': { price: 20, image: 'photos/hu4.jpeg', author: 'Diane E. Papalia' },
    'life-span': { price: 25, image: 'photos/hu11.jpg', author: 'Carlo K. Sigelman' },
    'the evolving self': { price: 55, image: 'photos/hu12.jpg', author: 'Robert Kegan' },
    
    // أكشن ومغامرات
    'Democracy in america': { price: 0, image: 'photos/0011579201-L.jpg', author: 'Alexis de Tocqueville' },
    'science of getting rich': { price: 7, image: 'photos/15096886-L.jpg', author: 'Wallace D. Wattles' },
    'oedipus tyrannus': { price: 18, image: 'photos/ac3.jpg', author: 'Sophocles' },
    'years a slave': { price: 19, image: 'photos/ac4.jpg', author: 'Solomon Northup' },
    'much about nothing': { price: 28, image: 'photos/ac5.jpg', author: 'William Shakespeare' },
    'think and grow rich': { price: 12, image: 'photos/ac6.jpg', author: 'Napoleon Hill' },
    
    // تعليمية
    'mis-education of the negro': { price: 30, image: 'photos/ed1.jpg', author: 'Carter G. Woodson' },
    'the republic': { price: 22, image: 'photos/ed12.jpg', author: 'Plato' },
    'democracy and education': { price: 32, image: 'photos/ed13.jpg', author: 'John Dewey' },
    'educational psychology': { price: 28, image: 'photos/ed4.jpg', author: 'Anita Woolfolk' },
    'up from slavery': { price: 11, image: 'photos/ed5.jpg', author: 'Booker T. Washington' },
    'essays': { price: 13, image: 'photos/ed11.jpg', author: 'Francis Bacon' },
    
    // رومانسية
    'w.b.yeats': { price: 32, image: 'photos/ro1.jpg', author: 'W.B. Yeats' },
    'wordsworth': { price: 36, image: 'photos/ro2.jpg', author: 'William Wordsworth' },
    'sense and sensibility': { price: 75, image: 'photos/ro3.jpg', author: 'Jane Austen' },
    'the castle of otranto': { price: 40, image: 'photos/ro4.jpg', author: 'Horace Walpole' },
    'i capture the castle': { price: 63, image: 'photos/ro5.jpg', author: 'Dodie Smith' },
    'the glass menagerie': { price: 88, image: 'photos/ro6.jpg', author: 'Tennessee Williams' },
    
    // قصص وروايات
    'roald dahl': { price: 26, image: 'photos/st1.jpg', author: 'Roald Dahl' },
    'just so stories': { price: 59, image: 'photos/st2.jpg', author: 'Rudyard Kipling' },
    'story of the amulet': { price: 55, image: 'photos/st3.jpg', author: 'Edith Nesbit' },
    'white nights': { price: 99, image: 'photos/st4.jpg', author: 'Fyodor Dostoevsky' },
    'the razors edge': { price: 49, image: 'photos/st5.jpg', author: 'W. Somerset Maugham' },
    'watership down': { price: 64, image: 'photos/st6.jpg', author: 'Richard Adams' }
};

class FavoritesManager {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    }
    
    toggle(bookKey) {
        const index = this.favorites.indexOf(bookKey);
        if (index === -1) {
            this.favorites.push(bookKey);
        } else {
            this.favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        return this.isFavorite(bookKey);
    }
    
    isFavorite(bookKey) {
        return this.favorites.includes(bookKey);
    }
    
    getCount() {
        return this.favorites.length;
    }
}

const favoritesManager = new FavoritesManager();

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-box button');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchInput.parentNode.appendChild(searchResults);
    
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => performSearch(searchInput.value), 300);
    });
    
    searchBtn.addEventListener('click', () => performSearch(searchInput.value));
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box') && !e.target.closest('.search-results')) {
            searchResults.classList.remove('show');
        }
    });
});

function performSearch(query) {
    const searchResults = document.querySelector('.search-results');
    query = query.trim().toLowerCase();
    
    if (query.length < 2) {
        searchResults.classList.remove('show');
        return;
    }
    
    let results = [];
    for (let title in booksData) {
        if (title.toLowerCase().includes(query)) {
            results.push({ title, ...booksData[title] });
        }
    }
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>لا توجد نتائج</h3>
                <p>جرب كلمات مختلفة أو تحقق من الإملاء</p>
                <a href="books.html" class="btn-no-results">تصفح جميع الكتب</a>
            </div>
        `;
    } else {
        let html = '<div class="results-header">النتائج المطابقة</div>';
        results.slice(0, 6).forEach(book => {
            const isFavorite = favoritesManager.isFavorite(book.title);
            html += `
                <div class="result-item" data-book="${book.title}">
                    <div class="result-image">
                        <img src="${book.image}" alt="${book.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA2MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiNGRkZGRkYiLz4KPHRleHQgeD0iMzAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJvb2sgPC90ZXh0Pgo8L3N2Zz4K'">
                    </div>
                    <div class="result-info">
                        <div class="result-title">${book.title}</div>
                        <div class="result-author">${book.author}</div>
                    </div>
                    <div class="result-actions">
                        <button class="btn-cart" onclick="addToCartFromSearch('${book.title}', event)" title="إضافة للسلة">
                            🛒
                        </button>
                        <button class="btn-heart ${isFavorite ? 'active' : ''}" onclick="toggleFavoriteFromSearch('${book.title}', this, event)" title="المفضلة">
                            ${isFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <div class="result-price">${book.price === 0 ? 'مجاني' : book.price + '$'}</div>
                </div>
            `;
        });
        searchResults.innerHTML = html;
    }
    
    searchResults.classList.add('show');
}

function addToCartFromSearch(bookTitle, event) {
    event.stopPropagation();
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const bookData = booksData[bookTitle];
    
    let existingItem = cart.find(item => item.title === bookTitle);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: bookTitle,
            price: bookData.price,
            quantity: 1,
            image: bookData.image,
            author: bookData.author
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast('🛒 تم إضافة "' + bookTitle + '" للسلة');
    
    document.querySelector('.search-results').classList.remove('show');
}

function toggleFavoriteFromSearch(bookTitle, button, event) {
    event.stopPropagation();
    
    const isNowFavorite = favoritesManager.toggle(bookTitle);
    
    if (isNowFavorite) {
        button.textContent = '❤️';
        button.classList.add('active');
        button.title = 'إزالة من المفضلة';
        showToast('❤️ تمت الإضافة للمفضلة');
    } else {
        button.textContent = '🤍';
        button.classList.remove('active');
        button.title = 'إضافة للمفضلة';
        showToast('🤍 تمت الإزالة من المفضلة');
    }
}

function goToBook(bookTitle) {
    window.location.href = `books.html#${encodeURIComponent(bookTitle)}`;
    document.querySelector('.search-results').classList.remove('show');
}

function showToast(message) {
    let toast = document.querySelector('.search-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'search-toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// سلاسة التمرير
document.documentElement.style.scrollBehavior = 'smooth';
function performSearch(query) {
    const searchResults = document.querySelector('.search-results');
    query = query.trim().toLowerCase();
    
    if (query.length < 2) {
        searchResults.classList.remove('show');
        hideConfirmation();
        return;
    }
    
    let results = [];
    for (let title in booksData) {
        if (title.toLowerCase().includes(query)) {
            results.push({ title, ...booksData[title] });
        }
    }
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>لا توجد نتائج</h3>
                <p>جرب كلمات مختلفة أو تحقق من الإملاء</p>
                <a href="books.html" class="btn-no-results">تصفح جميع الكتب</a>
            </div>
        `;
    } else {
        let html = '<div class="results-header">النتائج المطابقة</div>';
        results.slice(0, 6).forEach(book => {
            const isFavorite = favoritesManager.isFavorite(book.title);
            html += `
                <div class="result-item" data-book="${book.title}">
                    <div class="result-image">
                        <img src="${book.image}" alt="${book.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA2MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiNGRkZGRkYiLz4KPHRleHQgeD0iMzAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJvb2sgPC90ZXh0Pgo8L3N2Zz4K'">
                    </div>
                    <div class="result-info">
                        <div class="result-title">${book.title}</div>
                        <div class="result-author">${book.author}</div>
                    </div>
                    <div class="result-actions">
                        <button class="btn-cart" onclick="addToCartFromSearch('${book.title}', event)" title="إضافة للسلة">
                            🛒
                        </button>
                        <button class="btn-heart ${isFavorite ? 'active' : ''}" onclick="toggleFavoriteFromSearch('${book.title}', this, event)" title="المفضلة">
                            ${isFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <div class="result-price">${book.price === 0 ? 'مجاني' : book.price + '$'}</div>
                </div>
            `;
        });
        searchResults.innerHTML = html;
    }
    
    searchResults.classList.add('show');
    hideConfirmation(); 
}

function addToCartFromSearch(bookTitle, event) {
    event.stopPropagation();
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const bookData = booksData[bookTitle];
    
    let existingItem = cart.find(item => item.title === bookTitle);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: bookTitle,
            price: bookData.price,
            quantity: 1,
            image: bookData.image,
            author: bookData.author
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showConfirmation('✅ تم إضافة "' + bookTitle + '" للسلة', 'success');
}

function toggleFavoriteFromSearch(bookTitle, button, event) {
    event.stopPropagation();
    
    const isNowFavorite = favoritesManager.toggle(bookTitle);
    
    if (isNowFavorite) {
        button.textContent = '❤️';
        button.classList.add('active');
        button.title = 'إزالة من المفضلة';
        showConfirmation('❤️ تمت الإضافة للمفضلة', 'favorite');
    } else {
        button.textContent = '🤍';
        button.classList.remove('active');
        button.title = 'إضافة للمفضلة';
        showConfirmation('🤍 تمت الإزالة من المفضلة', 'favorite');
    }
}

function showConfirmation(message, type = 'success') {
    let confirmation = document.querySelector('.search-confirmation');
    if (!confirmation) {
        confirmation = document.createElement('div');
        confirmation.className = 'search-confirmation';
        document.querySelector('.search-results').appendChild(confirmation);
    }
    
    confirmation.textContent = message;
    confirmation.className = `search-confirmation ${type}`;
    confirmation.style.opacity = '0';
    
    requestAnimationFrame(() => {
        confirmation.style.opacity = '1';
        confirmation.style.transform = 'translateY(0)';
    });
    
    setTimeout(() => {
        hideConfirmation();
    }, 3000);
}

function hideConfirmation() {
    const confirmation = document.querySelector('.search-confirmation');
    if (confirmation) {
        confirmation.style.opacity = '0';
        confirmation.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            if (confirmation) confirmation.remove();
        }, 300);
    }
}
function showConfirmation(message, type = 'success') {
    let confirmationContainer = document.querySelector('.search-confirmation-container');
    if (!confirmationContainer) {
        confirmationContainer = document.createElement('div');
        confirmationContainer.className = 'search-confirmation-container';
        document.body.appendChild(confirmationContainer);
    }
    
    let confirmation = confirmationContainer.querySelector('.search-confirmation');
    if (confirmation) {
        confirmation.remove();
    }
    
    confirmation = document.createElement('div');
    confirmation.className = `search-confirmation ${type}`;
    confirmation.textContent = message;
    confirmationContainer.appendChild(confirmation);
    
    requestAnimationFrame(() => {
        confirmation.style.opacity = '1';
        confirmation.style.transform = 'translateY(0) scale(1)';
    });
    
    setTimeout(() => {
        hideConfirmation();
    }, 3000);
}

function hideConfirmation() {
    const confirmationContainer = document.querySelector('.search-confirmation-container');
    if (confirmationContainer) {
        const confirmation = confirmationContainer.querySelector('.search-confirmation');
        if (confirmation) {
            confirmation.style.opacity = '0';
            confirmation.style.transform = 'translateY(-10px) scale(0.95)';
            setTimeout(() => {
                if (confirmationContainer && !confirmationContainer.querySelector('.search-confirmation')) {
                    confirmationContainer.remove();
                }
            }, 300);
        }
    }
}

