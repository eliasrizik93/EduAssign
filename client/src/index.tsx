import { Provider } from 'react-redux'; // Make sure you have this import statement
import store, { persistor } from './redux/store';
import App from './App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import { PersistGate } from 'redux-persist/integration/react';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
