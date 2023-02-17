function showProductUser() {
    //Phải gửi dữ liệu về lên dùng Accept
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/products",
        //Gửi dữ liệu từ WebService về nên không cần ép kiểu (data: JSON.stringify(----),)
        //Xử lý sau khi ajax nhận hết các thông tin ở trên
        success: function (products) {

            let str = ``
            for (const product of products) {
                str += `  
                     <article class="grid_4 alpha">
                        <div class="indent-left">
                            <figure class="frame2 p2">
                                 <div id="carouselExampleSlidesOnly" class=" slide" data-bs-ride="carousel">
                                 <div class="carousel-inner">
                                 <div class="carousel-item active">
                                     <img  id="${product.id}${0}" src="" class="d-block w-100" alt="...">             
                             </div>`
                for (let i = 1; i < 6; i++) {
                    str += `<div class="carousel-item">
                                        <img class="d-block w-100" id="${product.id}${i}"  src="" alt="">
                                  </div>`
                }
                showImage(product.id)
                str += `
                                     </div>
                                    </div>
                            </figure>
                             <p class="color-4 prev-indent-bot">${product.name}</>
                             <p>${product.description}</p>
                             <div class="wrapper">
                                <span class="price fleft"> Giá :${product.price}</span>
                                <a id="${product.id}" class="button fright" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="showSlideModel(${product.id})">Read more</a>
                                </div>
                        </div>
                    </article> `
            }
            str += `</ul>`
            str += `</div>`
            document.getElementById("showProductUser1").innerHTML = str;
            for (const product of products) {
                showImage(product.id)
            }
        },
        error: function (err) {
            console.log(err)
        }

    })

}
console.log(localStorage.getItem("id"))
function showSlideModel(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/products/" + id,
        //xử lý khi thành công
        success: function (products) {
            let str = ``

            str += `  
                     <article class="grid_4 alpha">
                       
                                 <div id="" class=" slide" data-bs-ride="carousel">
                                 <div class="carousel-inner">
                                 <div class="carousel-item active">
                                     <img height="200px" id="${id}${0}${id}" src="" class="" alt="...">             
                                 </div>`
            for (let i = 1; i < 6; i++) {
                str += `<div class="carousel-item">
                                        <img height="200px" class="" id="${id}${i}${id}"  src="" alt="">
                            </div>`
            }
            showImage2(id)
            str += `
                                     </div>
                                    </div>
                            </figure>
                             <p class="color-4 prev-indent-bot">${products.name}</>
                             <p>${products.description}</p>
                             <div class="wrapper">
                                <span class="price fleft" style="padding-left: 30px;">Giá tiền: ${products.price}</span>
<!--                              id, description, name, price, status, category_id, avgPoints, amount  ?-->
                            <div style="float:right;width: 600px">`

            if (localStorage.getItem("id")!=null)
            {
                str += ` <input width="50px" style="" id="cmttxt" type="text" > 
                <a  type="button" class="btn btn-light" onclick="createCmt(${products.id})" >comment</a>                                       `
            }else str+=``

            str += `
                                <a  class="button fright" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="addToCart('${id}', '${products.description}', '${products.name}', '${products.price}', 'còn' ,'1' , '2', '1')">Buy</a>
                                <a   class="button fright"  onclick="showCmt(${id})">Comment</a></div>
                                
                               </div>
                        </div>
                     `


            str += `</ul>`
            str += `</div>`
            document.getElementById("modalBody").innerHTML = str;
            showImage(products.id)
        }
        ,
        error: function (err) {
            console.log(err)
        }
    })
    showRating(id)
}

showProductUser();

// function showProduct() {
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json'
//         },
//         url: "http://localhost:8080/products",
//         //xử lý khi thành công
//         success: function (product) {
//             let str = '';
//             for (const p of product.content) {
//                 str += `<div class="col-md-6 col-lg-3 ftco-animate">
//                 <div class="product">
//                     <a href="#" class="img-prod"><img class="img-fluid" id="${p.id}" alt="Colorlib Template">
//                         <span class="status">30%</span>
//                         <div class="overlay"></div>
//                     </a>
//                     <div class="text py-3 pb-4 px-3 text-center">
//                         <h3><a href="#">${p.name}</a></h3>
//                         <div class="d-flex">
//                             <div class="pricing">
//                                 <p class="price">
//                                 <span class="price-sale">${p.price}</span>
//
//                                 </p>
//                             </div>
//                         </div>
//                         <div class="bottom-area d-flex px-3">
//                             <div class="m-auto d-flex">
//                                 <a href="#"
//                                    class="add-to-cart d-flex justify-content-center align-items-center text-center">
//                                     <span><i class="ion-ios-menu"></i></span>
//                                 </a>
//                                 <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
//                                     <span><i class="ion-ios-cart" onclick=""></i></span>
//                                 </a>
//                                 <a href="#" class="heart d-flex justify-content-center align-items-center ">
//                                     <span><i class="ion-ios-heart"></i></span>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>`
//             }
//             showImage();
//             document.getElementById("showProduct").innerHTML = str;
//
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }


