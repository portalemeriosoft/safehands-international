import { useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = () => {

  const mapElement = useRef();
  const searchElement = useRef();
  
  let marker;

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  loader.load().then(async (google) => {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { SearchBox } = await google.maps.importLibrary("places");

    const searchBox = new SearchBox(searchElement.current);

    const latitude = +localStorage.getItem("latitude");
    const longitude = +localStorage.getItem("longitude");

    if (mapElement && mapElement.current) {
      let map = new Map(mapElement.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 14,
        mapId: "f7ece943037bb9ce",
      });

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        console.log(places)
  
        if(places && places[0] && places[0].geometry && places[0].geometry.location){
          
          const bounds = new google.maps.LatLngBounds();

          if (places[0].geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(places[0].geometry.viewport);
          } else {
            bounds.extend(places[0].geometry.location);
          }
          map.fitBounds(bounds);
          
          if (marker) {
            marker.setMap(null);
          }
  
          marker = new AdvancedMarkerElement({
            map: map,
            position: places[0].geometry.location,
            draggable: true,
          });

        }
  
      })


      map.addListener("click", function (event) {
        if (marker) {
          marker.setMap(null);
        }
        
        marker = new AdvancedMarkerElement({
          map: map,
          position: event.latLng,
          draggable: true,
        });
      });
    }
  });

  return (
    <div style={{
      background: "rgb(247 239 239 / 48%)",
      width: 800,
      padding: 10,
      borderRadius: 4,
      margin: "auto",
      marginTop: 20,
      boxShadow: "0 1px 6px 0 rgba(32, 33, 36, 0.28)"
    }}>
      <div>
        <input
          ref={searchElement}
          type="text"
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 10,
            marginTop: 10,
            border: "1px solid #000"
          }}
          placeholder="Enter a location"
        />
      </div>
      <div
        ref={mapElement}
        style={{
          width: "100%",
          height: "calc(100vh - 150px)",
        }}
      ></div>
    </div>
  );
};

export default Map;
