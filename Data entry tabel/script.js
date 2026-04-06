let rowCounter = 0;
let currentEditRow = null;

function clearInputField() {
    let field = document.getElementsByTagName("input");
    for(let a = 0; a < field.length; a++){
        field[a].value = '';
    }
}

function add(){
    let name = document.getElementById("name").value;
    let CNIC = document.getElementById("CNIC").value;
    let Address = document.getElementById("Address").value;
    let cellPhone = document.getElementById("Cell").value;
    let rowId = "row" + rowCounter;
    let rowStart = "<tr id = '" + rowId + "' class='data'>";
    let rowEnd = "</tr>";
    let dataStart = "<td>";
    let dataEnd = "</td>";
    let headScope = "<th scope = 'row'>" + (rowCounter + 1) + "</th>";
    let buttonTag = "<button class='btn btn-danger' onclick='remove(\"" + rowId + "\")'>-</button>";
    let editBtn = "<button class='btn btn-default' onclick='edit(this)'>Edit</button>";

    if(name == "" || CNIC == "" || Address == "" || cellPhone == ""){
        alert("fill out the input fields");
        clearInputField();
    }
    else{
        let txt = rowStart + headScope +
            dataStart + name + dataEnd +
            dataStart + Address + dataEnd +
            dataStart + CNIC + dataEnd +
            dataStart + cellPhone + dataEnd +
            dataStart + editBtn + " " + buttonTag + dataEnd +
            rowEnd;

        document.getElementById("body").innerHTML += txt;
        clearInputField();
        rowCounter++;
    }
}

function remove(id){
    let rowToRemove = document.getElementById(id);
    if(rowToRemove){
        rowToRemove.remove();
        reorderSerials();
    }
}

function edit(btn){
    let row = btn.parentNode.parentNode;
    currentEditRow = row;
    let cells = row.getElementsByTagName("td");
    document.getElementById("name").value = cells[0].innerHTML;
    document.getElementById("Address").value = cells[1].innerHTML;
    document.getElementById("CNIC").value = cells[2].innerHTML;
    document.getElementById("Cell").value = cells[3].innerHTML;
}

function update(){
    if(currentEditRow){
        let cells = currentEditRow.getElementsByTagName("td");
        cells[0].innerHTML = document.getElementById("name").value;
        cells[1].innerHTML = document.getElementById("Address").value;
        cells[2].innerHTML = document.getElementById("CNIC").value;
        cells[3].innerHTML = document.getElementById("Cell").value;
        clearInputField();
        currentEditRow = null;
    } else {
        alert("Please select a row to edit first.");
    }
}

function reorderSerials() {
    const rows = Array.from(document.getElementsByClassName("data"));
    rows.forEach((row, index) => {
        const serialCell = row.querySelector("th");
        if (serialCell) {
            serialCell.innerText = index + 1;
        }
    });
}
