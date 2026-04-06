function getNumber(){
    let number = parseInt(document.getElementById("num").value);
    return number;
}

function pattern(n){
    let text = "";
    for(let a = 1; a <= n; a++){
        for(let b = 1; b <= a; b++){
            text = text + " " + a + " ";
        }
        text = text + "<br>";
    }
    for(let a = n - 1; a >= 1; a--){
        for(let b = a; b >= 1; b--){
            text = text + " " + a + " ";
        }
        text = text + "<br>";
    }
    return text;
}

function generate(){
    let num = getNumber();
    let text = "";
    text = pattern(num);
    document.getElementById("ptr").innerHTML = text;
}
