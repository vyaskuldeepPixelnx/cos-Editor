import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  store  from '../src/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore.js";

const persistor = persistStore(store) 
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
);
