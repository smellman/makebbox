var init = function() {
    var map = L.map('map').setView([35.6828, 139.7616], 8);
    var openstreetmap_tile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var opencyclemap_tile = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles courtesy of <a href="http://www.thunderforest.com/">Andy Allan</a>'
    });
    var gsi_std_tile = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
        attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
    });
    var gsi_pale_tile = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
    });
    var gsi_blank_tile = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png', {
        attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
    });
    var gsi_relief_tile = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png', {
        attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",
        maxZoom: 15,
        minZoom: 5
    });

    var baseMaps = {
        "OpenStreetMap": openstreetmap_tile,
        "OpenCycleMap": opencyclemap_tile,
        "国土地理院 標準地図": gsi_std_tile,
        "国土地理院 淡色地図": gsi_pale_tile,
        "国土地理院 白地図": gsi_blank_tile,
        "国土地理院 色別標高図": gsi_relief_tile
    };
        
    L.control.layers(baseMaps, {}).addTo(map);
                                        
    
    
    var hash = new L.Hash(map);

    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var extentLayer;
    var options = {
      style: {
        color: '#F06F64',
        weight: 2,
        opacity: 1,
        fillColor: '#F06F64',
        fillOpacity: 0.1
      }
    };
    
    var drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
            polyline: false,
            polygon: false,
            circle: false,
            marker: false,
            rectangle: {
                shapeOptions: options.style,
                title: 'Draw rectangle'
            }
        }
      });
    map.addControl(drawControl);

    map.on('draw:rectangle-created', function (e) {
    });

    map.on('draw:created', function (e) {
        if (extentLayer) {
            map.removeLayer(extentLayer);
        }
        extentLayer = e.layer;
        map.addLayer(extentLayer);
        $('#bbox_query').text(extentLayer.getBounds().toBBoxString());
        // ST_MakeEnvelope($long_min, $lat_min, $long_max, $lat_max, 4326);
        $('#postgis_query').text("ST_MakeEnvelope(" + extentLayer.getBounds().toBBoxString() + ",4326)");
        $('#phyghtmap_query').text(extentLayer.getBounds().toBBoxString().split(",").join(":"));
    });
};
