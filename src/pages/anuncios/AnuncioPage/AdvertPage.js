import { useNavigate, useParams } from 'react-router';
import Content from '../../../components/layout/Content';
import { useEffect, useState } from 'react';
import { getAdvert } from '../services';

function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    getAdvert(params.advertId)
      .then(advert => setAdvert(advert))
      .catch(error => {
        if (error.status === 404) {
          navigate('/404');
        }
      });
  }, [navigate, params.advertId]);

  return (
    <Content title="Advert detail">
      <div>
      Advert detail {params.advertId} goes here...
        {advert && (
          <div>
            <code>{JSON.stringify(advert)}</code>
          </div>
        )}
      </div>
    </Content>
  );
}

export default AdvertPage;
