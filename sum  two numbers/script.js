function calculate() {
    let num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);
    let operation = getOperation();
    switch(operation){
        case "+":
            document.getElementById("result").innerHTML = num1 + num2;
            break;
        case "-":
            document.getElementById("result").innerHTML = num1 - num2;
            break;
        case "*":
            document.getElementById("result").innerHTML = num1 * num2;
            break;
        case "/":
            document.getElementById("result").innerHTML = num1 / num2;
            break;
        case "%":
            document.getElementById("result").innerHTML = num1 % num2;
            break;
        default:
            document.getElementById("result").innerHTML = "Invalid operation";
    }
  }

  function getOperation(){
    let selected = document.getElementById('op');
    var selectedOption = selected.options[selected.selectedIndex].value;
    return selectedOption;
  }