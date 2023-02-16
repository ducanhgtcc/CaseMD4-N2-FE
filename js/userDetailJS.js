function showBill() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/bills/getBillByAccountId/"+localStorage.getItem("id"),
        //xử lý khi thành công
        success: function (bills) {
            console.log(bills)
            let str = '';
            str += `
     <table class="table table-bordered">
            <thead>
            <tr>
                <th>Thời gian mua hàng</th>
                <th>Số lượng</th>
                <th>giá tiền</th>
            </tr>
            </thead>
            <tbody>
            `
            let i=0;
            for (const c of bills) {
                showSumBill(c.id,i)
                i+=1
                str += `
            <tr>
            
                <td>${c.date}</td>
                <td>${c.price}</td>
                <td><p id="img_${c.id}" ></p></td>
                
                <td><a type="button" class="btn btn-light" onclick="showSumBill(${c.id},i )">Delete</a>
                
</td>
            </tr>`
            }
            str += `
            </tbody>
        </table>
    `
            document.getElementById("showBill").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })


}
showBill()
showSumBill(5)
function showSumBill(id,i){
    console.log(id + ": " + i)
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/billdetails/getSumBillByIdBill/"+id,
        //xử lý khi thành công
        success: function (sum) {
            document.getElementById('img_'+id).innerHTML = sum;
        },
        error: function (err) {
            console.log(err)
        }
    })
}