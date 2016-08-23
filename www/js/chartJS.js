/*jshint browser:true*/
/*global $, Chart, console, chartDataArray*/

/*
The chartJS interface will always have a div surrounding the canvas element of the chart.
The div will always have a data-uib="media/chartjs", a data-chart-type set to a type of chart and
a data-chart-data set to the function to retreive the data from the database
*/

function initCharts() {

    var chartArray = findCharts();
    chartArray.forEach(function(chartObject){
        createChartCanvas(chartObject);
    });
}
function findCharts() {

    var charts = [];
    var chartQuery = document.querySelectorAll('[data-uib="media/chartjs"]');

    for(var i = 0; i < chartQuery.length; i++) {

        var chartsData = {
            chartDOMNode: null,
            chartType: null,
            chartData: null,
            id: null,
            chartRef: null
        };

        var elem = chartQuery[i];
        chartsData.chartDOMNode = elem;
        chartsData.chartType = elem.getAttribute('data-chart-type');
        chartsData.chartData = elem.getAttribute('data-chart-data');
        chartsData.id = elem.getAttribute('id');
        charts.push(chartsData);
    }
    return charts;
}
function createChart(chartToUpdate, chartData){

    var chartContext = document.getElementById('canvas_' +  chartToUpdate.id);

    var c = new Chart(chartContext, {
        type: chartToUpdate.chartType.toLowerCase(),
        data: chartData
        });
    chartToUpdate.chartRef = c;
}
// creates chart from sent info
function createChartCanvas(chartObject) {

    /*An asynchronous callback is not synchronous, regardless of how much you want it to be.
    Just move all the code the depends on the result into the callback*/

    var canvas = document.createElement('canvas');
    canvas.id = 'canvas_' +  chartObject.id;
    document.getElementById(chartObject.id).appendChild(canvas);

    var canvasParent = canvas.parentElement;
    canvas.width = canvasParent.offsetWidth;
    canvas.height = canvasParent.offsetHeight;

    if(chartObject.chartType.toLowerCase() == "line"){
        chartDataArray.push(chartObject);

    }else if(chartObject.chartType.toLowerCase() == "bar"){
        chartDataArray.push(chartObject);

    }else{
        chartDataArray.push(chartObject);
    }

    var dataFunction = function(function_as_string){
        function_as_string(chartDataArray[chartDataArray.length -1]);
    };
    dataFunction(window[chartObject.chartData]);

}//end createChartCanvas
(function(){
    'use strict';

    //window.chartJSChart = {};
    window.chartDataArray = [];
    //To re-size the chart according to screen size of windows
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;
    // find and initialize all charts on page

    // when app is ready call 'initCharts'
    document.addEventListener('app.Ready', initCharts, false);
    // find all charts on current page

})();
