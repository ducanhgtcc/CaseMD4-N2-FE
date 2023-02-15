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
                         <a class="thumb" href="#" title=""> <img src="${img.name}" alt="" /><span></span> </a> 
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
                                     <img width="620px" height="403px" src="images/pexels-piccinng-3075993 - Copy.jpg" class="" alt="...">             
                             </div>`
            for (const img of imgs) {
                str += `  
                    <div class="carousel-item">
                                <img src="${img.name}" class="d-block" width="620px" height="403px"  alt="...">
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