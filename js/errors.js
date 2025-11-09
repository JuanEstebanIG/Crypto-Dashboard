const evn ={
    containerErrorCards: document.getElementById("containerError")
};

function deleteErroCard(card){
    setTimeout(()=>{
        card.remove()
    }, 5000);
};

function createErrorCard(data){
    const errorCard = document.createElement("div");
    errorCard.innerText = data
    errorCard.classList.add("errors__card")
    deleteErroCard(errorCard);
    return errorCard
};

export function renderError(data){
    if(data == null) return;
    const errorCard = createErrorCard(data);
    evn.containerErrorCards.appendChild(errorCard);
};