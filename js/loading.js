export function skeletonCard(){
    const template =`
    <article class="card card__skeleton">
            <div class="card__skeleton-img"></div>
            <div class="card__skeleton-title"></div>
            <div class="card__skeleton-price"></div>
            <div class="card__skeleton-favorite-icon"></div>
            <div class="card__skeleton-percentage"></div>
            <div class="modal__button card__skeleton-button"></div>
    </article>`;

    let htmlCards = document.createElement("div");
    htmlCards.classList.add("cards","container__skeleton-cards");
    htmlCards.innerHTML = template.repeat(20);
    
    return htmlCards
};

export function loadingChart(){
    const loadingElement = document.getElementById("loading");
    loadingElement.classList.toggle("modal__loading--show");
};

export const removeLoading =()=> document.getElementById("loading").classList.remove("modal__loading--show");
export const addLoading =()=> document.getElementById("loading").classList.add("modal__loading--show");
