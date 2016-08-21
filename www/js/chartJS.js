/*jshint browser:true*/
/*global $, Chart, console, chartDataArray*/

(function(){
    'use strict';

    //window.chartJSChart = {};
    window.chartDataArray = [];
    //To re-size the chart according to screen size of windows
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;
    // find and initialize all charts on page
    function initCharts() {

        var chartArray = findCharts();
        chartArray.forEach(function(chart){
            //createChart(chart);
            collectChartInfo(chart);
        });
    }
    // when app is ready call 'initCharts'
    document.addEventListener('app.Ready', initCharts, false);
    // find all charts on current page
    function findCharts() {

        var charts = [];
        var chartQuery = document.querySelectorAll('[data-uib="media/chartjs"]');

        for(var i = 0; i < chartQuery.length; i++) {

            var chartsData = {
                chartDOMNode: null,
                chartType: null,
                chartData: null,
                id: null,
                ref: null
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
// creates chart from sent info
    function createChart(chartObject, chartContext) {

        /*An asynchronous callback is not synchronous, regardless of how much you want it to be.
        Just move all the code the depends on the result into the callback*/

            var c = null;
            if(chartObject.chartType.toLowerCase() == "line"){

                c = new Chart(chartContext, {
                    type: 'line',
                    data: window.internalData
                });
                if (c)
                    chartDataArray.push({id: chartObject.id, chartInst: c});

            }else if(chartObject.chartType.toLowerCase() == "bar"){

                c = new Chart(chartContext, {
                    type: 'bar',
                    data: window.internalData
                });
                if (c)
                    console.log('internalData in chartJS: ' + window.internalData.datasets[0].label);
                    chartDataArray.push({id: chartObject.id, chartInst: c});

            }else{

                c = new Chart(chartContext, {
                    type: 'pie',
                    data: window.internalData
                });
                if (c)
                    chartDataArray.push({id: chartObject.id, chartInst: c});
            }
            console.log("End of createChart");

    }//end createChart
//collects the chart info
function collectChartInfo(chartObject){
    try{
            var canvas = document.createElement('canvas');
            canvas.id = 'canvas_' +  chartObject.id;
            document.getElementById(chartObject.id).appendChild(canvas);

            var canvasParent = canvas.parentElement;
            canvas.width = canvasParent.offsetWidth;
            canvas.height = canvasParent.offsetHeight;

            var chartContext = document.getElementById(canvas.id);

        var dataFunction = function(function_as_string){

                function_as_string(createChart, chartObject, chartContext);
            };
            dataFunction(window[chartObject.chartData]);
         }// end try
        catch(err){
            (function() {
                console.log("Error in collectChartInfo: " + err);
            })();
        }// end catch
}


})();
