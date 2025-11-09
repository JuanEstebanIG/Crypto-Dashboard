import {getTopStats} from "./api.js"
import {createCard} from "./cards.js";
import {fillSelects} from "./comparative.js";
import {renderError } from "./errors.js";
import {createFavoriteCard ,updateFavoritePrice} from "./favorites.js";
import {skeletonCard } from "./loading.js";
import { env } from "./cacheManagement.js";

export const storageManager = {
    initStorage:()=>{
        try{
            if(localStorage.getItem("favoriteCoins") == null) localStorage.setItem("favoriteCoins", JSON.stringify({}))
        }catch(err){
            console.error(err)
        };
    },
    readStorage: ()=>{
        try{
            return JSON.parse(localStorage.getItem("favoriteCoins"));
        }catch(err){
            console.error(err)
            return {};
        };
    },
    updateStorage: (data)=>{
        try{
            localStorage.setItem("favoriteCoins", JSON.stringify(data));
        }catch(err){
            console.error(err)
            renderError("No se pudo actualizar la lista de favoritos.");
        }
    }
};

function renderTopCoin(data){
    const containerTopCoin = document.getElementById("topCoin");
    const template =`
            <img src="${data.image}" alt="" class="topcoin__img">
            <h3 class="topcoin__name" >${data.name} <span class="topcoin__symbol">${data.symbol}</span></h3>
            <p class="topcoin__price">${data.current_price.toLocaleString("en-us")}$</p>
    `
    containerTopCoin.innerHTML =template;
};

/**
 * @description - Ejecuta las acciones necesarias para renderizar las targetas correspondientes.
*/
async function renderCards(){
    try{

        const containerCards = document.getElementById("containerCards");
        const skeletonCards = skeletonCard();
        containerCards.appendChild(skeletonCards);

        const topStats = await getTopStats();
        const fragment = document.createDocumentFragment();
        const favStorage = storageManager.readStorage();

        renderTopCoin(topStats[0])

        for(let key of Object.keys(topStats)){
            const {name, image, current_price: price, symbol, id, price_change_percentage_24h: porcentage} = topStats[key];
            let isFav = false;

            if(favStorage != null && favStorage.hasOwnProperty(id)){
                updateFavoritePrice(id, price);
                isFav = true;
            };

            fragment.appendChild(
                createCard(name, image, price, symbol,id, porcentage, isFav) 
            );
            env.cacheCoins.set(id, {name, image, price, symbol,id, porcentage})
        };
        
        skeletonCards.remove();
        containerCards.appendChild(fragment);

    }catch(err){
        console.error(err)
    };
};
/**
 * @description - Renderiza las monedas guardas en el localStorage.
 */
function renderFavorites(){
    const fragment = document.createDocumentFragment();
    const favoriteStorage = storageManager.readStorage();

    const favContainer = document.getElementById("favoriteSection");

    for(let val of Object.values(favoriteStorage)){
        fragment.appendChild(createFavoriteCard(val,true));
    };
    favContainer.appendChild(fragment);
};
/**
 * @description - lanza las funciones pricipales para el funcioanmiento de la Aplicación.
 */
async function startApp(){
    storageManager.initStorage();
    await renderCards();
    renderFavorites();
    fillSelects();
};

window.addEventListener("load",()=> startApp())