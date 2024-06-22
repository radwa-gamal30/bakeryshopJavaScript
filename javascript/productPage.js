var iconCart=document.querySelector('.icon-cart');
var closeCart=document.querySelector('.close');
var checkOut=document.querySelector('.checkOut');
var body=document.querySelector('body');
var ListProductHTML=document.querySelector('.listProduct');
var listCartHTML=document.querySelector('.listCart');
var iconCartSpan=document.querySelector('.icon-cart span');
var totalCost=document.querySelector('.totalCost');
var carts=[];
var listProducts=[];
// action on cartIcon
iconCart.addEventListener('click',()=>{
body.classList.toggle('showCart')//of css
})
// action on close Button
closeCart.addEventListener('click',()=>{
    body.classList.toggle('showCart')//of css
})
if(carts!=null){

    checkOut.addEventListener('click',()=>{
        window.location.href='../html/success.html';
    })
}

// use api data

// show cart on screen
const addCartTOHTML= () => {
    listCartHTML.innerHTML=``;
    var totalQuantity=0;
    var totalCostCalc=0;
    if(carts.length>0){ 
        carts.forEach(cart => {
            totalQuantity=totalQuantity+ cart.quantity;
            var newCart=document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id=cart.productId;
            
            var positionProduct= listProducts.findIndex((value) => value.id ==  cart.productId);
            var info=listProducts[positionProduct];
            var totalprice=info.price *cart.quantity;
             totalCostCalc=totalCostCalc+Number(totalprice);
            newCart.innerHTML=` 
         <div class="image">
             <img src="${info.image}" alt="">
             </div>
            <div class="name">${info.name}
            </div>
            <div class="price">
            $${info.price *cart.quantity}</div>
            <div class="quantity">
            <span class="minus"><</span>
            <span >${cart.quantity}</span>
            <span class="plus">></span></div>`
            listCartHTML.appendChild(newCart);
        })
        
    }
    iconCartSpan.innerText=totalQuantity;
    totalCost.innerHTML=`<span>Total: ${ totalCostCalc}</span>`;

    
}
// increase&&Decrease item quantity
listCartHTML.addEventListener('click',(event)=>{
    var positionClick=event.target;

    if(positionClick.classList.contains('minus')||positionClick.classList.contains('plus')){
        var productId=positionClick.parentElement.parentElement.dataset.id;
       var type='minus';
       if(positionClick.classList.contains('plus')){
           type='plus';
        }
       changeQuantity(productId,type);
    }
})
const changeQuantity= (productId,type) => {
    var positionItemInCart=carts.findIndex((value)=> value.productId == productId)
    if(positionItemInCart>=0){
        switch (type){
        case 'plus':
            carts[positionItemInCart].quantity=carts[positionItemInCart].quantity+1
            break;
            default:
                var valueChange= carts[positionItemInCart].quantity-1;
                if(valueChange>0){
                    carts[positionItemInCart].quantity=valueChange;
                }
                else{
                    carts.splice(positionItemInCart,1);
                }
                break;
            } }
   addCartToMemory();
   addCartTOHTML();

}
//get cookie data
function checkCart(){
    var cookieValue=document.cookie
    .split('; ')
    .find(row=>row.startsWith('carts='));
    if(cookieValue){
        carts=JSON.parse(cookieValue.split('=')[1]);
    }
   
}
checkCart();



// Add data from productList to the cart
const addToCart= (productId) =>{
    var postionThisProductToCart=carts.findIndex( (value) =>
        value.productId ==productId)
    if(!carts.length<0){
        carts=[{
            productId:productId,
            quantity:1
        }]
    }
    if(postionThisProductToCart<0){
        carts.push({ 
            productId:productId,
            quantity:1
        });

    }else{
       carts[postionThisProductToCart].quantity=carts[postionThisProductToCart].quantity+1;
    }

    let timeSave="expires=thu, 31 Dec 2024 23:59:59 UTC";
        document.cookie="carts=" + JSON.stringify(carts)+"; "+timeSave+"; pathe=/;";
        // console.log(carts);
        addCartTOHTML();
        addCartToMemory();
        
    }
    console.log(document.cookie);
// action on addTOCart button
ListProductHTML.addEventListener('click',(event)=>{
    var positionClick=event.target;
   
    if(positionClick.classList.contains('addCart')){
        var productId=positionClick.parentElement.dataset.id;
        addToCart(productId);
    }
})
const addDataTOHTML=()=>
{
    ListProductHTML.innerHTML = '';
    if (listProducts!=null) {
      listProducts.forEach(product => {
        var newProduct = document.createElement('div');
        newProduct.classList.add('item');
        
        newProduct.dataset.id = product.id;
        var imagehref = `<a href="/html/productDetails.html?id=${product.id}"><img src="${product.image}" alt=""></a>`;
        newProduct.innerHTML = `
          ${imagehref}
          <h2>${product.name}</h2>
          <div class="price">${product.price}$</div>
          <button class="addCart">Add to cart</button>
        
        `;
    
        ListProductHTML.appendChild(newProduct);
      });
    }

}

//store data in local storage
const addCartToMemory=() =>{
    localStorage.setItem('cart',JSON.stringify(carts));
}

// const filteredProducts = products.filter(product => product.category === category);
// api function
const initApp = () => {
    fetch('../products.json')
.then(response =>response.json())
.then(data => {
    listProducts = data;
    // console.log(listProducts);
    addDataTOHTML()
    //get data from localstorage
    if(localStorage.getItem('cart')){
        carts=JSON.parse(localStorage.getItem('cart'));
        
        addCartTOHTML();
    }
    });

}
initApp();