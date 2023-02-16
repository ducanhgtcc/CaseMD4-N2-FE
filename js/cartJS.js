let cartList = JSON.parse(localStorage.getItem("carts") || "[]");

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
let i=0;
    for (const c of cartList) {
        i+=1;
        str += `
            <tr>
                <td>${c.name}</td>
                <td>${c.amount}</td>
                <td>${c.price}</td>
                <td><a type="button" class="btn btn-light" onclick="deleteItemFromCart(${i})">Delete</a>
</td>
            </tr>`
    }
    str += `
            </tbody>
        </table>
    `
    document.getElementById("cartBody").innerHTML = str;
    console.log(new Date().toLocaleString())

}

showCart();
function  deleteItemFromCart(c) {
    cartList.splice(c-1,1);
    localStorage.setItem("carts", JSON.stringify(cartList));
    location.reload();
}
function pay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    let bill = {
        "id": "",
        "date":  new Date().toLocaleString(),
        "account": {"id": localStorage.getItem("id")}
    }

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")

        },
        url: "http://localhost:8080/bills/",
        data: JSON.stringify(bill),
        //xử lý khi thành công
        success: function () {
            alert("Thành công");
        },
        error: function (err) {
            console.log(err)
        }
    })
    createBillDetails();
}
getNewBill();
function createBillDetails() {
    for (let i = 0; i < cartList.length; i++) {
        let billdetail = {
            "id": "",
            "amount": cartList[i].amount,
            "bill": {"id":  $("#hihi").val()},
            "product": {"id": cartList[i].id},
        }
        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem("token")

            },
            url: "http://localhost:8080/billdetails/",
            data: JSON.stringify(billdetail),
            //xử lý khi thành công
            success: function () {
                // alert("Thành công");
                localStorage.setItem("carts", JSON.stringify(""));
                location.reload();
            },
            error: function (err) {
                console.log(err)
            }
        })
    }

}

function getNewBill(){
        $.ajax({
            type: "GET",
            headers: {
                'Accept': 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            url: "http://localhost:8080/bills/getNewBill/",
            //xử lý khi thành công
            success: function (newBillId) {
                document.getElementById("hihi").setAttribute("value",newBillId)
            },
            error: function (err) {
                console.log(err)
            }
        })

}