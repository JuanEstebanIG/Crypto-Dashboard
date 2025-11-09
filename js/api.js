import { renderError } from "./errors.js";
/**
 * Realiza una peticion HTTP a la api de CoinGeko.
 * @async
 * @param {String} url url de la api a la cual se hara la petición.
 * @param {String} errorMessage Mensaje de error que se mostrará al usuario en caso de fallo.
 * @throws {Error} si la petición falla o los datos no son validos.
 * @returns {Promise<Object>} Promesa que resuelve con los datos JSON.
 */

async function FetchApi(url, errorMessage){
    try{
        let res = await fetch(url);
        if(!res.ok) throw new Error("Error feching data");
        return await res.json();   
    }
    catch(err){
        renderError(errorMessage);
        console.error(err);
        return null;
    };
};

/**
 * @async
 * @throws {Error} - Si los datos son corruptos o inexistentes.
 * @returns {Promise<Object>} topStats - JSON que contiene las monedas con mas calipalización.
 */

export async function getTopStats(){
    const topCoins = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1";
    const errorMessage = "Error en el servidor, por favor reinicie la pagina.";
    const topStats = await FetchApi(topCoins,errorMessage);

    if(!topStats) throw new Error("Datos corruptos o inexistentes")
    return topStats;
};

/** Obtiene el precio de cierre de los ultimos treinta días
 * @async
 * @param {String} id - id que se utilizará para la petición HTTP al api.
 * @returns {Promise<Object>} - Objeto con los datos devueltos por la APi.
 * @property {Array} price - Array con los valores de precio y time stap de las doce horas del dia de los ultimos treinta días.
*/

export async function getTimeLapse(id) {
    const coinMonthlyPerformance = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`;
    
    const res = await FetchApi(coinMonthlyPerformance);
    if(!res || !res.prices || res.status === 429){
        return null;
    };

    console.log(res)
    return res;
};
