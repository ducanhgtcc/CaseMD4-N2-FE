function login() {
    let account = {
        "username": document.getElementById("username").value,
        "password": $("#password").val()
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/login",
        data: JSON.stringify(account),
        //xử lý khi thành công
        success: function (data) {
            console.log(data)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("id", JSON.stringify(data.id));

            localStorage.setItem("username", JSON.stringify(data.username));

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
        },
        error: function (err) {
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
        contentType: false,
        processData: false,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        data: formData,
        url: "http://localhost:8080/accounts/upImg",
        success: function (img) {
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
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")

        },
        url: "http://localhost:8080/accounts",
        data: JSON.stringify(account),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            // show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function checkDuplicateUserName(name) {

    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/accounts/check" + name,
        //Xử lý khi thành công
        success: function (accounts) {
            console.log(accounts)
            alert("Thanh cong")

        },
        error: function (err) {
            console.log(err)
            let str = `<p style="color: #fd003f">*Không được trùng tên đăng nhập</p>`
            document.getElementById("messageError").innerHTML = str
            document.getElementById("username").value = ""
            alert("Không được trùng tên đăng nhập")


        }
    })
}

function showAvatarHeader() {
    let id = localStorage.getItem("id")
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/accounts/" + id,
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
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/accounts/" + id,
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
            alert("NGu")
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
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/accounts/" + id,
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
            alert("NGu")
            console.log(err)
        }
    })
}
showUserDetail2()







//
// function showUserDetail(id) {
//
//     $.ajax({
//         type: "Get",
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem("token")
//
//         },
//         url: "http://localhost:8080/blogs/" + id,
//         //xử lý khi thành công
//         success: function (blog) {
//             document.getElementById("id").value = blog.id;
//             $("#content").val(blog.content);
//             $("#title").val(blog.title);
//             $("#img").val(blog.img);
//             $("#idCategoty").val(blog.category.id);
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }


// function showAllAccount() {
//     //Phải gửi dữ liệu về lên dùng Accept
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json'
//         },
//         url: "http://localhost:8080/employee",
//         //Gửi dữ liệu từ WebService về nên không cần ép kiểu (data: JSON.stringify(----),)
//         //Xử lý sau khi ajax nhận hết các thông tin ở trên
//         success: function (employees) {
//             console.log(employees)
//             let str = '';
//
//             for (const e of employees) {
//                 str += `
//          <tr>
//             <td>${e.code}</td>
//
//             <td><button onclick="showIdForEmployeeDetail(${e.id})">${e.name}</button></td>
//             <td>${e.age}</td>
//             <td>${e.salary}</td>
//             <td>${e.branch.id}</td>
//
//             <td><a type="button" class="btn btn-warning" onclick="showEditById(${e.id})" data-toggle="modal" data-target="#editModal">Edit</a></td>
//             <td><a type="button" class="btn btn-danger" onclick="deleteById(${e.id})" >Delete</a></td>
//         </tr>`
//             }
//             document.getElementById("show").innerHTML = str;
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }
//
// showAllAccount()
//
// function showEditById(id) {
//     $.ajax({
//         type: "Get",
//         headers: {
//             'Accept': 'application/json'
//         },
//         url: "http://localhost:8080/employee/" + id,
//         //Xử lý khi thành công
//         success: function (employee) {
//             document.getElementById("idEdit").value = employee.id;
//             document.getElementById("codeEdit").value = employee.code;
//             $("#nameEdit").val(employee.name);
//             $("#ageEdit").val(employee.age);
//             $("#salaryEdit").val(employee.salary);
//             $("#nameBranch").val(employee.branch.name);
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }


function logout(){
    localStorage.clear()

}


