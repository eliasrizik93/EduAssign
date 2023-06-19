import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Make sure you have this import statement
import store from "./redux/store";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
