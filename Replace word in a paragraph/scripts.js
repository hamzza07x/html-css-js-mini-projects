function getParagraph(){
    let paragraph = document.getElementById("toget").textContent;   
    return paragraph;
}

function getExistingWord(){
    return document.getElementById("ex").value;
}

function getWordToReplace(){
    return document.getElementById("new").value;
}

function clearInputField() {
    document.getElementById('inputForm').reset();
}

function replace(){
    let originalParagraph = getParagraph();
    let existingWord = getExistingWord();
    let wordToReplace = "<mark>" + getWordToReplace() + "</mark>";
    if(existingWord.trim() == "" || wordToReplace.trim() == "<mark></mark>"){
        alert("fill out input fields")
        clearInputField();
        return;
    }
    originalParagraph = originalParagraph.replaceAll(existingWord,wordToReplace);
    document.getElementById("toget").innerHTML = originalParagraph;
    clearInputField();
}