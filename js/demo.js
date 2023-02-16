let isCreate = true;

let imgInp = document.getElementById("img");
let blah = document.getElementById("blah");

function showImg() {
    let file = imgInp.files;
    blah.src = URL.createObjectURL(file[0])
}

function show() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/blogs",
        //xử lý khi thành công
        success: function (blogs) {
            console.log(blogs)
            let str = '';
            for (const blog of blogs) {
                str += `<div class="col-sm-4">
                        <h2>${blog.title}</h2>
                        <img src="${blog.img}" width="300" height="200">
                         <p>${blog.content}</p>
                         <a type="button" class="btn btn-warning" onclick="showEdit(${blog.id})" data-toggle="modal" data-target="#myModal">Edit</a>
                        <a type="button" class="btn btn-danger" >Delete</a>
                        </div>`
            }

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
}

show();

function clearEdit() {
    isCreate = true;
    document.getElementById("id").value = 0;
    $("#content").val("");
    $("#title").val("");
    $("#img").val("");
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
        url: "http://localhost:8080/blogs/upImg",
        success: function (img) {
            create(img)
        }
    });
}

function create(img) {
    let blog = {
        "title": document.getElementById("title").value,
        "content": $("#content").val(),
        "img": img,
        "category": {
            "id": $("#idCategoty").val(),
        }
    }

    if (!isCreate) {
        blog.id = $("#id").val();
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")

        },
        url: "http://localhost:8080/blogs",
        data: JSON.stringify(blog),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showEdit(id) {
    isCreate = false;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")

        },
        url: "http://localhost:8080/blogs/" + id,
        //xử lý khi thành công
        success: function (blog) {
            document.getElementById("id").value = blog.id;
            $("#content").val(blog.content);
            $("#title").val(blog.title);
            $("#img").val(blog.img);
            $("#idCategoty").val(blog.category.id);
        },
        error: function (err) {
            console.log(err)
        }
    })
}
