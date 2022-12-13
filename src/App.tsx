import React, { FC, useState } from "react";
import "./App.css";
import BoilersTable from "./components/BoilersTable/BoilersTable";
import EquipmentCard from "./components/equipmentCard/EquipmentCard";
import Header from "./components/header/Header";
import MounthTable from "./components/mounthTable/MounthTable";
import TurbinesTable from "./components/turbinesTable/TurbinesTable";
import { useTypedSelector } from "./hooks/useTypedSelector";

const App: FC = () => {
   const months = useTypedSelector((state) => state.yearTaskSlice.data);
   const boilers = useTypedSelector((state) => state.yearTaskSlice.boilers);
   const [boilerIndexes, setboilerIndexes] = useState<number[]>([]);

   const combinationGenerator = (numberLength: number, averagePperformance: number) => {
      const start = Number("1" + Array(numberLength).join("0"));
      const end = start * 10 - 1;

      // let result = 0;
      let result: number[] = [];
      let minDif = Infinity; 

      for (let i = start; i < end; i++) {
         const set = new Set();
         const array = ("" + i).split("").map(Number);
         array.forEach((item) => set.add(item));

         if (set.size === numberLength) {
            let curSum = 0;

            array.forEach((item) => {
               if (boilers[item -1]) {
                  curSum += boilers[item-1].perfomance
               }  
            });

            if (curSum > averagePperformance) {
               let curDif = Math.abs(curSum - averagePperformance);

               if (curDif < minDif) {
                  minDif = curDif
                  result = array;
               }
            }
         }
      }

      if (isFinite(minDif)) {
         return result;
      }


      return null;
   };

   const calcEquipment = () => {
      const averagePperformance =
         (months[0].heatOutput +
            months[1].heatOutput +
            months[2].heatOutput +
            months[10].heatOutput +
            months[11].heatOutput) /
         5;

      let cobmination: number[] | null = [];

      for (let i = 1; i < boilers.length; i++) {
         cobmination = combinationGenerator(i, averagePperformance);

         if (cobmination) {
            setboilerIndexes(cobmination);
            break;
         }

      }
   };

   return (
      <div className="App">
         <Header />
         <div className="container">
            <h1>
               Выполнение годового задания по производству электрической и
               тепловой энергии по месяцам года
            </h1>
            <MounthTable />
            <TurbinesTable />
            <BoilersTable />

            <button className="button" onClick={calcEquipment}>
               Рассчитать количество оборудования
            </button>

            {boilerIndexes.map(index => <EquipmentCard boiler={boilers[index - 1]}/>)}
         </div>
      </div>
   );
};

export default App;
