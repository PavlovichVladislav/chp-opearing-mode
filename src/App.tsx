import "./App.css";
import { BoilersTable, Header, MounthTable, TurbinesTable, Equipment } from "./components";

const App = () => {
   return (
      <div className="App">
         <Header />
         <div className="container">
            <h1 className="title">
               Выполнение годового задания по производству электрической и тепловой энергии по
               месяцам года
            </h1>
            <MounthTable />
            <TurbinesTable />
            <BoilersTable />
            <Equipment />
         </div>
      </div>
   );
};

export default App;
