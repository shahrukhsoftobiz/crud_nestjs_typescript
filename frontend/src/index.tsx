import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Header from './components/header';
import Footer from './components/footer';
import FormScreen from './components/formScreen';
import TableScreen from './components/tableScreen';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
  <ChakraProvider>
  <React.StrictMode>
    
    <Provider store={store}>
      {/* <App /> */}
      <Header />
      <FormScreen />
      <TableScreen />
      <Footer /> 
    </Provider>
  </React.StrictMode>,
  </ChakraProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
