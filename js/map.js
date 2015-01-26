var init = function() {
    var map = L.map('map').setView([35.6828, 139.7616], 8);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
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
        console.log(extentLayer.getBounds().toBBoxString());
        $('#bbox_query').text(extentLayer.getBounds().toBBoxString());
        // ST_MakeEnvelope($long_min, $lat_min, $long_max, $lat_max, 4326);
        $('#postgis_query').text("ST_MakeEnvelope(" + extentLayer.getBounds().toBBoxString() + ",4326)");
    });
};