function showImage(id) {
    let imgfake = id;
    $.ajax({

        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/products/find_images/" + id,
        //xử lý khi thành công
        success: function (images) {
            console.log(images)

            for (let i = 0; i < 6; i++) {
                let str = ``
                str += `${id}`
                str += `${i}`
                document.getElementById(str).setAttribute("src", images[i].img)
            }

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showImage2(id) {
    $.ajax({

        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/products/find_images/" + id,
        //xử lý khi thành công
        success: function (images) {
            console.log(images)

            for (let i = 0; i < 6; i++) {
                let str = ``
                str += `${id}`
                str += `${i}`
                str += `${id}`

                document.getElementById(str).setAttribute("src", images[i].img)
                console.log(str)
            }

        },
        error: function (err) {
            console.log(err)
        }
    })
    document.getElementById("showCmt").innerHTML = "";

}

function showCmt(id) {
    $.ajax({

        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/Cmt/find_cmt/" + id,
        //xử lý khi thành công
        success: function (cmts) {
            console.log(cmts)
            let str = `<table width="750px" style="float: left">`
            for (const cmt of cmts) {

                str += `<tr>
                          <td width="50px"><img height="30px" src="${cmt.account.avatar}"></td></td><td width="100px">${cmt.account.username}:</td><td><p style="float: left">${cmt.content}</p></td>
                      </tr>
                `
            }
            document.getElementById("showCmt").innerHTML = str;
            str += `</table>`


        },
        error: function (err) {
            console.log(err)
        }
    })
}

function clearCmt() {
    $.ajax({

        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/Cmt/find_cmt/" + id,
        //xử lý khi thành công
        success: function (cmts) {
            console.log(cmts)
            let str = `<table width="750px" style="float: left">`
            for (const cmt of cmts) {

                str += `<tr>
                      </tr>
                `
            }
            document.getElementById("showCmt").innerHTML = "";
            str += `</table>`


        },
        error: function (err) {
            console.log(err)
        }
    })
}

if (localStorage.getItem("carts") === null ) {
    var cartList = []
} else {
    var cartList = JSON.parse(localStorage.getItem("carts"));
}
console.log(cartList)
class cart {
    constructor(id, description, name, price, status, category_id, avgPoints, amount) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.price = price;
        this.status = status;
        this.category_id = category_id;
        this.avgPoints = avgPoints;
        this.amount = amount;
    }
}

function addToCart(id, description, name, price, status, category_id, avgPoints, amount) {


    console.log("cartList")
    console.log(cartList)
    const c1 = new cart(id, "", name, price, status, category_id, avgPoints, amount);
    // const c2 = new cart(2, "Không có mô tả", "", 25000, "còn", 1, 3, 1);

    cartList.push(c1);
    // cartList.push(c2);
    // localStorage.setItem("token", data.token);
    // localStorage.setItem("user", JSON.stringify(data));
    console.log(cartList)
    localStorage.setItem("carts", JSON.stringify(cartList));
}

function showCart() {
    let str = ``;
    str += `
     <table class="table table-bordered">
            <thead>
            <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>giá tiền</th>
            </tr>
            </thead>
            <tbody>
            `
    let cartList = JSON.parse(localStorage.getItem("carts") || "[]");
    console.log(cartList[1]);
    for (const c of cartList) {
        str += `
            <tr>
                <td>${c.name}</td>
                <td>${c.amount}</td>
                <td>${c.price}</td>
            </tr>`
    }
    str += `
            </tbody>
        </table>
    `
}
function createCmt(id){
        let cmt = {
            "id": "",
            "content": document.getElementById("cmttxt").value,
            "account": {
                "id": localStorage.getItem("id"),
            },
            "product": {
                "id": id,
            }
        }
console.log(cmt)
        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem("token")

            },
            url: "http://localhost:8080/Cmt",
            data: JSON.stringify(cmt),
            //xử lý khi thành công
            success: function () {
                alert("cmt Thành công");
            },
            error: function (err) {
                console.log(err)
            }
        })


}
function getRatingProduct(id){
    $.ajax({

        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/ratings/getAvgPoint/" + id,
        //xử lý khi thành công
        success: function (data) {
            console.log(data)
            document.getElementById("point").innerHTML = data;

        },
        error: function (err) {
            console.log(err)
        }
    })
}
function showRating(idProduct){

            let str = ``;
            str+= `<div style="float: left" class="container d-flex  mt-5">
                        <div class="card  mb-5">
                            <div class="rate  py-3 text-white mt-3">
                                <h6 class="mb-0">Rate of product: <b id="point"></b></h6>
                                <div class="rating">
                                 <input type="radio" name="rating" value="5" id="5l"><label onclick="vote(${idProduct},this.id)" id="5" for="5l">☆</label>
                                 <input type="radio" name="rating" value="4" id="4l"><label onclick="vote(${idProduct},this.id)" id="4" for="4l">☆</label> 
                                 <input type="radio" name="rating" value="3" id="3l"><label onclick="vote(${idProduct},this.id)" id="3" for="3l">☆</label>
                                 <input type="radio" name="rating" value="2" id="2l"><label onclick="vote(${idProduct},this.id)" id="2" for="2l">☆</label> 
                                 <input type="radio" name="rating" value="1" id="1l"><label onclick="vote(${idProduct},this.id)" id="1" for="1l">☆</label>
                                </div>
<!--                                <button class="btn btn-warning btn-block rating-submit">Submit</button>-->
                                <div  class="buttons px-4 mt-0">
                                </div>
                            </div>
                        </div>
            `
            document.getElementById("ratingShow").innerHTML = str;

getRatingProduct(idProduct)


}
function  vote(idProduct, points){
    let vote = {
        "id": "",
        "point": points,
        "account": {
            "id": localStorage.getItem("id"),
        },
        "product": {
            "id": idProduct,
        }
    }
    console.log(vote)
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")

        },
        url: "http://localhost:8080/ratings",
        data: JSON.stringify(vote),
        //xử lý khi thành công
        success: function () {
            alert("vote  Thành công");
        },
        error: function (err) {
            console.log(err)
        }
    })
}