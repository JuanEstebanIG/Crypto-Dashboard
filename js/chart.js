import { getTimeLapse } from "./api.js";
import { env , cacheChartManager } from "./cacheManagement.js";

function formatteData(data){
  const pricesCoin = data.prices;
  const valuesClose = {};
  
  pricesCoin.forEach(([ts,price]) => {
    const time = new Date(ts).toLocaleDateString("es-Es",{ month: "long", day:"numeric"});
    valuesClose[time] = price;
  });
  return {price: valuesClose};
};
/** 
 * @description Obtiene y trata los datos de los ultimos treinta días de la moneda indicada.
 * @async
 * @param {string} id - identificador de la moneda usado para la peticion HTTP 
 * @returns {object} - Objeto con los datos tratados.
 * @property {Array<string>} dates - fechas de los ultimos treitea días.
 * @property {Array<number>} prices - precio de cierre de los ultimos treinta.
 * @property {number} minPrice - precio de cierre mas bajo de los ultimos treinta.
 * @throws {Error} Si la petición HTTP falla o los datos no son válidos.
 */
 export async function getDataChart(id) {
  let data = await getTimeLapse(id);
  if (!data) throw new Error("Datos corruptos o inexistentes");

  data = formatteData(data);

  const dates = [];
  const prices = [];
  let minPrice = Number.POSITIVE_INFINITY;

  Object.entries(data.price).forEach(([date, price]) => {
    prices.push(Number(price.toFixed(2)));
    dates.push(date);
    minPrice = Math.min(minPrice, price);
  });

  return { dates, prices, minPrice }
}

/**
 * @description - Crea un grafico con los datos de la criptomoneda indicada segun su id.
 * @async
 * @param {string} id - identificador de la criptomoneda en el servidor de coinGeko.
 * @param {string} name - Nombre de la criptoMoneda.
 * @throws {Error} - Si el feching falla o los datos son corruptos o inexistentes.
 * @returns {HTMLDivElement} containerCanvas -  Retorna un elemento div como contenedor del canvas del grafico.
 */

export async function createChart(id, name) {
  const canvas = document.getElementById("modalCanvas");
  try {
    
    let data = await cacheChartManager(id);
    if (!data) return null

    const dataChart= {
        labels: data.dates,
        datasets: [{
          label: `Precio de cierre de ${name} los ultimos 30 dias.`,
          data: data.prices,
          borderWidth: 1,
          borderColor: "#0071b3ff",
          pointBackgroundColor: "#FFF",
          fill: true,
          backgroundColor: "#c2009218"
        }]
      };

      const optionsChart ={
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              callback: (val) => val.toLocaleString("en-us") + "  USD"
            },
            min: (data.minPrice <= 1 ? 0 : data.minPrice * 0.97)
          }
        },
      };

    env.monoChart = new Chart(canvas, {
      type: 'line',
      data: dataChart,
      options:optionsChart
    }
    );

    return canvas;

  } catch (err) {
    console.error("Error of create chart", err);
    throw err
  };
};

/**
 * @description - Crea un grafico comparativo entre dos monedas.
 * @async
 * @param {HTMLCanvasElement} canvas - CANVAS elemento HTML en el cual se dibujara el grafico.
 * @param {String} firstId - fisrtId  ID perteneciente a la primer moneda seleccionda.
 * @param {String} secondId - secondId  ID perteneciente a la segunda moneda seleccionda.
 * @param {String} nameFirst - nameFirst nombre de la primer moneda.
 * @param {String} nameSecond - nameSecond nombre de la segunda moneda.
 * @throw En caso de que alguno de los parametros no esten definidos o la peticion HTTp falle.
 */

export async function createComparativeChart(canvas, firstId, secondId, nameFirst, nameSecond) {

  try {
    const dataFirst = await cacheChartManager(firstId, true);
    const dataSecound = await cacheChartManager(secondId, true);

    if (!dataFirst || !dataSecound) return null

    const minPrice = Math.min(dataFirst.minPrice, dataSecound.minPrice);

    const dataChart = {
      labels: dataFirst.dates,
      datasets: [{
        label: `Precio de cierre de ${nameFirst} los ultimos 30 dias.`,
        data: dataFirst.prices,
        borderWidth: 1,
        borderColor: "#0071b3ff",
        pointBackgroundColor: "#FFF",
        fill: true,
        backgroundColor: "#c2009218"
      }, {
        label: `Precio de cierre de ${nameSecond} los ultimos 30 dias.`,
        data: dataSecound.prices,
        borderWidth: 1,
        borderColor: "#b30000ff",
        pointBackgroundColor: "#FFF",
        fill: true,
        backgroundColor: "#0074c218"
      }
      ]
    };

    const optionsChart = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            callback: (val) => val.toLocaleString("en-us") + "  USD"
          },
          min: (minPrice <= 1 ? 0 : minPrice * 0.97)
        }
      }

    };

    env.comparativeChart = new Chart(canvas, {
      type: "line",
      data: dataChart,
      options: optionsChart
    });

  }catch(err){
    console.error("error at create chart", err);
  }
};