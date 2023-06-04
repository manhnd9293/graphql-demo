import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ListDevices from "./view/devices/ListDevices";
import CreateDevice from "./view/devices/CreateDevice";
import EditDevice from "./view/devices/EditDevice";

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <ListDevices/>
  },

  {
    path: '/create',
    element: <CreateDevice/>
  },
  {
    path: '/edit/:deviceId',
    element: <EditDevice/>
  }

])

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
      </RouterProvider>
    </ApolloProvider>
  </React.StrictMode>
);

