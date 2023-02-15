let isCreate = true;
let imgInp = document.getElementById("img");
let blah = document.getElementById("blah");

function showImg() {
    let file = imgInp.files;
    blah.src = URL.createObjectURL(file[0])
}

function showAll(){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/admin/images/",
        //xử lý khi thành công
        success: function (imgs) {
            console.log(imgs)
            let str = '';
            for (const i of imgs) {
                str += `<tr>
                        <td>${i.id}</td>
                        <td><img src="${i.img}" width="300" height="200"></td>
                        <td>${i.product.name}</td>
                        <td><a href="#" class="edit" title="Edit" data-toggle="tooltip" onclick="showEdit(${i.id})" data-bs-toggle="modal" data-bs-target="#myModal"><i class="material-icons">&#xE254;</i></a></td>
                        <td><a href="#" class="delete" title="Delete" data-toggle="tooltip" onclick="deleteImg(${i.id})"><i class="material-icons">&#xE872;</i></a></td>
                        </tr>`
            }

            document.getElementById("showImg").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
}
showAll();


function clearEdit() {
    isCreate = true;
    document.getElementById("id").value = 0;
    $("#name").val("");
    $("#idProduct").val("");

}

function upImg(){
    let fileImg = document.getElementById("img").files;
    var formData = new FormData;
    formData.append("fileImg", fileImg[0]);

    $.ajax({
        contentType: false,
        processData: false,
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        data: formData,
        url: "http://localhost:8080/admin/images/upImg",
        success: function (img) {
            create(img)
        }
    });
}

function create(img) {
    let anh = {
        "img": img,
        "product": {
            "id": $("#idProduct").val(),
        }
    }
    if (!isCreate) {
        anh.id = $("#id").val();
    }
    console.log(anh)

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")

        },
        url: "http://localhost:8080/admin/images",
        data: JSON.stringify(anh),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            showAll();
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
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")

        },
        url: "http://localhost:8080/admin/images/" + id,
        //xử lý khi thành công
        success: function (anh) {
            document.getElementById("id").value = anh.id;

            $("#img").val(blog.img);
            $("#idProduct").val(anh.product.id);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function deleteImg(id){
    $.ajax({
        type: "Delete",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin/images/" + id,
        success: function (i) {
            showAll()
        },
        error: function (err) {
            console.log(err)
        }
    })
}



function showIdProduct() {
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin/products",
        success: function (products) {
            console.log(products)
            let str = '';
            for (const p of products) {
                str += `
                      <option value="${p.id}">${p.name}</option>`
            }
            document.getElementById("idProduct").innerHTML = str;
        },
        error: function (err) {
            console.log("wrong")
        }
    })


}
showIdProduct();