import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES } from './constants/routes';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Dulceria = React.lazy(() => import('./pages/Dulceria'));
const Pago = React.lazy(() => import('./pages/Pago'));

// Loading fallback for Suspense
const GlobalLoader = () => (
  <div className="flex-1 flex justify-center items-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-gray-800 border-t-brandRed rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            
            <Route 
              path={ROUTES.DULCERIA} 
              element={
                <ProtectedRoute requireAuth={true}>
                  <Dulceria />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path={ROUTES.PAGO} 
              element={
                <ProtectedRoute requireAuth={true} requireCart={true}>
                  <Pago />
                </ProtectedRoute>
              } 
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
