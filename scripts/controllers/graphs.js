'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontApp
 */
var app = angular.module('frontApp', []);
app.controller('graphCtrl', function ($scope, $http) {
	document.getElementById('graph').onclick = function() {
		$http({
	        method: 'GET',
	        url: 'http://localhost:3000/graphs/totalIncidents'
	    }).then(function successCallback(response) {
	    	var total = [];
	    	var crit = [];
	    	var high = [];
	    	var low = [];
	    	var med = [];
	    	var inf = [];
	    	var dates = [];
	    	var a;
	    	var b;
	        console.log(response);

	        for(a = 0 ; a <response.data.message.length; a++){
	        	total.push(response.data.message[a].total);
	        	crit.push(response.data.message[a].critical);
	        	high.push(response.data.message[a].high);
	        	low.push(response.data.message[a].low);
	        	med.push(response.data.message[a].med);
	        	inf.push(response.data.message[a].info);
	        }

	        for(b = 0 ; b <response.data.dates.length ; b++){
	        	var date = new Date(response.data.dates[b]*1000);
				var year = date.getFullYear(),
				month = ('0' + (date.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
				day = ('0' + date.getDate()).slice(-2);	
				dates.push(month + '-' + day + '-' + year);
	        }

	        // console.log(total);
	        // console.log(crit);
	        // console.log(high);
	        // console.log(med);
	        // console.log(low);
	        // console.log(inf);

	        // var datesFinal = eval(dates);
	      //   var critFinal = eval(crit);
	        // var highFinal = eval(high);
	        // var medFinal = eval(med);
	        // var lowFinal = eval(low);
	        // var infFinal = eval(inf);
	      //  console.log(dates);
	     // var parsed = JSON.parse(crit);
	         $(function () {
			    $('#totalGraph').highcharts({
			        chart: {
			            type: 'line',
			        },
			        title: {
			            text: 'Incident graph',
			        },
			        xAxis: {
			        	type: 'category',
			            data: dates,		            
			        },
			        yAxis: {
			            title: {
			                text: 'Number of incidents',
			            }
			        },
			        series: [{
			            name: 'Critical',
			            data: crit
			        }, {
			            name: 'High',
			            data: high
			        }, {
			            name: 'Medium',
			            data: med
			        },{
			            name: 'Low',
			            data: low
			        },{
			            name: 'Informational',
			            data: inf
			        }]

			    });
			});
	        

	    }, function errorCallback(response) {
	        console.log('Connection error: '+JSON.parse(response));
	    });
	};
    
});
