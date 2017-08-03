'use strict';

angular.module('core').controller('LiveTripsController', ['$scope', 'Authentication','$window','leafletMarkerEvents','$timeout','leafletData',
  function ($scope, Authentication,$window,leafletMarkerEvents,$timeout,leafletData) {

  	try{


    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.trp_height = $(window).height() - 60;
    //console.log($scope.trp_height);

    $scope.currpg = 'live';
    //console.log($scope.currpg);

    $scope.tips = {
    	'search':'Usage : Type "vno:<vehicle no>" to search vehicle.  Type "loc:<Area/location/address>"     Click on search vehicle to get more info. '
    };

    $scope.trips = [{
	"id": "",
	"name": "Delivery Route 1",
	"type": "Delivery",
	"vehicle_type": "truck",
	"schedule_date": "05/07/2017",
	"schedule_starttime": "08:00 AM",
	"total_trip_duration": "2 Hours 10 mins",
	"from": "Warehouse 1",
	"to": "Customer Delivery ",
	"trip_markers": [ {
					'lat' : 12.839146787783736,
					'lng' : 77.65930116176605,
					'type' : 'start'
				 	},{
					'lat' : 12.849188754600055,
					'lng' : 77.6578152179718,
					'type' : 'end'
				 	}

	],
	"trip_geojson": {
		"data": {

			"type": "FeatureCollection",
			"features": [
				{
					"type": "Feature",
					"properties": {},
					"geometry": {
						"type": "LineString",
						"coordinates": [
							[
								77.65930116176605,
								12.839146787783736
							],
							[
								77.65966057777405,
								12.839502447628892
							],
							[
								77.65976786613464,
								12.840083008942116
							],
							[
								77.65993416309357,
								12.840543272814138
							],
							[
								77.66014337539673,
								12.841270278804153
							],
							[
								77.66023993492125,
								12.84144810728739
							],
							[
								77.66043305397034,
								12.842054815283307
							],
							[
								77.66023993492125,
								12.84408413828247
							],
							[
								77.66011118888855,
								12.84510925397995
							],
							[
								77.65931725502014,
								12.845130174664925
							],
							[
								77.6581048965454,
								12.847797547729447
							],
							[
								77.65791177749634,
								12.848153195331669
							],
							[
								77.6578152179718,
								12.849188754600055
							]
						]
					}
				}
			]
		}


	}

}];

    for (var i = 0; i < 100; i++){
    	//console.log(i);
    	$scope.trips.push({ 'id':'',
    				  'name' :'Delivery Route ' + i,
    				  'type':'Delivery',
    				  'vehicle_type': 'truck',
    				  'schedule_date':'05/07/2017',
    				   'schedule_starttime' : '08:00 AM',
    				  'total_trip_duration' : '2 Hours 10 mins',
    				  'from' : 'Warehouse 1',
    				  'to' : 'Customer Delivery '

    				})
    }

    $scope.trips[1].trip_geojson = {
    	                         "data" : {
								"type": "FeatureCollection",
								"features": [


									{
										"type": "Feature",
										"properties": {},
										"geometry": {
											"type": "LineString",
											"coordinates": [
												[
													77.66791105270386,
													12.85140630150165
												],
												[
													77.66531467437744,
													12.854837184540013
												],
												[
													77.66254663467407,
													12.858330779458207
												],
												[
													77.65617370605469,
													12.866301014575686
												],
												[
													77.65113115310669,
													12.872743959180506
												],
												[
													77.64984369277954,
													12.874250078201927
												],
												[
													77.64748334884644,
													12.87678117450866
												],
												[
													77.6464319229126,
													12.878601037875281
												],
												[
													77.64126062393188,
													12.886905304080786
												],
												[
													77.64020919799805,
													12.88874601094947
												],
												[
													77.63583183288574,
													12.89583678933563
												],
												[
													77.6352310180664,
													12.896757111624797
												],
												[
													77.63179779052733,
													12.902383553826432
												],
												[
													77.62954473495483,
													12.906043810730615
												],
												[
													77.62420177459717,
													12.914849123534434
												],
												[
													77.62212038040161,
													12.918174564760655
												],
												[
													77.62073636054993,
													12.920276471759344
												],
												[
													77.62081682682037,
													12.920302614769843
												],
												[
													77.62180924415588,
													12.919016375408363
												],
												[
													77.62214183807373,
													12.918561484292661
												],
												[
													77.62197017669678,
													12.91823207986414
												],
												[
													77.62139081954956,
													12.917949732865413
												],
												[
													77.62166976928711,
													12.91696674452846
												],
												[
													77.61813461780548,
													12.91622950073752
												],
												[
													77.61344075202942,
													12.916496163636445
												],
												[
													77.61242687702179,
													12.916527535723489
												],
												[
													77.60983049869537,
													12.916522307042593
												],
												[
													77.6066118478775,
													12.916600737244613
												],
												[
													77.60056614875793,
													12.916637337997122
												],
												[
													77.60015308856963,
													12.916647795354002
												],
												[
													77.6000913977623,
													12.916660867049481
												],
												[
													77.60007798671722,
													12.91684648505148
												],
												[
													77.59984195232391,
													12.916838642040101
												],
												[
													77.5998929142952,
													12.917774572992828
												],
												[
													77.59995192289351,
													12.918545798377336
												],
												[
													77.60001361370087,
													12.918773244053025
												],
												[
													77.60006457567215,
													12.919764068200996
												],
												[
													77.60015040636063,
													12.921228075578675
												],
												[
													77.60019332170485,
													12.922307775521197
												],
												[
													77.60019063949585,
													12.920537901741268
												],
												[
													77.5992465019226,
													12.920569273320709
												],
												[
													77.59698271751404,
													12.920579730512976
												],
												[
													77.59696125984192,
													12.92126990423479
												],
												[
													77.59698271751404,
													12.922639788850777
												],
												[
													77.59698271751404,
													12.923706411363435
												],
												[
													77.59705781936646,
													12.924312920171948
												]
											]
										}
									}
								]
							}

    							};

    			$scope.trips[1].trip_markers = [ {
							'lat' : 12.85140630150165,
							'lng' : 77.66791105270386,
							'type' : 'start'
						 	},{
							'lat' : 12.924312920171948,
							'lng' : 77.59705781936646,
							'type' : 'end'
						 	}
				 		];

                $scope.center = {
                 autoDiscover: true
                };

                $scope.layers = {
									"baselayers": {
										"googleTerrain": {
											"name": "Google Terrain",
											"layerType": "TERRAIN",
											"type": "google"
										},
										"googleHybrid": {
											"name": "Google Hybrid",
											"layerType": "HYBRID",
											"type": "google"
										},
										"googleRoadmap": {
											"name": "Google Streets",
											"layerType": "ROADMAP",
											"type": "google"
										}
									}
								};

            
            $scope.drawroute = function(trp){
            	//console.log('clicked');
            	$scope.geojson = trp.trip_geojson;
            	$scope.geojson.style = {
                    weight: 5,
                    opacity: 1,
                    color: 'green',
                    fillOpacity: 0.7
                };
            	$scope.ctrip = trp;
            	var cords = findGeoPoints(trp);
            	//console.log(cords);
            	var ctr = getLatLngCenter(cords);
            	$scope.center = {'lng': ctr[0], 'lat': ctr[1], 'zoom':14};
            	//console.log($scope.center);

            	$scope.markers = findMarkers(trp);

            	//http://localhost:3000/modules/core/img/car1.png

            }


function findGeoPoints(trp){ 
	var gpoints = []; 
	for(var i=0; i<trp.trip_geojson.data.features.length; i++){
		if(trp.trip_geojson.data.features[i].geometry.type == 'Polygon' || trp.trip_geojson.data.features[i].geometry.type == 'LineString'){

			for( var x = 0 ; x < trp.trip_geojson.data.features[i].geometry.coordinates.length; x++){
				gpoints.push(trp.trip_geojson.data.features[i].geometry.coordinates[x]);	
			}
			
		}
	}
	return gpoints;
}

function findMarkers(trp){ 
	var markers = {}; 
	for(var i=0; i<trp.trip_markers.length; i++){
		
		if(trp.trip_markers[i].type == 'start'){
			markers['m'+i] = {'lat':trp.trip_markers[i].lat,'lng':trp.trip_markers[i].lng};	
			markers['m'+i].message = 'Trip Start :' + trp.schedule_starttime;
			markers['m'+i].focus = true;
			markers['m'+i].iconAngle = 0;
			markers['m'+i].icon = {'iconUrl':'modules/core/img/car.png', 'iconSize':  [50, 50]};
			markers['m'+i].mvcoords = findGeoPoints(trp);
			markers['m'+i].movedelay = 2000;
			markers['m'+i].label = { 'message' : 'Click me to Simluate',
				                            'options': {
				                                'noHide': true
				                            }
				                        };
		} /*else if(trp.trip_markers[i].type == 'end'){
			markers['m'+i].message = 'End';
		}*/
		
		console.log(markers);

	}
	return markers;
}


 $scope.replay = {'duration':500,'curr_state':'stop','icon':'play_arrow'};	


   var playCntr = 0;         
   $scope.moveMark = function(replay){
   		if(replay.curr_state == 'stop'){
   			replay.curr_state = 'running';
   			replay.icon = 'stop';
   			$scope.autoMove(replay);
   				
   		}else if(replay.curr_state == 'running'){
   			replay.curr_state = 'stop';
   			replay.icon = 'play_arrow';
   			playCntr = 0;
   		}
   		
       	
       };

$scope.autoMove = function(replay){
	if(replay.curr_state == 'running'){
		$timeout(function(){
					$scope.markers.m0.lat = $scope.markers.m0.mvcoords[playCntr][1];
					$scope.markers.m0.lng =  $scope.markers.m0.mvcoords[playCntr][0];
					 playCntr++;
					if(playCntr<$scope.markers.m0.mvcoords.length)
					{
						$scope.autoMove(replay);
						console.log('calling ' + $scope.markers.m0.lat + $scope.markers.m0.lng);
					}else if(playCntr == $scope.markers.m0.mvcoords.length){
						replay.icon = 'play_arrow';
						replay.curr_state = 'stop';
						playCntr = 0;
					}

					},replay.duration);
	}
};


$scope.rotateMarker = function(marker){
	for(var x = 0 ; x < 360; x ++){
	//for(var i = 0 ; i<markers.length;i++){
		
		 $timeout(function () {
        marker.iconAngle = x;     
        }, 1000);

	//}	
	}
	
} 

function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }

/**
 * @param latLngInDeg array of arrays with latitude and longtitude
 *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
 *   [longtitude2] ...]
 *
 * @return array with the center latitude longtitude pairs in 
 *   degrees.
 */
function getLatLngCenter(latLngInDegr) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i=0; i<latLngInDegr.length; i++) {
        var lat = degr2rad(latLngInDegr[i][LATIDX]);
        var lng = degr2rad(latLngInDegr[i][LNGIDX]);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    return ([rad2degr(lat), rad2degr(lng)]);
}


		

		var vehicle_markers = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6129150390625,
          12.911962855650449
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.61789321899414,
          12.917568041044994
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63025283813477,
          12.913636058484865
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6392650604248,
          12.910038658542735
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63008117675781,
          12.910373302582068
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62381553649902,
          12.919241206343573
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62269973754883,
          12.923758696663581
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.607421875,
          12.920830702996128
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6227855682373,
          12.90660853131093
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62184143066406,
          12.90041745086063
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63059616088867,
          12.900668443589067
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.61900901794434,
          12.899748135686973
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62235641479492,
          12.896736195246726
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.64063835144043,
          12.902425385636512
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63651847839355,
          12.904433304292924
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63093948364258,
          12.907947123147105
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.61420249938965,
          12.915225590800675
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.61368751525879,
          12.919743153747707
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.61128425598145,
          12.919492180171718
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62563943862915,
          12.910394217819656
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6248025894165,
          12.908386347031712
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62915849685668,
          12.911105334856154
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63053178787231,
          12.911858280101354
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62887954711914,
          12.909390284441628
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63368606567383,
          12.912381157409275
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63435125350952,
          12.913740633290054
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63400793075562,
          12.91457723015606
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6324200630188,
          12.915685716689115
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63486623764038,
          12.916543221765542
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62958765029907,
          12.916605965923868
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62864351272583,
          12.915413824221092
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62765645980835,
          12.914472655700974
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6278281211853,
          12.91438899610541
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62791395187378,
          12.91422167683024
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.62739896774292,
          12.915121016616954
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.63115406036376,
          12.907779799559522
        ]
      }
    }
  ]
};
		$scope.live_markers_size = 0;
		$scope.live_markers = findMarks(vehicle_markers);
	



