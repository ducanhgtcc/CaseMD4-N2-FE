let isCreated = true;

function showAllProduct() {
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
                str += `<tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.description}</td>
                        <td>${p.price}</td>
                        <td>${p.status}</td>
                        <td>${p.category.name}</td>
<!--          <td><a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a></td>-->
          <td><a href="#" class="edit" title="Edit" data-toggle="tooltip" onclick="showEdit(${p.id})" data-bs-toggle="modal" data-bs-target="#myModal"><i class="material-icons">&#xE254;</i></a></td>
          <td><a href="#" class="delete" title="Delete" data-toggle="tooltip" onclick="setStatus(${p.id})"><i class="material-icons">&#xE872;</i></a></td>
                        </tr>`
            }
            document.getElementById("showAllProduct").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}

showAllProduct()

function clearEdit() {
    isCreated = true;
    $("#id").val(0);
    $("#name").val("");
    $("#description").val("");
    $("#price").val("");
    $("#status").val("");
    $("#idCatagory").val("");
}

function create() {
    let product = {
        "name": $("#name").val(),
        "description": $("#description").val(),
        "price": $("#price").val(),
        "status": $("#status").val(),
        "category": {
            "id": $("#idCatagory").val(),
        }

    }
    console.log("product", product)
    if (!isCreated) {
        product.id = $("#id").val();
    }
    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/admin/products",
        data: JSON.stringify(product),
        success: function (data) {
            showAllProduct();
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
        url: "http://localhost:8080/admin/products/check/" + name,
        success: function (product) {
            // if (product!=null){
            //
            // }
        },
        error: function (err) {
            alert("không được trùng tên sản phẩm")
            console.log(err)
        }
    })
}

function showEdit(id) {
    isCreated=false;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin/products/" + id,
        success: function (p) {

            $("#id").val(p.id);
            $("#name").val(p.name);
            $("#description").val(p.description);
            $("#price").val(p.price);
            $("#status").val(p.status);
            $("#idCatagory").val(p.category.id);

        },
        error: function (err) {
            console.log(err)

        }

    })
}

      function setStatus(id){
          $.ajax({
              type: "Put",
              headers: {
                  'Accept': 'application/json'
              },
              url: "http://localhost:8080/admin/products/setStatus/" + id,
              success: function (p) {

                 showAllProduct()
              },
              error: function (err) {
                  console.log(err)
              }
          })
}

function findByNameLike(){
    let name = document.getElementById("text").value;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin/products/search/" + name,
        success: function (products) {
            console.log(products)
            let str = '';
            for (const p of products) {
                str += `<tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.description}</td>
                        <td>${p.price}</td>
                        <td>${p.status}</td>
                        <td>${p.category.name}</td>
<!--          <td><a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a></td>-->
          <td><a href="#" class="edit" title="Edit" data-toggle="tooltip" onclick="showEdit(${p.id})" data-bs-toggle="modal" data-bs-target="#myModal"><i class="material-icons">&#xE254;</i></a></td>
          <td><a href="#" class="delete" title="Delete" data-toggle="tooltip" onclick="setStatus(${p.id})"><i class="material-icons">&#xE872;</i></a></td>
                        </tr>`
            }
            document.getElementById("showAllProduct").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}




function showIdCategory() {

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
                str += ` 
                      <option value="${c.id}">${c.name}</option>`
            }
            document.getElementById("idCatagory").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })

}

showIdCategory();