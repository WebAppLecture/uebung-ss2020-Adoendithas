//import {MyMath} from "../01-MyMath/MyMath.js";
import { MyMath } from "../01-MyMath/MyMath.js";   // Import Probleme mit altem Import 

export class Calculator {

    constructor(numpad, outputCalculation, outputSolution) {
        this.numPad = numpad;
        this.outputCalculation = outputCalculation;
        this.outputSolution = outputSolution;
        this.setupNumPad();
        this.calc_string = [];
        this.calcOutput = document.getElementById("calculation");
        this.SolOutput = document.getElementById("solution");
        this.calc_number = "I";
        this.start_line();
    }

    setupNumPad() { 

    // Gen. Numberbuttons
    var buttonsOutput = document.getElementById("numpad");
    var buttons = ["+", "-", "*", "/", "7", "8", "9", "!", "4", "5", "6", "^", "1", "2", "3", "=", "0", "AC"];  
    //var a=0;
    //buttonsOutput.innerHTML = "<input type='button' name='" + a + "' value='" + a + "' class='button' id='but" + a + "'></button><br>";
    for (var a in buttons){
            buttonsOutput.innerHTML += "<input type='button' name='" + buttons[a] + "' value='" + buttons[a] + "' class='button' id='but" + buttons[a] + "'></button> ";
        }

        //10 Tasten DOM Event Listener:
        //for (let i = 0; i<10; i++) {
        var key;
        for (key of this.numPad.children) {
            key.addEventListener("click", this.onButtonClick.bind(this));
            key.addEventListener("click", this.prints.bind(this));
        }
    }

    onButtonClick(symbol) {
        console.log(symbol.toElement.value);
    }

    prints(string) {
        var control_chars = ["","add", "subtract", "multiply", "divide", "faculty", "pow", "=", "AC"];
        var char = string.toElement.value;
        //var calc_string = [];
        this.calcOutput.innerHTML += char;  // hier weiter
        switch(char) {
            case "+":
                this.calc_string.push("add");
              // Rechenteile in Array!
            break;
            case "-":
                this.calc_string.push("subtract");
            break;
            case "*":
                this.calc_string.push("multiply");
            break;
            case "/":
                this.calc_string.push("divide");
            break;
            case "!":
                this.calc_string.push("faculty");
            break;
            case "^":
                this.calc_string.push("pow");
            break;
            case "AC":
                this.clear();
            break;
            break;
            case "=":
                if (control_chars.includes(this.calc_string[0])) {  // kann gerechnet werden?   if aktuell noch Quatsch...
                    this.printSolution("No valid term, please begin term with a number and end with `=`!");
                    //this.clear("calc");
                }
                else {
                    //this.printSolution("Tadaa!");
                    let mat = new MyMath(Number(this.calc_string[0]));
                    mat.show();
                    var exe_str = "";
                    for (var i= 1; i < this.calc_string.length; i++) {
                        if (this.calc_string[i] == "=") {
                            exe_str +=";";
                            break;
                        }
                        if (this.calc_string[i] == "faculty") {
                            exe_str +=".faculty()";
                        }
                        else if (control_chars.includes(this.calc_string[i])) {    // Mathe-Fn
                            exe_str +="."+this.calc_string[i]+"(";
                            if (control_chars.includes(this.calc_string[i+1]) || (!this.calc_string[i+1])) {    // Operationen wie 12+-= sind verboten!
                                var error = 1;
                            }
                        }
                        else {
                            exe_str +=this.calc_string[i]+")";
                        }
                    }
                    if (error == 1) {
                        this.printSolution("No valid term, did you enter smth. like 12+-/ = ?");
                    }
                    else {
                        eval("mat"+exe_str+";");
                        mat.show();
                        this.printSolution(mat.get());
                    }
                    this.calc_string = [];          // neue Rechnung ohne alte zu Löschen:
                    this.new_lines("&#13;");               //in neuer Zeile zwecks Übersicht 
                    this.calc_number+="I";
                    this.start_line();   
                    
                }
            break;
            default:
                if (control_chars.includes(this.calc_string[this.calc_string.length-1]) || this.calc_string.length == 0 ) {
                    this.calc_string.push(char);
                }
                else {
                    this.calc_string[this.calc_string.length-1] += char;                    
                }
        }
        
    }



    printSolution(string) {
        this.SolOutput.innerHTML += string;
    }

    start_line() {
        this.new_lines(this.calc_number+") ");
    }

    new_lines(string) {
        this.calcOutput.innerHTML += string;
        this.SolOutput.innerHTML += string;
    }

    clear() {
        this.calc_string = [];
        this.calcOutput.innerHTML = "Calculation: &#13;";
        this.SolOutput.innerHTML = "Solution: &#13;";
        this.calc_number="I";
        this.start_line();
    }

}
