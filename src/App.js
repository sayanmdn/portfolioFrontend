import './App.css';
import {Navigationbar} from "./components/Navigationbar"
import { Login } from "./components/Login";
import { Area1 } from "./components/Area1";
import { Signup } from "./components/Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// const styles = {
//   '@global': {
//     myNavbar: {
//       color: 'green'
//     },
//   }
// }
function App() {
  return (
    <div>
      <Navigationbar/>
      <Router>

      <Switch>
        <Route exact path="/">
          <div style={{background:"linear-gradient(#112233, #002222)", color:"white", textAlign:"center", height:"93vh"}}>
            <Area1/> 
          </div>  
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/signup">
          <Signup/> 
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
