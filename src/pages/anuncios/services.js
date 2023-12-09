import client from '../../api/client';

const anunciosUrl = '/api/adverts';


export const getLatestAnuncios = () => {
    const url = `${anunciosUrl}?_expand=user&_embed=likes&_sort=updatedAt&_order=desc`;
    return client.get(url);
  };

  export const getAdvert = advertId => {
    const url = `${anunciosUrl}/${advertId}`;
    return client.get(url);
  };


export const createAdvert = advert => {
  const url = anunciosUrl;
  return client.post(url, advert);
};