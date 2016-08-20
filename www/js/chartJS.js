/*jshint browser:true*/
/*global $, Chart, console, chartDataArray*/

(function(){
    'use strict';

    //window.chartJSChart = {};
    window.chartDataArray = [];

    //To re-size the chart according to screen size of windows
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;

    function initCharts() {

        var chartArray = findCharts();
        initalizeCharts(chartArray);
    }
    document.addEventListener('app.Ready', initCharts, false);

    function findCharts() {

        //var charts = [];
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
            //charts.push(chartsData);
            chartDataArray.push(chartsData);
        }

        //return charts;
    }

    function initalizeCharts(chartArray) {

        //chartArray.forEach(function(chart){
        chartDataArray.forEach(function(chart){
            createChart(chart);
        });
    }

    function createChart(chartObject) {

        try{
            var dataFunction = function(function_as_string){
                function_as_string();
            };
            dataFunction(window[chartObject.chartData]);

            var canvas = document.createElement('canvas');
            canvas.id = 'canvas_' +  chartObject.id;
            document.getElementById(chartObject.id).appendChild(canvas);

            var canvasParent = canvas.parentElement;
            canvas.width = canvasParent.offsetWidth;
            canvas.height = canvasParent.offsetHeight;

            var chartContext = document.getElementById(canvas.id);

            var c = null;
            if(chartObject.chartType.toLowerCase() == "line"){

                c = new Chart(chartContext, {
                    type: 'line',
                    data: chartObject.chartData,
                });
                if (c)
                    chartDataArray.push({id:chartObject.id, chartInst:c});

            }else if(chartObject.chartType.toLowerCase() == "bar"){

                c = new Chart(chartContext, {
                    type: 'bar',
                    data: window.internalData,
                });
                if (c)
                    chartDataArray.push({id:chartObject.id, chartInst:c});

            }else{

                c = new Chart(chartContext, {
                    type: 'pie',
                    data: chartObject.chartData,
                });
                if (c)
                    chartDataArray.push({id:chartObject.id, chartInst:c});
            }
        }// end try
        catch(err){
            (function() {
                console.log("Error in createChart: " + err);
            })();
        }// end catch
    }//end createChart
})();
