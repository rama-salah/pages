// مصفوفة لتخزين السلع المضافة إلى السلة
let cart = [];

// الدالة لإضافة عنصر إلى السلة
function addToCart(itemName, itemPrice) {
    // إنشاء كائن يمثل العنصر المضاف
    const item = { name: itemName, price: itemPrice };

    // إضافة العنصر إلى السلة
    cart.push(item);

    // تحديث السلة على الصفحة
    updateCartDisplay();
}

// دالة لعرض السلة على الصفحة
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // مسح المحتوى الحالي للسلة

    // إضافة العناصر المضافة للسلة
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart('${item.name}')">إزالة</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// دالة لإزالة عنصر من السلة
function removeFromCart(itemName) {
    // إزالة العنصر من السلة
    cart = cart.filter(item => item.name !== itemName);

    // تحديث السلة على الصفحة بعد إزالة العنصر
    updateCartDisplay();
}

// الدالة لتوضيح عملية إضافة الأدوية إلى السلة
document.querySelectorAll(".add-to-cart").forEach(button => {  // Use .add-to-cart instead of .add-to-cart-button
    button.addEventListener("click", function () {
        console.log('تم الضغط على الزر!'); // تحقق من النقر على الزر
        const itemName = this.getAttribute("data-name");
        const itemPrice = parseFloat(this.getAttribute("data-price"));

        console.log('اسم المنتج:', itemName, 'السعر:', itemPrice); // طباعة البيانات
        addToCart(itemName, itemPrice);
    });
});
