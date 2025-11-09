import {getDataChart} from "./chart.js"

export const env = {
    cacheCoins: new Map,
    cacheCharts: new Map(),
    monoChart: null,
    comparativeChart: null,
    currentId: null

}

export async function cacheChartManager(id, isMultiChart){
  try {
    let data = null;

    if (!env.cacheCharts.has(id)) {
      data = await getDataChart(id);

      if (!data) throw new Error("Error al obtener datos.")
      env.cacheCharts.set(id, data);

      if (env.monoChart && !isMultiChart) env.monoChart.destroy();
      else if (isMultiChart && env.comparativeChart) env.comparativeChart.destroy();
    }
    else {

      if (env.currentId === id) return null;

      data = env.cacheCharts.get(id);

      if (!isMultiChart && env.monoChart !== null) env.monoChart.destroy();
      else if (isMultiChart) env.comparativeChart.destroy();
    };

    env.currentId = id;
    return data;
  }
  catch (err){
    if(isMultiChart && env.multiChart !== null) env.multiChart.destroy();
    else if (env.monoChart !== null)env.monoChart.destroy();
    throw err
  }; 
};