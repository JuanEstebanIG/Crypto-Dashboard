import { cacheCoins } from "./main.js";
import { createComparativeChart } from "./chart.js";
import { renderError } from "./errors.js";


const DOMElements ={
    selects:{
        first: document.getElementById("firstList"),
        second: document.getElementById("secondList")
    },
    button: document.getElementById("buttonComparative")
};

const currentsOptions={
    first: null,
    second: null
};

/**
 * @description - llena los selects de la seccion de comparacion con los datos de las monedas cargadas en cache.
 */

export function fillSelects() {
    const fragment = document.createDocumentFragment();
    
    cacheCoins.values().forEach(
        (coin) => {
            const option = document.createElement("option");
            option.value = coin.id;
            option.innerText = coin.name;
            fragment.appendChild(option);
        }
    );

    DOMElements.selects.first.appendChild(fragment.cloneNode(true));
    DOMElements.selects.second.appendChild(fragment);
};

const  canvas = document.getElementById("canvasComparation");
createComparativeChart(canvas,"binancecoin","ethereum","binancecoin", "ethereum");


/**
 * @description - desactiva y activa dinamicamente las opciones de comparacion segun la ineteraccion del usuario.
 * @param {DOMSelectElement} target - TARGET el eleemnto que disparo el evento change.
 */
function handlerOption(target){
    let key = target === DOMElements.selects.first ?  "second" : "first";

    const newOption = DOMElements.selects[key].querySelector(`option[value="${target.value}"]`);

    if(!newOption) return
    if(currentsOptions[key]) currentsOptions[key].disabled = false;
    
    newOption.disabled = true;
    currentsOptions[key] = newOption;
};

/**
 * @description - modifica el grafico de comparacion con las monedas actules seleccionadas
 */
function comparative(){
    const firstVal = DOMElements.selects.first.value;
    const secondVal = DOMElements.selects.second.value;

    if(!firstVal || !secondVal){
        renderError("Comparación fallida, intenta más tarde.");
        return
    };
    if(firstVal == secondVal){
        renderError("Error: Estás intentado comparar la misma moneda.");
        return       
    };

    createComparativeChart(canvas,firstVal,secondVal, cacheCoins.get(firstVal).name, cacheCoins.get(secondVal).name );
};

DOMElements.selects.first.addEventListener("change",(e)=> handlerOption(e.target));
DOMElements.selects.second.addEventListener("change",(e)=> handlerOption(e.target));
DOMElements.button.addEventListener("click",()=> comparative());