function marla(ref){
    let currentRow = ref.parentNode.parentNode;
    let marla = Math.floor(ref.value);
    let squareFeetInNMarlas = Math.floor(marla * 272.25);
    let kanalsInNMarlas = Math.floor(marla * 0.0500001);
    let acresInNMarlas = Math.floor(marla * 0.00625001);

    if(squareFeetInNMarlas >= 0){
        currentRow.querySelector(".sq").value = squareFeetInNMarlas;
    } else {
        currentRow.querySelector(".sq").value = 0;
    }

    if(kanalsInNMarlas >= 0){
        currentRow.querySelector(".kanal").value = kanalsInNMarlas;
    } else {
        currentRow.querySelector(".kanal").value = 0;
    }

    if(acresInNMarlas >= 0){
        currentRow.querySelector(".acre").value = acresInNMarlas;
    } else {
        currentRow.querySelector(".acre").value = 0;
    }
}

function squareFeet(ref){
    let currentRow = ref.parentNode.parentNode;
    let sq = Math.floor(ref.value);
    let marlasInNsq = Math.floor(sq * 0.00367309);
    let kanalsInNsq = Math.floor(sq * 0.000183655);
    let acresInNsq = Math.floor(sq * 0.000022957);

    if(marlasInNsq >= 0){
        currentRow.querySelector(".marla").value = marlasInNsq;
    } else {
        currentRow.querySelector(".marla").value = 0;
    }

    if(kanalsInNsq >= 0){
        currentRow.querySelector(".kanal").value = kanalsInNsq;
    } else {
        currentRow.querySelector(".kanal").value = 0;
    }

    if(acresInNsq >= 0){
        currentRow.querySelector(".acre").value = acresInNsq;
    } else {
        currentRow.querySelector(".acre").value = 0;
    }
}

function kanal(ref){
    let currentRow = ref.parentNode.parentNode;
    let kanal = Math.floor(ref.value);
    let marlasInNKanals = Math.floor(kanal * 20);
    let squareFeetInKanals = Math.floor(kanal * 5445);
    let acresInNKanals = Math.floor(kanal * 0.125);

    if(marlasInNKanals >= 0){
        currentRow.querySelector(".marla").value = marlasInNKanals;
    } else {
        currentRow.querySelector(".marla").value = 0;
    }

    if(squareFeetInKanals >= 0){
        currentRow.querySelector(".sq").value = squareFeetInKanals;
    } else {
        currentRow.querySelector(".sq").value = 0;
    }

    if(acresInNKanals >= 0){
        currentRow.querySelector(".acre").value = acresInNKanals;
    } else {
        currentRow.querySelector(".acre").value = 0;
    }
}

function acre(ref){
    let currentRow = ref.parentNode.parentNode;
    let acre = Math.floor(ref.value);
    let marlasInNAcres = Math.floor(acre * 160);
    let squareFeetInNAcres = Math.floor(acre * 43560);
    let kanalsInNAcres = Math.floor(acre * 8);

    if(marlasInNAcres >= 0){
        currentRow.querySelector(".marla").value = marlasInNAcres;
    } else {
        currentRow.querySelector(".marla").value = 0;
    }

    if(squareFeetInNAcres >= 0){
        currentRow.querySelector(".sq").value = squareFeetInNAcres;
    } else {
        currentRow.querySelector(".sq").value = 0;
    }

    if(kanalsInNAcres >= 0){
        currentRow.querySelector(".kanal").value = kanalsInNAcres;
    } else {
        currentRow.querySelector(".kanal").value = 0;
    }
}

function clearInputField() {
    let field = document.getElementsByClassName("cls");
    // let field = document.getElementsByTagName("input");
    for(let a = 0; a < field.length; a++){
        field[a].value = 0;
    }
}

function add(){
    let marlaa = document.getElementById("marla").value;
    let sq = document.getElementById("sq").value;
    let kanall = document.getElementById("kanal").value;
    let acree = document.getElementById("acre").value;
    let rowStart = "<tr class='data'>";
    let rowEnd = "</tr>";
    let dataStart = "<td>";

    let dataEnd = "</td>";
    let marlaIn = "<input class='form-control ins marla' type='number' value='" + 
    marlaa + "' placeholder='Enter' autocomplete='off' onkeyup='marla(this)'>"
    let sqIn = "<input class='form-control ins sq' type='number' value='" + 
    sq + "' placeholder='Enter' autocomplete='off' onkeyup='squareFeet(this)'>"
    let kanalIn = "<input class='form-control ins kanal' type='number' value='" + 
    kanall + "' placeholder='Enter' autocomplete='off' onkeyup='kanal(this)'>"
    let acreIn = "<input class='form-control ins acre' type='number' value='" + 
    acree + "' placeholder='Enter' autocomplete='off' onkeyup='acre(this)'>"
    let removeButton = "<button class = 'btn btn-danger' onclick = 'remove(this)'>-</button>";
    if(marlaa == 0 && sq == 0 && kanall == 0 && acree == 0){
        alert("fill out atleast one fields");
        clearInputField();
    }
    else{
        let txt = rowStart + 
        dataStart + marlaIn + dataEnd +
        dataStart + sqIn + dataEnd +
        dataStart + kanalIn + dataEnd +
        dataStart + acreIn + dataEnd +
        dataStart + removeButton + dataEnd +
        rowEnd;
        document.getElementById("body").innerHTML += txt;
        clearInputField();
    }
}

function remove(btn){
    let rowToRemove = btn.parentNode.parentNode;
    if(rowToRemove){
        rowToRemove.remove();
        clearInputField();
    }
}

