import React from 'react';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter, Navigate } from 'react-router-dom';
import {store} from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/home" />} />
      
    </Route>
  )
);


function App() {
  return (
    <Provider store={store}>  
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
