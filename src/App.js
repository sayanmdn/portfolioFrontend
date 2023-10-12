import "./App.css";
import { useEffect } from "react";
import { Navigationbar } from "./components/Navigationbar";
import { Login } from "./components/Login";
import { Area1 } from "./components/Area1";
import { Signup } from "./components/Signup";
import { Warehouse } from "./components/Warehouse";
import { Cake } from "./components/CakeContainer";
import { NewsComponent } from "./components/NewsContainer";
import { WriteComponent } from "./components/WriteComponent";
import reactGa from "react-ga";

import { Provider } from "react-redux";

import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    reactGa.initialize("UA-92548969-2");
    reactGa.pageview("/");
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navigationbar />
        <Switch>
          <div className="main-class">
            <Route exact path="/">
              <Area1 />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/warehouse">
              <Warehouse />
            </Route>
            <Route exact path="/news">
              <NewsComponent />
            </Route>
            <Route exact path="/write">
              <WriteComponent />
            </Route>
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
