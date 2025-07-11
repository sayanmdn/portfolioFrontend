import "./tailwind.css";
import "./App.css";
import { useEffect, useState } from "react";
import { Navigationbar } from "./components/Navigationbar";
import { Login } from "./components/Login";
import { Area1 } from "./components/Area1";
import { Signup } from "./components/Signup";
import { Warehouse } from "./components/Warehouse";
import { NewsComponent } from "./components/NewsContainer";
import { WriteComponent } from "./components/WriteComponent";
import { SocksSuggestions } from "./components/StockSuggestionsComponent";
import { InstagramImageFetcher } from "./components/InstagramImageFetcher";
import { SSOCallback } from "./components/SSOCallback";
import reactGa from "react-ga";

import { Provider } from "react-redux";

import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    reactGa.initialize("UA-92548969-2");
    reactGa.pageview("/");
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navigationbar 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <Switch>
          <div 
            className="main-class transition-all duration-300 ease-in-out"
            style={{
              marginTop: isMobileMenuOpen ? '360px' : '80px',
              transition: 'margin-top 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
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
            <Route exact path="/stocks">
              <SocksSuggestions />
            </Route>
            <Route exact path="/instagram">
              <InstagramImageFetcher />
            </Route>
            <Route exact path="/callback">
              <SSOCallback />
            </Route>
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

// The App component is the root component of the application. It is the parent component of all other components. It is the component that is rendered by the ReactDOM.render() method in the index.js file. The App component is a functional component that returns a JSX element. The App component is responsible for rendering the Navigationbar component and the other components based on the route.
export default App;
