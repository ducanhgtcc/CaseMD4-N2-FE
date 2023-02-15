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
    let cartList = JSON.parse(localStorage.getItem("carts")||"[]");
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

}
showCart();