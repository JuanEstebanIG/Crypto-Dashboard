import { createChart } from "./chart.js";
import { favoriteManager, updateFavoritePrice } from "./favorites.js";
import { renderError } from "./errors.js";
import { removeLoading, addLoading} from "./loading.js";
import { cacheCoins } from "./main.js";

const containerModal = document.getElementById("containerModal");


export function createCard(name, image, price, symbol,id,percentage, isFav){      
    try{
        if(!name || !image || price == null || !symbol || !id || percentage == null){
            throw new Error("Datos corruptos o incompletos")
        };

        let color = percentage < 0 ? "var(--red)": "var(--green)";
        let card = document.createElement("article");

        card.setAttribute("id",id);
        price = price.toLocaleString("en-us");

        card.innerHTML= `
            <figure>
                <img src="${image}" alt="criptomoneda ${name} logo" class="card__img">
            </figure>
            <h3 class="card__title">${name}<span class="card__symbol">${symbol}</span></h3>
            <span class="card__price">${price}$ USD</span>
            <span class="cards__favorite-icon" data-button-action="toggle-favorite"></span>
            <span class="card__percentage">${percentage.toFixed(2)}%</span>
            <button class="card__button" aria-label="Abrir estadisticas." data-button-action="open" >Estadisticas <img src="./assets/statistics.svg" class="card__button-icon"> </button>
        `;

        card.classList.add("card");

        Object.assign(card.dataset, {coin: id});
        
        if(isFav) card.querySelector(".cards__favorite-icon").classList.add("card__button-icon--star");
        card.querySelector(".card__percentage").style.backgroundColor = color;
        
        return card;
    }catch(err){
        renderError("Error al cargar la información, intente recargar la pagina")
        console.error("Error create cards",err);
    };
};

export async function showModalChart(id,name){

    try{
        addLoading();
        await createChart(id,name);
        containerModal.classList.add("modal--show");
    }catch(err){
        renderError("Error al cargar las estadisticas, por favor intente de nuevo.");
    }finally{
        removeLoading();
    };
};

const actionHandlers = {
    open: (card, id)=>{
        if(containerModal !== null){
            const name = cacheCoins.get(id).name;
            showModalChart(id,name,card);
        };
    },
    close:(card, id)=>{
        containerModal.classList.remove("modal--show");
    },
    "toggle-favorite":(card, id)=>{
        favoriteManager(card,id)
    }
};

document.getElementById("containerCards").addEventListener("click",(e)=>{
    const buttonAction = e.target.dataset.buttonAction;

    if(buttonAction){
        const card = e.target.closest(".card");
        const handler = actionHandlers[buttonAction];
        if(handler){
            handler(card, card?.id)
        }
    };
});