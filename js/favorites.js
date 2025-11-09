import { cacheCoins, storageManager } from "./main.js";

const favContainer = document.getElementById("favoriteSection");
const favButton = document.getElementById("favoriteButton");

/**
* @description Crea una nueva tarjeta de favorito y modifica la estrella asociada a la card que disparó el evento.
 *@param {Object} data - Data datos referentes a la moneda añadida a fovoritos. 
 * @param {HTMLElement} star - Elemento star asociado a la card de la cual se realizó la modificación
 */

function addFavorite(data, star){
    if(star)star.classList.add("card__button-icon--star");

    const {id,image,name,price,symbol} = data;
    createFavoriteCard({id, image, name, price, symbol});
};

/**
 * @description Elimina el elemento favItem correspondiente a la moneda indicada por ID en el DOM.
 * @param {HTMLElement} star - Elemento star asociado a la card de la cual se realizó la modificación
 * @param {String} coinId - ID con el cual se identifica la moneda en la API
 */
function deleteFavorite(star,coinId){

    if(star) star.classList.remove("card__button-icon--star");
    const favCard = favContainer.querySelector(`[data-id="${coinId}"]`);

    if(favCard !== null) favCard.remove();
};
/**
* @description Actualiza los precios de las monedas que se encuentran en la lista de favoritos almacenada en el localStorage.
 * @param {String} id - id de la moneda, usado como key en la lista de favoritos
 * @param {String} currentPrice - Precio actualizado
 */

export function updateFavoritePrice(id,currentPrice){
    let favStorage = storageManager.readStorage();
        if(favStorage[id]["price"] !== null){
            favStorage[id]["price"] = currentPrice;
            storageManager.updateStorage(favStorage);
        };
};

/**
 * @description - Gestiona estados de favoritos de las monedas, eliminando y agragando en el localStorage y en el DOM.
 * @param {HTMLDivElement} card - card en la cual se disparo el evento.
 * @param {String} id - id de la moneda realacionada a la card en la cual se disparo el evento.
 */

export function favoriteManager(card,id){

    let favStorage = storageManager.readStorage();
    let star = null;
    const coinData = cacheCoins.get(id);
    
    if(card) star = card.querySelector(".cards__favorite-icon");
    if(!favStorage.hasOwnProperty(id)){

        addFavorite(coinData, star);
        favStorage[coinData.id]= coinData;
    }
    else {
        deleteFavorite(star,id);
        delete favStorage[id];
    };
    storageManager.updateStorage(favStorage);
};
/**
 * @description Crea una tarjeta de favorito con los datos de la moneda
 * @param {Object} val - Objeto que contiene los datos de la moneda
 * @param {String} val.id - ID con el cual se identifica la moneda en la API
 * @param {String} val.name - Nombre de la moneda
 * @param {String} val.price - Precio de la moneda
 * @param {String} val.image - URL con la imagen o logo de la moneda
 * @param {String} val.symbol - Símbolo o abreviatura de la moneda
 * @param {Boolean} [isFragment] - Booleano que indica si la card se debe retornar para usarse en un fragment
 * @returns {HTMLDivElement|void} - Card que se retornará si isFragment es true, de lo contrario se añade al DOM
 */

export function createFavoriteCard(val,isFragment){
        if(!val) return
        const {id, image,name, price, symbol} = val; 
        const favItem = document.createElement("div");

        favItem.setAttribute("data-id", id);
        favItem.classList.add("favorite-item");

        const content =`
                    <img src="${image}" alt="logo de la criptomoneda ${name}" class="favorite__img">
                    <span class="favorite__name-coin">${name}</span>
                    <span class="favorite__symbol-coin">${symbol}</span>
                    <span class="favorite__price-coin">${price.toLocaleString("en-us")}$ USD</span>
                    <span class="favorite__favorite-icon" data-button-action="toggle-favorite"></span>
        `;
        favItem.innerHTML = content;

        if(isFragment) return favItem;

        favContainer.appendChild(favItem);
};

favButton.addEventListener("click",()=>{
    favContainer.classList.toggle("favorites--show");
});

favContainer.addEventListener("click",(e)=>{

    const action = e.target.dataset.buttonAction;
    
    if(action == "toggle-favorite"){
        const cardId = e.target.closest(".favorite-item").dataset.id;
        const card = document.getElementById("containerCards").querySelector(`#${cardId}`);

        favoriteManager(card, cardId);
    };
});