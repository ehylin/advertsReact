import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout/Layout';
import AdvertsPage from './pages/anuncios/AnunciosPage';
import AdvertPage from './pages/anuncios/AnuncioPage/AdvertPage';
import NewAdvertPage from './pages/anuncios/NewAdvertPage/NewAdvertPage';

import RequireAuth from './pages/auth/components/RequireAuth';

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        }
      />
       <Route path="/adverts" element={<Layout />}>
        <Route index element={<AdvertsPage />} />
        <Route path=":advertId" element={<AdvertPage />} />
         <Route
          path="new"
          element={
            <RequireAuth>
              <NewAdvertPage />
            </RequireAuth>
          }
        />  
      </Route>  
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
