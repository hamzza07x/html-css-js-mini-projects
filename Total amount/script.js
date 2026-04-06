let installmentCount = 0;

function fillR() {
    let total = parseFloat($("#am").val());
    let adv = parseFloat($("#ad").val());
    let remaining = total - (isNaN(adv) ? 0 : adv);
    $("#r").val(remaining > 0 ? remaining : 0);
}

function filln() {
    let total = (parseFloat($("#am").val()));
    let adv = (parseFloat($("#ad").val()));
    if (adv > 0) {
        total -= adv;
    }
    const perInstallment = (parseFloat($("#amins").val()));
    if (total && perInstallment > 0) {
        $("#noins").val (Math.round(total / perInstallment));
    }
}

function filla() {
    let total = (parseFloat($("#am").val()));
    let adv = (parseFloat($("#ad").val()));
    if (adv > 0) {
        total -= adv;
    }
    const numInstallments = (parseFloat($("#noins").val()));
    if (total && numInstallments > 0) {
        $("#amins").val (Math.round(total / numInstallments));
    }
}

function generateInstallments() {
    let totalPrice = parseFloat($("#am").val());
    const advanceAmount = parseFloat($("#ad").val()) || 0;
    const amountPerInstallment = parseFloat($("#amins").val());
    const date = $("#d").val();
    const type = $("#st").val();

    if (!totalPrice || !amountPerInstallment || !date || type === "Select type") {
        alert("Please fill all fields correctly.");
        return;
    }

    if (advanceAmount > 0) {
        totalPrice -= advanceAmount;
        $("#r").val(totalPrice);
    }

    const startDate = new Date(date);
    const currentDate = new Date();
    const today = currentDate.toISOString().split('T')[0];

    if (startDate.getTime() < currentDate.getTime() && date !== today) {
        alert("Start date cannot be in the past");
        return;
    }

    let rowsHtml = "";
    $("#body").html("");

    if (advanceAmount > 0) {
        let advDate = new Date().toISOString().split('T')[0];
        rowsHtml += createRow("-", advDate, advanceAmount, type, true); 
    }

    installmentCount = (Math.round(totalPrice / amountPerInstallment));
    let monthIncrement = 1;
    if (type === "Quarterly") monthIncrement = 3;
    else if (type === "Half-yearly") monthIncrement = 6;

    for (let i = 1; i <= installmentCount; i++) {
        let instDate = new Date(startDate);
        instDate.setMonth(startDate.getMonth() + monthIncrement * (i - 1));
        const formattedDate = instDate.toISOString().split('T')[0];
        rowsHtml += createRow(i, formattedDate, Math.round(amountPerInstallment), type, false);
    }

    $("#body").html(rowsHtml);
    displayTotal();
}

function createRow(number, date, amount, type, isChecked) {
    const checkedAttr = isChecked ? "checked" : "";
    return `
        <tr class='data'>
            <td><input name='check' class='form-check-input' type='checkbox' ${checkedAttr}></td>
            <td>${number}</td>
            <td>${date}</td>
            <td>${amount}</td>
            <td>${type}</td>
            <td><button class='btn btn-danger' onclick='remove(this)'>-</button></td>
        </tr>
    `;
}

function remove(btn) {
    let rowToRemove = btn.parentNode.parentNode;
    if(rowToRemove){
        rowToRemove.remove();
    }
    displayTotal();
}

function displayTotal() {
    let totalInstallments = 0;
    let totalAmount = 0;

    $("tr.data").each(function () {
        const label = $(this).find("td").eq(1).text();
        const amount = parseFloat($(this).find("td").eq(3).text());
        if (!isNaN(amount)) {
            totalAmount += amount;
            if (label !== "-") {
                totalInstallments++;
            }
        }
    });

    const grandTotal = totalAmount;

    $("#t").text("Total");
    $("#ti").text(totalInstallments);
    $("#ta").text(Math.round(grandTotal));
    $("#noins").val(totalInstallments);
    $("#tdbtn").html("<button class='btn btn-danger' onclick='remove(this)'>-</button>");

    const lastDate = $("tr.data:last td").eq(2).text() || "-";
    $("#lastDate").text(lastDate);
    $("#tp").text("-");
}