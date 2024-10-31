import React, { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { reverseGeocode } from "locationiq"; // Importa la función de geocodificación inversa

// Clave de LocationIQ (sólo del mapa, no de la API)
const MAP_KEY = "pk.c0135e6c06380875c83b409f4324b14d";

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Para almacenar la instancia del mapa

  // Función para crear el mapa
  const createMap = () => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://tiles.locationiq.com/v3/streets/vector.json?key=${MAP_KEY}`,
      center: [-122.42, 37.779], // Coordenadas iniciales
      zoom: 12,
    });

    // Guardar la instancia del mapa
    mapRef.current = map;
  };

  // Función para obtener la dirección usando LocationIQ
  const getAddress = async (lat, lon) => {
    try {
      const response = await reverseGeocode({ key: MAP_KEY, lat, lon }); // Llama a la función directamente
      const address = response.display_name; // Asegúrate de que esto coincida con la respuesta de la API
      return new maplibregl.Popup().setHTML(
        `<p><strong>Dirección:</strong> ${address}</p>`
      );
    } catch (error) {
      console.error("Error al obtener dirección:", error);
    }
  };

  // Función para agregar el marcador en el mapa
  const addMarker = async (lat, lon) => {
    // Si hay un marcador previo, elimínalo
    if (window.marker) window.marker.remove();

    // Crear el marcador
    window.marker = new maplibregl.Marker()
      .setLngLat([lon, lat])
      .addTo(mapRef.current);

    // Obtener el popup y asignarlo al marcador
    const popup = await getAddress(lat, lon);
    window.marker.setPopup(popup).togglePopup(); // Muestra el popup

    // Centrar el mapa en el marcador
    mapRef.current.flyTo({
      center: [lon, lat],
      zoom: 15,
    });
  };

  useEffect(() => {
    // Crear el mapa
    createMap();

    // Ejemplo de marcador inicial
    addMarker(-34.5451275, -58.4508504); // Cambia a las coordenadas deseadas

    // Limpieza del mapa cuando el componente se desmonta
    return () => mapRef.current && mapRef.current.remove();
  }, []);

  return (
    <div ref={mapContainerRef} className="absolute top-0 bottom-0 w-full" />
  );
};

export default Map;
