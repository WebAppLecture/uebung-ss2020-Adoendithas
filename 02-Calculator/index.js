import { Calculator } from "./Calculator.js";
//import {MyMath} from "../01-MyMath/MyMath.js";
import { MyMath } from "../01-MyMath/MyMath.js";   // Import Probleme mit altem Import 

window.MyMath = MyMath;
window.Calculator = Calculator;
window.calc = new Calculator(document.querySelector(".numpad"), document.querySelector(".calculation"), document.querySelector(".solution"));