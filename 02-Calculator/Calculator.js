import {MyMath} from "../01-MyMath/MyMath.js";

export class Calculator {

    constructor(numpad, outputCalculation, outputSolution) {
        this.numPad = numpad;
        this.outputCalculation = outputCalculation;
        this.outputSolution = outputSolution;
        this.setupNumPad();
    }

    setupNumPad() { 
        //10 Tasten DOM Event Listener:
        //for (let i = 0; i<10; i++) {
        var key;
        for (key of this.numPad.children) {
            //key.addEventListener("click", this.onButtonClick.bind(this));
            key.addEventListener("click",  function() {
                console.log(this.value);
              });
        }
    }

    onButtonClick(symbol) {
        console.log(this.value);
    }

    print(string) {

    }

    printSolution(string) {

    }

    clear() {

    }

}
