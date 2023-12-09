import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestAnuncios } from '../services';
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
    getLatestAnuncios().then((adverts) => {
      setAdverts(adverts);
      setFilteredAdverts(adverts);
    });
  }, []);

  const applyFilters = () => {
    let filtered = adverts.filter((advert) => {
      let matchesFilters = true;

      if (filters.name && !advert.name.toLowerCase().includes(filters.name.toLowerCase())) {
        matchesFilters = false;
      }

      if (filters.sale && advert.sale !== filters.sale) {
        matchesFilters = false;
      }

      if (filters.price && advert.price > filters.price) {
        matchesFilters = false;
      }

      if (filters.tags.length > 0) {
        const advertTags = advert.tags.map((tag) => tag.toLowerCase());
        const filterTags = filters.tags.map((tag) => tag.toLowerCase());
        if (!filterTags.every((tag) => advertTags.includes(tag))) {
          matchesFilters = false;
        }
      }

      return matchesFilters;
    });

    setFilteredAdverts(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleTagChange = (e) => {
    const { name, options } = e.target;
    const selectedTags = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFilters((prevFilters) => ({ ...prevFilters, [name]: selectedTags }));
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div>
      <h1>Adverts</h1>
      <form onSubmit={handleApplyFilters}>
        <input type="text" name="name" placeholder="Filter by name" onChange={handleFilterChange} />
        <select name="sale" onChange={handleFilterChange}>
          <option value="">Filter by sale</option>
          <option value="true">Sale</option>
          <option value="false">Purchase</option>
        </select>
        <input type="number" name="price" placeholder="Filter by price" onChange={handleFilterChange} />
        <select name="tags" multiple onChange={handleTagChange}>
          {/* Fetch available tags and map through them to create options */}
          {/* Example: */}
          {/* {availableTags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))} */}
        </select>
        <button type="submit">Apply Filters</button>
      </form>

      <div className="tweetsPage">
        {filteredAdverts.length ? (
          <ul>
            {filteredAdverts.map(({ id, ...advert }) => (
              <li key={id}>
                <Link to={`/adverts/${id}`}>
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
