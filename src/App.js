import "./tailwind.css";
import "./App.css";
import { useEffect, useState, Suspense, lazy } from "react";
import { Navigationbar } from "./components/Navigationbar";
import reactGa from "react-ga";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Lazy load components for better performance
const Login = lazy(() => import("./components/Login").then(m => ({ default: m.Login })));
const Area1 = lazy(() => import("./components/Area1").then(m => ({ default: m.Area1 })));
const Signup = lazy(() => import("./components/Signup").then(m => ({ default: m.Signup })));
const Warehouse = lazy(() => import("./components/Warehouse").then(m => ({ default: m.Warehouse })));
const NewsComponent = lazy(() => import("./components/NewsContainer").then(m => ({ default: m.NewsComponent })));
const WriteComponent = lazy(() => import("./components/WriteComponent").then(m => ({ default: m.WriteComponent })));
const SocksSuggestions = lazy(() => import("./components/StockSuggestionsComponent").then(m => ({ default: m.SocksSuggestions })));
const InstagramImageFetcher = lazy(() => import("./components/InstagramImageFetcher").then(m => ({ default: m.InstagramImageFetcher })));
const SSOCallback = lazy(() => import("./components/SSOCallback").then(m => ({ default: m.SSOCallback })));

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
            <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
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
            </Suspense>
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

// The App component is the root component of the application. It is the parent component of all other components. It is the component that is rendered by the ReactDOM.render() method in the index.js file. The App component is a functional component that returns a JSX element. The App component is responsible for rendering the Navigationbar component and the other components based on the route.
export default App;
