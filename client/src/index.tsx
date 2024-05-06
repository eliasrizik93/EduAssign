import { Provider } from 'react-redux'; // Make sure you have this import statement
import store from './redux/store';
import App from './App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
