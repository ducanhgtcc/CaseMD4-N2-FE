function login() {
    let account = {
        "username": document.getElementById("username").value, "password": $("#password").val()
    }

    $.ajax({
        type: "Post", headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/login",
        data: JSON.stringify(account), //xử lý khi thành công
        success: function (data) {
            console.log(data)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("id", JSON.stringify(data.id));

            localStorage.setItem("username", JSON.stringify(data.username));
            localStorage.setItem("password", JSON.stringify(data.password));

            localStorage.setItem("avatar", JSON.stringify(data.avatar));
            localStorage.setItem("address", JSON.stringify(data.address));
            localStorage.setItem("phone", JSON.stringify(data.phone));
            localStorage.setItem("role", JSON.stringify(data.roles));
            alert("thành công")
            // if (data.roles[0].id == 1) {
            //     // location.href = "admin.html";
            // } else {
            //     location.href = "userDetail_Hoanh.html.html";
            // }
            location.href = "userDetail_Hoanh.html";
        }, error: function (err) {
            console.log(err)
        }
    })
}


let imgInp = document.getElementById("img");
let blah = document.getElementById("blah");

function showImg() {
    let file = imgInp.files;
    blah.src = URL.createObjectURL(file[0])
}

function upImg() {
    let fileImg = document.getElementById("img").files;
    var formData = new FormData();
    formData.append("fileImg", fileImg[0]);

    $.ajax({
        contentType: false, processData: false, headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST", data: formData, url: "http://localhost:8080/accounts/user/upImg", success: function (img) {
            create(img)
            location.href = "index.html";
        }
    });
}

function create(img) {
    let account = {
        "username": document.getElementById("username").value,
        "password": $("#password").val(),
        "avatar": img,
        "address": $("#address").val(),
        "phone": $("#phone").val(),
        "role": {
            "id": $("#role").val(),
        }
    }


    $.ajax({
        type: "Post", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")

        }, url: "http://localhost:8080/accounts/user", data: JSON.stringify(account),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            // show();
        }, error: function (err) {
            console.log(err)
        }
    })


}

function checkSortPassword(password) {

    if (password.length < 6) {
        document.getElementById("errorSortPassword").innerHTML = "* Mật khẩu quá ngắn"
        document.getElementById("password").value = ""
    } else {
        document.getElementById("errorSortPassword").innerHTML = ""


    }

}


function checkDuplicateUserName() {
let name = document.getElementById("username").value
    $.ajax({
        type: "Get", headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/accounts/user/check/" + name,
        //Xử lý khi thành công
        success: function (accounts) {
            console.log(accounts)
            document.getElementById("errorDuplicateUsername").innerHTML = ""


        },
        error: function (err) {
            console.log(err)
            let str = `<p style="color: #fd003f">* Không được trùng tên đăng nhập</p>`
            document.getElementById("errorDuplicateUsername").innerHTML = str
            document.getElementById("username").value = ""


        }
    })
}

function showAvatarHeader() {
    let id = localStorage.getItem("id")
    $.ajax({
        type: "GET", headers: {
            'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")
        }, url: "http://localhost:8080/accounts/user/" + id,
        //xử lý khi thành công
        success: function (account) {
            console.log(account)
            let str = `    <img
                                src="${account.avatar}"
                                class="rounded-circle"
                                height="50"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                        />`
            document.getElementById("avatarHeader").innerHTML = str;


        },
        error: function (err) {

            console.log(err)
        }
    })
}

showAvatarHeader()


function showUserDetail1() {
    let id = localStorage.getItem("id")
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/accounts/user/" + id,
        //xử lý khi thành công
        success: function (account) {
            console.log(account)
            let str = `  <img src="${account.avatar}" alt="avatar"
                             class="rounded-circle img-fluid" style="width: 150px;">
                        <h5 class="my-3">${account.username}</h5>
                        <p class="text-muted mb-4">${account.address}</p>`
            document.getElementById("showUserDetail1").innerHTML = str;


        },
        error: function (err) {
            // alert("NGu")
            console.log(err)
        }
    })
}

showUserDetail1()


function showUserDetail2() {
    let id = localStorage.getItem("id")
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/accounts/user/" + id,
        //xử lý khi thành công
        success: function (account) {
            console.log(account)
            let str = `                         <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">User Name</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">${account.username}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Mobile</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">${account.phone}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Address</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">${account.address}</p>
                            </div>
                        </div>`
            document.getElementById("showUserDetail2").innerHTML = str;


        },
        error: function (err) {
            // alert("NGu")
            console.log(err)
        }
    })
}

showUserDetail2()


function logout() {
    localStorage.clear()
}


//Các hàm sử dụng khi sửa tài khoản

function showEditModal() {
    let id = localStorage.getItem("id")
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }, url: "http://localhost:8080/accounts/user/" + id,
        //xử lý khi thành công
        success: function (account) {
            console.log(account)
            document.getElementById("id").value = account.id
            document.getElementById("username").value = account.username
            document.getElementById("password").value = account.password
            document.getElementById("address").value = account.address
            document.getElementById("phone").value = account.phone
            let str = `<img  src="${account.avatar}" alt="your image" height="270" width="400" />`
            document.getElementById("oldImg").innerHTML = str


        }, error: function (err) {
            alert("NGu")
            console.log(err)
        }
    })
}


function showImgEdit() {
    let file = imgInp.files;
    blah.src = URL.createObjectURL(file[0])
    document.getElementById("oldImg").innerHTML = ""
}


function upImgEdit() {
    let fileImg = document.getElementById("img").files;
    var formData = new FormData();
    formData.append("fileImg", fileImg[0]);

    $.ajax({
        contentType: false,
        processData: false,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        data: formData,
        url: "http://localhost:8080/accounts/user/upImg",
        success: function (img) {
            let id = localStorage.getItem("id")
            edit(img, id)
            location.href="userDetail_Hoanh.html"



        }
    });
}

function edit(img, id) {
    let account = {
        "id": id,
        "username": document.getElementById("username").value,
        "password": $("#password").val(),
        "avatar": img,
        "address": $("#address").val(),
        "phone": $("#phone").val(),
        "role": {
            "id": $("#role").val(),
        }
    }

    $.ajax({
        type: "Post",
        headers: {

            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")

        }, url: "http://localhost:8080/accounts/user/" + id,
        data: JSON.stringify(account),
        //xử lý khi thành công
        success: function (data) {
            console.log(data)
            alert("Sửa tài khoản thành công");
        }, error: function (err) {
            console.log(err)
        }
    })


}