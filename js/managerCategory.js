let isCreated = true;

function showAllCategory() {
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin/categories",
        success: function (categories) {
            console.log(categories)
            let str = '';
            for (const c of categories) {
                str += `<tr>
                        <td>${c.id}</td>
                        <td>${c.name}</td>
                       
<!--          <td><a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a></td>-->
          <td><a href="#" class="edit" title="Edit" data-toggle="tooltip" onclick="showEdit(${c.id})" data-bs-toggle="modal" data-bs-target="#myModal"><i class="material-icons">&#xE254;</i></a></td>
          <td><a href="#" class="delete" title="Delete" data-toggle="tooltip" onclick="deleteCategory(${c.id})"><i class="material-icons">&#xE872;</i></a></td>
                        </tr>`
            }
            document.getElementById("showAllCategories").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}

showAllCategory()

function clearEdit() {
    isCreated = true;
    $("#id").val(0);
    $("#name").val("");

}

function create() {
    let category = {
        "name": $("#name").val(),
    }
    if (!isCreated) {
        product.id = $("#id").val();
    }
    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/admin/categories",
        data: JSON.stringify(category),
        success: function (data) {
            showAllCategory();
        },
        error: function (err) {
            console.log(err)
        }
    })
}


function isDuplicateName(name) {
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin/categories/checkname/" + name,
        success: function (product) {

        },
        error: function (err) {
            alert("không được trùng tên sản phẩm")
            console.log(err)
        }
    })
}

function showEdit(id) {
    isCreated = false;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin/categories/" + id,
        success: function (p) {

            $("#id").val(p.id);
            $("#name").val(p.name);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function deleteCategory(id) {
    $.ajax({
        type: "Delete",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin/categories/" + id,
        success: function (p) {
            alert("Thành công")
            showAllCategory()
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function findByNameLike() {
    let name = document.getElementById("text").value;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin/categories/search/" + name,
        success: function (products) {
            console.log(products)
            let str = '';
            for (const p of products) {
                str += `<tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                       
<!--          <td><a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a></td>-->
          <td><a href="#" class="edit" title="Edit" data-toggle="tooltip" onclick="showEdit(${p.id})" data-bs-toggle="modal" data-bs-target="#myModal"><i class="material-icons">&#xE254;</i></a></td>
          <td><a href="#" class="delete" title="Delete" data-toggle="tooltip" onclick="setStatus(${p.id})"><i class="material-icons">&#xE872;</i></a></td>
                        </tr>`
            }
            document.getElementById("showAllCategories").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}


