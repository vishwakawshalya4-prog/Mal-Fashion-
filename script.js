// Mal Fashion Main Script


let products =
JSON.parse(localStorage.getItem("products")) || [];


let cart = [];





// =====================
// ADMIN ADD PRODUCT
// =====================


function addProduct(){


let file =
document.getElementById("photo").files[0];


if(!file){

alert("Please select product photo");

return;

}


let reader = new FileReader();



reader.onload = function(){


let product = {


name:
document.getElementById("pname").value,


price:
Number(document.getElementById("price").value),


image:
reader.result


};



products.push(product);



localStorage.setItem(

"products",

JSON.stringify(products)

);



alert("Product Added");


showProducts();


showAdminProducts();


};



reader.readAsDataURL(file);



}





// =====================
// SHOW PRODUCTS
// =====================


function showProducts(){


let box =
document.getElementById("products");


if(!box){

return;

}


box.innerHTML="";



products.forEach((p,index)=>{


box.innerHTML += `


<div class="card">


<img src="${p.image}">


<h3>${p.name}</h3>


<p>
Rs.${p.price}
</p>


<button onclick="addCart(${index})">

Add Cart

</button>


</div>


`;


});



}






// =====================
// SEARCH
// =====================


function searchProducts(){


let text =
document.getElementById("searchBox").value.toLowerCase();



let box =
document.getElementById("products");


box.innerHTML="";



products.filter(p=>


p.name.toLowerCase().includes(text)


).forEach((p,index)=>{


box.innerHTML += `


<div class="card">


<img src="${p.image}">


<h3>${p.name}</h3>


<p>
Rs.${p.price}
</p>


<button onclick="addCart(${index})">

Add Cart

</button>


</div>


`;



});


}





// =====================
// CART
// =====================


function addCart(index){


cart.push(products[index]);


showCart();


}





function showCart(){


let box =
document.getElementById("cartItems");


if(!box){

return;

}



box.innerHTML="";


let total=0;



cart.forEach((item,index)=>{


total += item.price;



box.innerHTML += `


<p>

${item.name} - Rs.${item.price}


<button onclick="removeCart(${index})">

X

</button>


</p>


`;



});



document.getElementById("total").innerHTML =

"Total: Rs."+total;



}






function removeCart(index){


cart.splice(index,1);


showCart();


}







// =====================
// DELETE PRODUCT
// =====================


function deleteProduct(index){


products.splice(index,1);



localStorage.setItem(

"products",

JSON.stringify(products)

);



showProducts();


showAdminProducts();


}








// =====================
// ADMIN PRODUCT LIST
// =====================


function showAdminProducts(){


let box =
document.getElementById("adminProducts");


if(!box){

return;

}



box.innerHTML="";



products.forEach((p,index)=>{


box.innerHTML += `


<div class="card">


<img src="${p.image}">


<h3>${p.name}</h3>


<p>

Rs.${p.price}

</p>


<button onclick="deleteProduct(${index})">

Delete

</button>


</div>


`;


});


}








// =====================
// WHATSAPP ORDER
// =====================


function sendOrder(){



let msg =

"Mal Fashion Order%0A%0";



msg +=

"Name: "+

document.getElementById("name").value

+"%0A";



msg +=

"Phone: "+

document.getElementById("phone").value

+"%0A";



msg +=

"Address: "+

document.getElementById("address").value

+"%0A%0";





cart.forEach(item=>{


msg +=

item.name+

" - Rs."+

item.price+

"%0A";


});





window.open(

"https://wa.me/94760185921?text="+msg

);


}







// START WEBSITE


showProducts();

showAdminProducts();