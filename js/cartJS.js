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
    document.getElementById("cartBody").innerHTML = str;
    console.log(new Date().toLocaleString())

}

showCart();

function pay() {
    let bill = {
        "id": "",
        "date": '2011/11/11',
        "account": {"id": "1"}
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

function createBillDetails() {
    for (let i = 0; i < ; i++) {
        
    }
    let billdetail = {
        "id": "",
        "amount": '3',
        "bill": {"id": "1"},
        "product": {"id": "1"},
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
            alert("Thành công");
        },
        error: function (err) {
            console.log(err)
        }
    })
}