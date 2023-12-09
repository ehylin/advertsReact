import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestAnuncios } from '../services'; // Supongamos que existe una función fetchAdverts para obtener anuncios
import Advert from '../components/Advert';
const AdvertsPage = () => {
  const [adverts, setAdverts] = useState([]);
  const [filteredAdverts, setFilteredAdverts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    sale: '',
    price: '',
    tags: [],
  });



  useEffect(() => {
    getLatestAnuncios().then(adverts => {
      setAdverts(() => {
        return adverts;
      });
      setFilteredAdverts(adverts);
    });
  }, [adverts]);

  const applyFilters = () => {
    let filtered = adverts.filter((advert) => {
      // Aplicar filtros sobre los anuncios
      // Utiliza los filtros en 'filters' para filtrar los anuncios
    });
    setFilteredAdverts(filtered);
  };

  const handleFilterChange = (e) => {
    // Actualiza el estado de los filtros al cambiar los inputs del formulario
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  return (
    <div>
      <h1>Adverts</h1>
      <form>
        {/* Implementa los inputs para los filtros según las especificaciones */}
      </form>
      <div>
        {/* Muestra la lista de anuncios */}
        {filteredAdverts.length > 0 ? (
          filteredAdverts.map((advert) => (
            <div key={advert.id}>
              <h3>{advert.name}</h3>
              <p>Precio: {advert.price}</p>
              <p>Tipo: {advert.sale ? 'Venta' : 'Compra'}</p>
              <p>Tags: {advert.tags.join(', ')}</p>
              {/* Enlace al detalle del anuncio */}
              <a href={`/adverts/${advert.id}`}>Ver detalles</a>
            </div>
          ))
        ) : (
          <p>No hay anuncios disponibles.</p>
        )}
      </div>
     
      <div className="tweetsPage">
        {filteredAdverts.length ? (
          <ul>
            {adverts.map(({ id, ...advert }) => (
              <li key={id}>
                <Link to={`${id}`}>
                  <Advert {...advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay anuncios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default AdvertsPage;
