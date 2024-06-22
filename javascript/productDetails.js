var products=null;
fetch("../products.json")
.then(response=>response.json())
.then(data=>
    {
        products=data;
        showDetails();
    })
    //current product card////
   function showDetails(){
    var detail=document.querySelector(".detail");
    var productid=new URLSearchParams(window.location.search).get('id');
    var thisProduct=products.filter(value=>{
        return value.id==productid
    })[0];
    if(!thisProduct){
        window.location.href="/html/productPage.html";
        return; 
    }
    detail=document.querySelector(".image img").src=thisProduct.image;
    detail=document.querySelector('.name').innerText=thisProduct.name;
    detail=document.querySelector('.price').innerText="$" + thisProduct.price;
    detail=document.querySelector('.description').innerText=thisProduct.description;
    detail=document.querySelector('.ingredients').innerText=thisProduct.ingredients;

// similar products/////
var listProduct=document.querySelector('.listProduct');
listProduct.innerHTML="";
(products.filter(value =>value.id!=productid))
.forEach(product=>{
    var newProduct = document.createElement('div');
        newProduct.classList.add('item');
        
     
        var imagehref = `<a href="/html/productDetails.html?id=${product.id}"><img src="${product.image}" alt=""></a>`;
        newProduct.innerHTML = `
        ${imagehref}
          <h2>${product.name}</h2>
          <div class="price">${product.price}$</div>`;
          listProduct.appendChild(newProduct);
          console.log(listProduct);
        });
    }