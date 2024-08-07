const addToCarts = (quantity=1, product_id,type="plus")=>{
    fetch(`/carts/add/${product_id}/${quantity}/${type}`)
    .then(res=>res.json())
    .then(data=>{
        if(data.code===200){
            const quantity = document.querySelector(".quantity-product-cart");
            quantity.innerHTML = `${data.quantity}`;
        }
    })
}
const processAddtoCart = (btnCart,quantity)=>{
    btnCart.addEventListener("click",()=>{
        addToCarts(quantity,product_id);
    })
}
const btnCart = document.querySelector(".cart-btn");

if(btnCart){
    const quantity = document.querySelector(".quantity > .pro-qty > input");
    btnCart.addEventListener("click",()=>{
        const product_id = btnCart.getAttribute("data-productId");
        addToCarts(quantity.value,product_id);
        quantity.value=1;

    })
}
const iconCarts = document.querySelectorAll(".product__item .icon_bag_alt");
if(iconCarts.length>0){
    iconCarts.forEach(iconCart=>{
        iconCart.addEventListener("click",(e)=>{
            const product_id = iconCart.getAttribute("data-productid");
            addToCarts(1,product_id);
        })
    })
}




//change quantity cart
const cart__quantitys = document.querySelectorAll(".cart__quantity");
if(cart__quantitys.length>0){
    cart__quantitys.forEach(cart__quantity=>{ 
             
        const inputCartQuantity = cart__quantity.querySelector("input");

        inputCartQuantity.addEventListener('change',()=>{
            const elementParent = cart__quantity.closest("tr");
            const productId = elementParent.getAttribute("data-product-id");
            addToCarts(inputCartQuantity.value,productId,"set");
            const price =parseFloat(elementParent.querySelector(".cart__price").innerHTML.split(" ")[1]).toFixed(2);
            const elementTotalPrice = elementParent.querySelector(".cart__total");
            elementTotalPrice.innerHTML = `$ ${price*inputCartQuantity.value}`;
            totalPrice();
        })
        

    })
}

//end change quantity cart


//total price
const totalPrice = ()=>{
    const cart__total__procced =document.querySelector(".cart__total__procced");
    if(cart__total__procced){
        const cart__totals = document.querySelectorAll(".cart__total");
        let totalPrice = 0;
        cart__totals.forEach(element=>{
            const price = parseFloat( element.innerHTML.split(" ")[1]);
            totalPrice+=price;
        })
        const span = cart__total__procced.querySelectorAll("li > span");
        span[0].innerHTML = span[1].innerHTML = `$ ${totalPrice}`;
    }
}
totalPrice();

//


//deleted product in cart
const cart__closes = document.querySelectorAll(".cart__close");
if(cart__closes.length>0){
    cart__closes.forEach(cart__close=>{
        cart__close.addEventListener("click",()=>{
            if(window.confirm("Are you sure ?")){
                const elementParent = cart__close.closest("tr");
                const productId = elementParent.getAttribute("data-product-id");
                fetch(`/carts/deleted/${productId}`)
                .then(res=>res.json())
                .then(data=>{
                    if(data.code===200){
                        const quantity = document.querySelector(".quantity-product-cart");
                        quantity.innerHTML = `${data.quantity}`;
                        elementParent.remove();
                        totalPrice();

                    }
                })
            }   
           
            
        })
    })
}

//end




//filter price 
const filterPrice = document.querySelector("[filter__price]");
if(filterPrice){
    filterPrice.addEventListener("click",()=>{
        const startInput = document.querySelector("#minamount");
        const endInput = document.querySelector("#maxamount");
        const start = startInput.value.split("$").join("");
        const end = endInput.value.split("$").join("");
        const url = new URL(window.location.href);
        url.searchParams.set("priceStart",start);
        url.searchParams.set("priceEnd",end);
        window.location.href = url;

    })
}



//end filter price


//address
const orderAddress = document.querySelector(".adress-order");
if(orderAddress){
    const arr = orderAddress.innerHTML.split(",");
    fetch(`https://esgoo.net/api-tinhthanh/5/${arr[0]}.htm`)
    .then(res=>res.json())
    .then(res=>{
        orderAddress.innerHTML = res.data.name
    })
}

//address


//cancel order 
const btnCancelOrders = document.querySelectorAll("[button-cancel-order]");
if(btnCancelOrders.length>0){
    btnCancelOrders.forEach(btnCancelOrder=>{
        btnCancelOrder.addEventListener("click",()=>{
            if(window.confirm("Are you sure ??")){
                const id = btnCancelOrder.getAttribute("button-cancel-order");
                window.location.href = `/orders/delete/${id}`;
            }
        })
    })
}


//cancel order
// findSuggest
const findHeader = document.querySelector(".find-header > input");
if(findHeader){
    findHeader.addEventListener("focus",()=>{
        const parentSuggest = document.querySelector(".suggest-find-header");
        parentSuggest.style.display="block";
    })
    findHeader.addEventListener("blur",()=>{
        const parentSuggest = document.querySelector(".suggest-find-header");
        setTimeout(()=>{
            parentSuggest.style.display="none";
        },500)
     
    })
    findHeader.addEventListener("keyup",()=>{
       fetch(`/search/suggestFindProducts?keyword=${findHeader.value}`)
       .then(res=>res.json())
       .then(data=>{
        if(data.code===200){
            const parentSuggest = document.querySelector(".suggest-find-header");
            parentSuggest.textContent = "";
            data.data.forEach(product=>{
                const elementA = document.createElement('a');
                elementA.classList.add("result-find-header")
                elementA.classList.add("my-1")
                elementA.classList.add("mx-3")
                elementA.classList.add("row")
                elementA.href = `/products/${product.slug}`;
                elementA.innerHTML = `
                <div class="inner-find-img col-3"> 
                    <img src="${product.thumbnail}" width="100%" height="100%" alt="" />
                </div>
                <div class="inner-find-text col-9">
                    <div class="inner-find-title">
                        <h5>${product.title}</h5>
                    </div>
                    <div class="inner-find-singer">${product.categoryTitle}</div>
                </div>
                `;
                parentSuggest.appendChild(elementA);
            }) 
        }
       })
       
    })
}


// findSuggest


function toggleChatWindow() {
    var chatWindow = document.getElementById("chatWindow");
    if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
        chatWindow.style.display = "flex";
    } else {
        chatWindow.style.display = "none";
    }
}


