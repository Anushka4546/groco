let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let cart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slides-container .slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    updateCartTotal();
    var removeCartItemsButtons = document.getElementsByClassName("fas fa-times");
    for(var i = 0; i < removeCartItemsButtons.length; i++) {
        var button = removeCartItemsButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("quantity-input");
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart');
    for(var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName("checkout")[0].addEventListener('click', checkoutClicked);
}

function quantityChanged(event) {
    var input = event.target;

    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName("content-title")[0].innerText;
    var price = shopItem.getElementsByClassName("price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("image-src")[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('box');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('item-title');
    for(var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }

    var cartRowContents = `
            <button><i class="fas fa-times"></i></button>
            <img src="${imageSrc}" alt="">
            <div class="content">
                <h3>${title}</h3>
                <span class = "quantity">Quantity: <input class = "quantity-input" type = "number" value = "1"></span>
                <span class="price">${price}</span>
            </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("fas fa-times")[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName("quantity-input")[0].addEventListener('change', quantityChanged);
}

function checkoutClicked() {
    alert("Thank you for shopping with us!!");
    var cartItems = document.getElementsByClassName("cart-items")[0];

    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("price")[0];
        var quantityElement = cartRow.getElementsByClassName("quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ''));
        var quantity = quantityElement.value;
        total = total + price*quantity;
    }
    
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("amount")[0].innerText = "$" + total;
}
