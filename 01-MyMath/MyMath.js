/**
 * 'export' ist nötig falls wir MyMath in einem anderen Modul importieren wollen.
 * 'class' legt fest dass es sich hierbei um eine Klasse handelt.
 * 'MyMath' ist der Name der Klasse.
 */
export class MyMath {

    /**
     * Der Konstruktor wird aufgerufen um neue Instanzen der Klasse zu generieren.
     * vgl. let myNumber = new MyMath(3);
     * 
     * @param value Unser Initialwert für den Wert von unserer MyMath Instanz.
     */
    constructor(value) {
        // 'this' referenziert den Kontext in dem die aktuelle Funktion aufgerufen wird. 
        // Hier referenziert es die Instanz der Klasse MyMath die wir gerade erstellen.
        // mit 'value * 1' erzwingen wir, dass value als number gelesen wird.
        this.value = value * 1; 
    }

    //Gives an Alert with actual value
    show() {
        alert("Value is " + this.value);
    }

    // Set the value of myMath manually:
    set(value) {
        this.value = value;
        return this;
    }

    add(value) {
        this.value += value;
        return this;
    }

    subtract(value) {
        this.value -= value;
        return this;
    }

    multiply(value) {
        this.value *= value;
        return this;
    }

    divide(value) {
        if (value == 0) {
            if (confirm("You are about to divide by ZERO, do you know what you`re doing?!?")) {
                alert("Action canceled to prevent cracks in the space-time continuum!");
              } else {

              }
        }
        else {
            this.value /= value;
        }

        return this;
    }

    pow(value) {
        let temp = this.value;
        for (let a = 2; a <= value; a++) {
            this.value *= temp;
        }


        return this;
    }

    faculty() {
        if (this.value % 1 == 0) {
            for (let a = (this.value - 1); a > 1; a--) {
                this.value *= a;
            }
        }
        else {
            alert(this.value + " is no valid integer.");
        }

        return this;
    }
}