function findMarks(geojson){ 
	var vpoints = {}; 
	$scope.live_markers_size = geojson.features.length;
	for(var i=0; i<geojson.features.length; i++){
		if(geojson.features[i].geometry.type == 'Point'){

			//for( var x = 0 ; x < geojson.features[i].geometry.coordinates.length; x++){
				//gpoints.push(trp.trip_geojson.data.features[i].geometry.coordinates[x]);	
				vpoints['v'+i] = new Object();
				vpoints['v'+i].lat = geojson.features[i].geometry.coordinates[1];
				vpoints['v'+i].lng = geojson.features[i].geometry.coordinates[0];
				vpoints['v'+i].group = 'fleet1';
				vpoints['v'+i].icon = {'iconUrl':'modules/core/img/car.png', 'iconSize':  [50, 50]};
				vpoints['v'+i].message = 'Vehicle No  : KA04MA12'+i ;
				//vpoints['v'+i].focus= true;
				vpoints['v'+i].id='KA04MA12'+i;
				vpoints['v'+i].iconAngle= 10+(i*10);

			//}
			
		}
	}
	return vpoints;
};

$scope.search = "";

$scope.$watch('search', function() { 

	$scope.markerpop="";

	if($scope.search!= undefined){

		var sr_str = $scope.search.substring(0, $scope.search.indexOf(':'));
	
	// check vehicle no 
	if(sr_str == 'vno' ){

		for( var i=0; i < $scope.live_markers_size; i++){
		if(checkExists($scope.live_markers["v"+i].id,$scope.search.substring($scope.search.indexOf(':')+1,$scope.search.length))){
			console.log("Got it " + $scope.search);
			$scope.live_markers["v"+i].focus = true;

			$scope.center = { lat: $scope.live_markers["v"+i].lat,
                    lng: $scope.live_markers["v"+i].lng,
                    zoom: 18};
		}
	}

	}
	}
	

	


 }, true);

function checkExists(val1, val2){
	if(val1 != undefined && val2 != undefined && val1.indexOf(val2)>0){
		return true;
	} else return false;
}

}catch(e){
  		
	console.log('Error ' + e);

}

$scope.openModal = false;
 $scope.live_events = {
                markers: {
                    enable: leafletMarkerEvents.getAvailableEvents(),
                }
            };




 var markerEvents = leafletMarkerEvents.getAvailableEvents();
            for (var k in markerEvents){
                var eventName = 'leafletDirectiveMarker.map_live.' + markerEvents[k];
                //console.log(eventName);
                $scope.$on(eventName, function(event, args){
                    //$scope.eventDetected = event.name;
                    
                    if(event.name == 'leafletDirectiveMarker.map_live.click'){
                    			//for(var mv = 0 ; mv < $scope.markers.m0.mvcoords.length ; mv ++)
					 	//console.log(args.modelName);
					 	//console.log($scope.live_markers[args.modelName]);
                    //console.log(args);       	
                    
					  
                   		$scope.markerpop = 'visible';
                    	
                    	$scope.selv = {data: $scope.live_markers[args.modelName].message };
                    }
                });
            }


  }
]);
