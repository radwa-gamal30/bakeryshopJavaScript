var scrollUpBtn=document.querySelector('.scrollTop');
scrollUpBtn.addEventListener('click',()=>{
  document.body.scrollTop=0;
  document.documentElement.scrollTop=0;
})



var body=document.querySelector('body');
var ListProductHTML=document.querySelector('.homeListProduct');

var listProducts=[];


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
         
        
        `;
    
        ListProductHTML.appendChild(newProduct);
      });
    }

}

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