let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const emptyCartEl = document.getElementById('emptyCart');
    const checkoutEl = document.getElementById('checkoutSection');
    const itemsCountEl = document.getElementById('itemsCount');
    const totalPriceEl = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItemsEl.style.display = 'none';
        emptyCartEl.style.display = 'block';
        checkoutEl.style.display = 'none';
        itemsCountEl.textContent = '0 منتج';
        totalPriceEl.textContent = '0$';
        return;
    }
    
    let total = 0;
    let html = '';
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        html += `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='photos/book-placeholder.jpg'">
                </div>
                <div class="item-details">
                    <div class="item-title">${item.title}</div>
                    <div class="item-author">${item.author || 'غير محدد'}</div>
                    <div class="item-price-row">
                        <span class="item-price">${item.price}$</span>
                    </div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">✕</button>
            </div>
        `;
    });
    
    cartItemsEl.innerHTML = html;
    emptyCartEl.style.display = 'none';
    checkoutEl.style.display = 'block';
    itemsCountEl.textContent = `${cart.reduce((sum, item) => sum + item.quantity, 0)} منتج`;
    totalPriceEl.textContent = `${total.toFixed(2)}$`;
    updateCheckoutTotal();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeItem(index);
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    showToast('تم التحديث');
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    showToast('تم الحذف');
}

function updateCheckoutTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)}$`;
    document.getElementById('grandTotal').textContent = `${(subtotal + 10).toFixed(2)}$`;
}

function checkout() {
    if (cart.length === 0) return showToast('السلة فارغة');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 10;
    alert(`شكراً! إجمالي الطلب: ${total.toFixed(2)}$\nسيتم التواصل معك قريباً 🎉`);
    
    localStorage.removeItem('cart');
    cart = [];
    displayCart();
}

function showToast(message) {
    const toast = document.getElementById('toast-box');
    const msg = document.getElementById('toast-msg');
    msg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

displayCart();