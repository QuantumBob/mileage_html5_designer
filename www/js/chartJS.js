/*jshint browser:true*/
/*global $, Chart, console, chartDataArray*/

/*
The chartJS interface will always have a div surrounding the canvas element of the chart.
The div will always have a data-uib="media/chartjs", a data-chart-type set to a type of chart and
a data-chart-data set to the function to retreive the data from the database
*/
// initialize all charts on this page
function initCharts() {

    var chartArray = findCharts();
    chartArray.forEach(function(chartObject){
        createChartCanvas(chartObject);
    });
}
// find all charts on a page
function findCharts() {

    var charts = [];
    var chartQuery = document.querySelectorAll('[data-uib="media/chartjs"]');

    for(var i = 0; i < chartQuery.length; i++) {

        var chartData = {
            chartDOMNode: null,
            chartType: null,
            chartData: null,
            id: null,
            chartRef: null
        };

        var elem = chartQuery[i];
        chartData.chartDOMNode = elem;
        chartData.chartType = elem.getAttribute('data-chart-type');
        chartData.chartData = elem.getAttribute('data-chart-data');
        chartData.id = elem.getAttribute('id');
        charts.push(chartData);
    }
    return charts;
}
//  createa the chart from the data sent
function createChart(chartToUpdate, chartData){

    var chartContext = document.getElementById('canvas-' +  chartToUpdate.id);

    var c = new Chart(chartContext, {
        type: chartToUpdate.chartType.toLowerCase(),
        data: chartData
        });
    chartToUpdate.chartRef = c;
}
// creates chart canvas and calls data retreival function
function createChartCanvas(chartObject) {

    /*An asynchronous callback is not synchronous, regardless of how much you want it to be.
    Just move all the code the depends on the result into the callback*/

    var canvas = document.createElement('canvas');
    canvas.id = 'canvas-' +  chartObject.id;
    document.getElementById(chartObject.id).appendChild(canvas);

    // create click event handler for chart
    $(canvas).on("click", function(evt){
        window.onChartClicked(evt);
    });
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
}
// find a chartObject from its id
function findChart(elem){

    var chart = null;

    if(elem.is("canvas")){
        var canvasId =$(elem).attr('id');

        canvasId = canvasId.replace("canvas-", "");

        chart = chartDataArray.find(function(chartObject){
            if (chartObject.id === canvasId)
                return chartObject.chartRef;
        });
    }
    return chart;
}
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
