import React, { FC, useState } from "react";
import "./App.css";
import BoilersTable from "./components/BoilersTable/BoilersTable";
import {
   offSeasonMonthNumbers,
   summerMonthNumbers,
   winterMonthNumbers,
} from "./components/data/seasons";
import EquipmentCard from "./components/equipmentCard/EquipmentCard";
import Header from "./components/header/Header";
import MounthTable from "./components/mounthTable/MounthTable";
import TurbinesTable from "./components/turbinesTable/TurbinesTable";
import { useTypedSelector } from "./hooks/useTypedSelector";

const App: FC = () => {
   const months = useTypedSelector((state) => state.yearTaskSlice.data);
   const boilers = useTypedSelector((state) => state.yearTaskSlice.boilers);
   const [winterBoilerIndexes, setWinterBoilerIndexes] = useState<number[]>([]);
   const [summberBoilerIndexes, setSummberBoilerIndexes] = useState<number[]>(
      []
   );
   const [offSeasonBoilerIndexes, setOffSeasonBoilerIndexes] = useState<
      number[]
   >([]);

   const selectionOfBoilers = (
      boilersAmount: number,
      averagePperformance: number
   ) => {
      const start = Number("1" + Array(boilersAmount).join("0"));
      const end = start * 10 - 1;

      let result: number[] = [];
      let minDif = Infinity;

      for (let i = start; i < end; i++) {
         const set = new Set();
         const boilerNumbers = ("" + i).split("").map(Number);
         boilerNumbers.forEach((item) => set.add(item));
         
         if (set.size === boilersAmount) {
            let curSum = 0;

            boilerNumbers.forEach((item) => {
               if (boilers[item - 1]) {
                  curSum += boilers[item - 1].perfomance;
               }
            });

            if (curSum >= averagePperformance) {
               let curDif = Math.abs(curSum - averagePperformance);

               if (curDif < minDif) {
                  minDif = curDif;
                  result = boilerNumbers;
               }
            }
         }
      }

      if (isFinite(minDif)) {
         return result;
      }

      return null;
   };

   const calcSeasonBoilers = (monthNumbers: number[]) => {
      let averagePerformance = 0;

      monthNumbers.forEach(
         (number) => (averagePerformance += months[number].heatOutput)
      );

      averagePerformance = averagePerformance / winterMonthNumbers.length;

      let boilersCobmination: number[] | null = [];

      for (
         let curBoilersAmount = 1;
         curBoilersAmount < boilers.length;
         curBoilersAmount++
      ) {
         boilersCobmination = selectionOfBoilers(curBoilersAmount, averagePerformance);

         if (boilersCobmination) {
            return boilersCobmination;
         }
      }
   };

   const calcBoilers = () => {
      const winterBoilers = calcSeasonBoilers(winterMonthNumbers);

      if (winterBoilers) {
         setWinterBoilerIndexes(winterBoilers);
      }

      const summerBoilers = calcSeasonBoilers(summerMonthNumbers);

      if (summerBoilers) {
         setSummberBoilerIndexes(summerBoilers);
      }

      const offSeasonBoilers = calcSeasonBoilers(offSeasonMonthNumbers);

      if (offSeasonBoilers) {
         setOffSeasonBoilerIndexes(offSeasonBoilers);
      }
   };

   return (
      <div className="App">
         <Header />
         <div className="container">
            <h1 className="title" >
               Выполнение годового задания по производству электрической и
               тепловой энергии по месяцам года
            </h1>
            <MounthTable />
            <TurbinesTable />
            <BoilersTable />

            <button className="button" onClick={calcBoilers}>
               Рассчитать количество оборудования
            </button>
            <h2 className="title">Котлы</h2>
            {winterBoilerIndexes.length > 0 && <h2 className="subtitle">Зима</h2>}
            {winterBoilerIndexes.map((index) => (
               <EquipmentCard boiler={boilers[index - 1]} />
            ))}
            {summberBoilerIndexes.length > 0 && <h2 className="subtitle">Лето</h2>}
            {summberBoilerIndexes.map((index) => (
               <EquipmentCard boiler={boilers[index - 1]} />
            ))}
            {offSeasonBoilerIndexes.length > 0 && <h2 className="subtitle">Межсезонье</h2>}
            {offSeasonBoilerIndexes.map((index) => (
               <EquipmentCard boiler={boilers[index - 1]} />
            ))}
         </div>
      </div>
   );
};

export default App;

