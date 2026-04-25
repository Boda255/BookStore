var currentOpenCard = null;
function toggleDetail(uid) {
 
  var card  = document.getElementById('card_' + uid);
  var panel = document.getElementById('dp_'   + uid);
 
  if (currentOpenCard !== null && currentOpenCard !== uid) {
    var oldCard  = document.getElementById('card_' + currentOpenCard);
    var oldPanel = document.getElementById('dp_'   + currentOpenCard);
    oldCard.classList.remove('open');
    oldPanel.classList.remove('show');
  }
 
  var isAlreadyOpen = panel.classList.contains('show');
 
  if (isAlreadyOpen) {
    panel.classList.remove('show');
    card.classList.remove('open');
    currentOpenCard = null;
  } else {
    panel.classList.add('show');
    card.classList.add('open');
    currentOpenCard = uid;
 
    setTimeout(function () {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }
}
 
 
function closeDetail(uid, event) {
  event.stopPropagation();
 
  var card  = document.getElementById('card_' + uid);
  var panel = document.getElementById('dp_'   + uid);
 
  card.classList.remove('open');
  panel.classList.remove('show');
  currentOpenCard = null;
}
 
 

function toggleHeart(btn, event) {
  event.stopPropagation();  
  btn.classList.toggle('active');
  var card = btn.closest('.bcard');
  var id = card.id;

  // نحفظ الحالة
  var isActive = btn.classList.contains('active');
  localStorage.setItem(id + "_heart", isActive);
}
 
 
var toastTimer = null;
 
function addToCart(bookName, event) {
  event.stopPropagation();  
 
  var box = document.getElementById('toast-box');
  var msg = document.getElementById('toast-msg');
 
  msg.textContent = '\u2713 تم إضافة "' + bookName + '" للسلة';
 
  box.classList.remove('show');
  clearTimeout(toastTimer);
 
  setTimeout(function () {
    box.classList.add('show');
    toastTimer = setTimeout(function () {
      box.classList.remove('show');
    }, 2800);
  }, 30);
}

window.onload = function () {

  var cards = document.querySelectorAll('.bcard');

  cards.forEach(function(card) {
    var id = card.id;
    var saved = localStorage.getItem(id + "_heart");

    if (saved === "true") {
      var btn = card.querySelector('.btn-heart');
      if (btn) {
        btn.classList.add('active');
      }
    }
  });

};
// سلة المشتريات
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// بيانات الكتب الكاملة
const bookData = {
    // تنمية بشرية
    'الاب الغني والاب الفقير': { price: 30, image: 'photos/hu1.webp', author: 'Robert Kiyosaki' },
    'فن اللامبالاة': { price: 8, image: 'photos/hu2.jpeg', author: 'Mark Manson' },
    'العادات الذرية': { price: 10, image: 'photos/hu3.jpeg', author: 'James Clear' },
    'human development': { price: 20, image: 'photos/hu4.jpeg', author: 'Diane E. Papalia' },
    'life-span': { price: 25, image: 'photos/hu11.jpg', author: 'Carlo K. Sigelman' },
    'the evolving self': { price: 55, image: 'photos/hu12.jpg', author: 'Robert Kegan' },
    
    // أكشن
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
    
    // قصص
    'roald dahl': { price: 26, image: 'photos/st1.jpg', author: 'Roald Dahl' },
    'just so stories': { price: 59, image: 'photos/st2.jpg', author: 'Rudyard Kipling' },
    'story of the amulet': { price: 55, image: 'photos/st3.jpg', author: 'Edith Nesbit' },
    'white nights': { price: 99, image: 'photos/st4.jpg', author: 'Fyodor Dostoevsky' },
    'the razors edge': { price: 49, image: 'photos/st5.jpg', author: 'W. Somerset Maugham' },
    'watership down': { price: 64, image: 'photos/st6.jpg', author: 'Richard Adams' }
};

// إضافة للسلة
function addToCart(bookTitle, event) {
    event.stopPropagation();
    
    const data = bookData[bookTitle];
    if (!data) {
        console.error('كتاب غير موجود:', bookTitle);
        showToast('❌ خطأ في إضافة الكتاب');
        return;
    }
    
    let existingItem = cart.find(item => item.title === bookTitle);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: bookTitle,
            price: data.price,
            quantity: 1,
            image: data.image,
            author: data.author
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast('✅ تم إضافة "' + bookTitle + '"');
    console.log('السلة:', cart); // للتأكد
}

// باقي الدوال...
function showToast(message) {
    const toastBox = document.getElementById('toast-box');
    if (!toastBox) return;
    
    document.getElementById('toast-msg').textContent = message;
    toastBox.classList.add('show');
    setTimeout(() => toastBox.classList.remove('show'), 3000);
}
// books.js
document.addEventListener('DOMContentLoaded', function() {
    // تحديث حالة كل الأزرار
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const bookKey = btn.dataset.book;
        btn.textContent = favoritesManager.isFavorite(bookKey) ? '❤️' : '🤍';
    });

    // كليك على زر المفضلة
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('favorite-btn')) {
            const bookKey = e.target.dataset.book;
            const isNowFavorite = favoritesManager.toggle(bookKey);
            e.target.textContent = isNowFavorite ? '❤️' : '🤍';
            
            // تحديث العدد في الهيدر
            updateFavoritesCount();
        }
    });

    function updateFavoritesCount() {
        const countEl = document.getElementById('fav-count');
        if (countEl) {
            countEl.textContent = favoritesManager.getCount();
        }
    }
});
