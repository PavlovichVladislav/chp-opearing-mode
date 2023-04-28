import "./App.css";
import { Router } from "./Router";
import { Header } from "./components";

const App = () => {
   return (
      <div className="App">
         <Header />
         <div className="container">
            <Router/>
         </div>
      </div>
   );
};

export default App;
