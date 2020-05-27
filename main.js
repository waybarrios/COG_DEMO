import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import proj from 'ol/proj';
import Attribution from 'ol/'
import sync from 'ol-hashed';
import hashed from 'hashed';
import { getJSON } from 'jquery';
import validUrl from 'valid-url';


var labels = new TileLayer({
  title: 'Labels',
  source: new XYZ({

    url: 'https://{1-4}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png',
  })
});

const map = new Map({
  target: 'map',
  layers: [
  new TileLayer({
    source: new XYZ({
      url: 'https://{1-4}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
    })
  }),
  labels
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

function onClick(id, callback) {
  document.getElementById(id).addEventListener('click', callback);
}

function zoomLoad(name) {
  if (ValidURL(name)) {
    var url = encodeURIComponent(name)
    var boundsUrl = "https://tiles.rdnt.io/bounds?url=" + url;


    getJSON(boundsUrl, function(result) {

      var extent = proj.transformExtent(result.bounds, 'EPSG:4326', 'EPSG:3857');
      map.getView().fit(extent, map.getSize());

      var tilesUrl = createTilesUrl(url);
      var cogLayer = new TileLayer({
        type: 'base',
        source: new XYZ({
          url: tilesUrl
        })
      });
      var layers = map.getLayers();
      layers.removeAt(2); 
      map.addLayer(cogLayer);
      update({
        url: name
      });

    }).fail(function(jqXHR, textStatus, errorThrown) {
      alert("Request failed. Are you sure '" + name + "' is a valid COG?  ");
    });


  }
}


 function createTilesUrl(url) {
  return  "https://tiles.rdnt.io/tiles/{z}/{x}/{y}?url=" + url;
}



onClick('submit-url', function(event) {
  event.preventDefault();
  var name = document.getElementById("cog-url").value;
  console.log("submitted url" + name)
  zoomLoad(name);

})



function toggleControl(element) {
  console.log("called" + element)
  labels.setVisible(element.checked);

}

var state = {
  url: {
    default: "",
    deserialize: function (url) {
      return decodeURIComponent(url)
    },
    serialize: function (url) {
      return encodeURIComponent(url)
    }
  }
};

function listener(newState) {

  if ('url' in newState) {


    var tilesUrl = createTilesUrl(encodeURIComponent(newState.url));
    var cogLayer = new TileLayer({
      type: 'base',
      source: new XYZ({
        url: tilesUrl
      })
    });

    map.addLayer(cogLayer);

    document.getElementById("cog-url").value = newState.url;

  }
}

function ValidURL(str) {
  if (!validUrl.isUri(str)) {
    alert("'" + str + "' is not a valid URL. Did you forget to include http://? ");
    
    return false;
  } else {
    return true;
  }
}

// register a state provider
var update = hashed.register(state, listener);

// persist center and zoom in the URL hash
sync(map);

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("about");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
