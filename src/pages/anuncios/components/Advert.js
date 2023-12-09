import React from 'react';
import PropTypes from 'prop-types';


const Advert = ({ content, advert }) => {
  return (
    <article className="tweet bordered">
     
      <div className="right">
        <div className="">
        <div key={advert.id}>
              <h3>{advert.name}</h3>
              <p>Precio: {advert.price}</p>
              <p>Tipo: {advert.sale ? 'Venta' : 'Compra'}</p>
              <p>Tags: {advert.tags.join(', ')}</p>
              {/* Enlace al detalle del anuncio */}
              <a href={`/adverts/${advert.id}`}>Ver detalles</a>
            </div>
         
        </div>
        <div>
          {content}
        
        </div>
      </div>
    </article>
  );
};

Advert.propTypes = {
  content: PropTypes.string.isRequired,
  advert: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

export default Advert;
