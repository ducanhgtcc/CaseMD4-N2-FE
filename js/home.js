function showAllCatalogue() {
    //Phải gửi dữ liệu về lên dùng Accept
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/images",
        //Gửi dữ liệu từ WebService về nên không cần ép kiểu (data: JSON.stringify(----),)
        //Xử lý sau khi ajax nhận hết các thông tin ở trên
        success: function (imgs) {
            console.log(imgs)
            let  str =` <div id="thumbs" class="navigation">`

                str += `<ul class="thumbs noscript" >`
            for (const img of imgs) {

                str += `  
                     <li> 
                         <a class="thumb" href="#" title=""> <img src="${img.img}" alt="" /><span></span> </a> 
                     </li>  `

            }
            str += `</ul>`
            str += `</div>`
            document.getElementById("show").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function showSlide() {
    //Phải gửi dữ liệu về lên dùng Accept
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/images",
        //Gửi dữ liệu từ WebService về nên không cần ép kiểu (data: JSON.stringify(----),)
        //Xử lý sau khi ajax nhận hết các thông tin ở trên
        success: function (imgs) {
            console.log(imgs)
            let  str =`    <div id="carouselExampleSlidesOnly" class=" slide" data-bs-ride="carousel">
                             <div class="carousel-inner">
                             <div class="carousel-item active">
                                     <img width="620px" height="403px" src="images/gallery-img3.jpg" class="" alt="...">             
                             </div>`
            for (const img of imgs) {
                str += `  
                    <div class="carousel-item">
                                <img src="${img.img}" class="d-block" width="620px" height="403px"  alt="...">
                    </div> `
            }
            str += `</div>
                    </div>`
            document.getElementById("caseSlide").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}
showAllCatalogue();
showSlide()
showLogin()
function logout() {
    localStorage.clear()
    location.reload();
}
function showLogin(){
    let user = JSON.parse(localStorage.getItem("user"));

    let str =``;
    str+=`
    <a style="float:right;" type="button" class="btn btn-light" href="login_Hoanh.html" >Log in</a>
    <a style="float:right;" type="button" class="btn btn-light" href="register_Hoanh.html">Sign in</a>
                           
    `
    if (localStorage.getItem("id")==null){
        console.log(localStorage.getItem("id"))
        document.getElementById("loginShow").innerHTML=str;
    }else{
        let str2 =``;
        str2+=`
<a style="float:right;" type="button" class="btn btn-light" onclick="logout()" >Log out</a>
   <p style="font-size: 22px; float: right; padding-top: 10px;margin-right: 100px;">Xin chào ${user.username}</p>
       `
        document.getElementById("loginShow").innerHTML=str2;

    }

}