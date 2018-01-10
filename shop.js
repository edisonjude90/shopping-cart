var productItems = [{
                        productId:0001,
                        productName:"Basket Ball",
                        productAvailable:true,
                        productImg:"images/basketball.jpg",
                        productRating:5,
                        price:467
                    },
                    {
                        productId:0002,
                        productName:"Cricket Bat",
                        productAvailable:true,
                        productImg:"images/bat.jpg",
                        productRating:3,
                        price:551
                    },
                    {
                        productId:0003,
                        productName:"Football",
                        productAvailable:true,
                        productImg:"images/football.png",
                        productRating:2,
                        price:799
                    },
                    {
                        productId:0004,
                        productName:"Table Tennis Bat",
                        productAvailable:true,
                        productImg:"images/table_tennis.jpg",
                        productRating:4,
                        price:855
                    }];

function UserDetails(userName,userAddress,contactNo){
    this.username = userName;
    this.userAddress = userAddress;
    this.contactNo = contactNo;
}
                    
function ProductItem(product,noOfItems){
    this.productId = product.productId;
    this.productName = product.productName;
    this.productImg = product.productImg;
    this.numberOfItems = noOfItems;
}

function Shopping(userName,userAddress,contactNo){
    UserDetails.call(this,userName,userAddress,contactNo);
    this.cart = [];
}

Shopping.prototype = Object.create(UserDetails.prototype);
Shopping.prototype.constructor = Shopping;

var userShopping = new Shopping("edison","No.7, 4th Street, Porur, Chennai 600122","9393939399");

Shopping.prototype.AddToCart = function(productIndex){
    userShopping.cart.push(new ProductItem(productItems[productIndex],1));
    pageViews.listProductInCart();
}

Shopping.prototype.RemoveFromCart = function(index){
    userShopping.cart.splice(index,1);
    pageViews.listProductInCart();
}

Shopping.prototype.SearchForProducts = function(){

}

Shopping.prototype.placeOrder = function(){

}



var pageViews = {

    listProducts:function(){

        var TempArr = '';
        productItems.forEach((val,index)=>{

            TempArr += `
                <div class="item">
                        <div class="cart-img">    
                            <img src="`+ val.productImg + `" alt="item">
                        </div>
                    <h4>`+ val.productName + `</h4>
                    <span>Rating : <span>`+ val.productRating + `</span></span>
                    <p>
                        Rs.`+ val.price +`
                    </p>
                    <p>
                        <input value="Add To Cart"  type="button" onclick="AddToCartEvent(`+ index + `)"  >
                    </p>
                </div>
            `;

        });

        document.querySelector(".shop-items").innerHTML = TempArr;

    },
    listProductInCart:function(){

        var productInCart = userShopping.cart;
        var TempArr = '';

        productInCart.forEach((val,index)=>{

            TempArr += `<div class="cart-item">
                            <div class="cart-img">    
                                <img src="`+ val.productImg +`" alt="item">
                            </div>
                            <div>
                                <h4>`+ val.productName +`</h4>
                                <a href="#" onclick = "RemoveFromCartEvent(`+index+`)">remove</a>    
                            </div>
                        </div>`;

        });

        if (productInCart.length > 0){
            document.getElementById("order-checkout").className = "btn";
        }else{
            document.getElementById("order-checkout").className = "btn hide";
        }

        document.getElementById("cart-count").innerHTML = productInCart.length;
        document.querySelector(".cart-items").innerHTML = TempArr;

    },
    orderPlaceMent:function(){

    }

}


// Event Binding 

window.onload = function(){
    pageViews.listProducts();
}

document.getElementById("order-checkout").onclick = function(){
    document.getElementById("shop-order-summary").className = "";
    document.getElementById("shop-browse").className = "hide";
};

document.getElementById("btn-cancel-order").onclick = function(){
    document.getElementById("shop-order-summary").className = "hide";
    document.getElementById("shop-browse").className = "";
};

document.querySelector(".cart-count-label").onclick = function(){
    if(document.getElementsByClassName("cart-items")[0].className.indexOf("hide") > -1){
        document.getElementsByClassName("cart-items")[0].className = "cart-items show";
    }else{
        document.getElementsByClassName("cart-items")[0].className = "cart-items hide";
    }
}

function AddToCartEvent(index){
        userShopping.AddToCart.call(userShopping,index);
}

function RemoveFromCartEvent(index){
       userShopping.RemoveFromCart.call(userShopping,index);
}

