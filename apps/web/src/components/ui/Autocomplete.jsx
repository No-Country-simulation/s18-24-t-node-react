// components/Autocomplete.jsx

import React, { useState, useEffect } from "react";

const Autocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = "pk.c0135e6c06380875c83b409f4324b14d"; // Coloca tu API key de LocationIQ

  useEffect(() => {
    if (query.length > 2) {
      const fetchSuggestions = setTimeout(() => {
        fetch(
          `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${query}&limit=5&format=json`
        )
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data)) setSuggestions(data);
          })
          .catch((error) =>
            console.error("Error al obtener ubicaciones:", error)
          );
      }, 1500);

      return () => clearTimeout(fetchSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (suggestion) => {
    setQuery(suggestion.display_name);
    onSelect(suggestion); // Llamada al evento onSelect para pasar la ubicación
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Canal Prinsengracht, Ámsterdam, Países Bajos"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white border border-gray-300 p-1.5 rounded-md w-full focus:outline-none"
      />
      <ul className="absolute left-0 bg-white borde w-full mt-1 rounded-lg shadow-lg z-10 list-none p-0 m-0">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSelect(suggestion)}
            className="p-2 cursor-pointer hover:bg-gray-100 w-full"
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
