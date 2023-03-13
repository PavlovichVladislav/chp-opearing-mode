import { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { offSeasonMonthNumbers, summerMonthNumbers, winterMonthNumbers } from "../../data/seasons";
import { TurbineCard, EquipmentCard } from "../index";

const Equipment = () => {
   const { monthsTableData, boilers, turbines } = useTypedSelector((state) => state.yearTaskSlice);

   const [winterBoilerIndexes, setWinterBoilerIndexes] = useState<number[]>([]);
   const [summberBoilerIndexes, setSummberBoilerIndexes] = useState<number[]>([]);
   const [offSeasonBoilerIndexes, setOffSeasonBoilerIndexes] = useState<number[]>([]);

   const [winterTurbineIndexes, setWinterTurbineIndexes] = useState<number[]>([]);
   const [summberTurbineIndexes, setSummberTurbineIndexes] = useState<number[]>([]);
   const [offSeasonTurbineIndexes, setOffSeasonTurbineIndexes] = useState<number[]>([]);

   const selectionOfEquipment = (
      equipmentAmount: number,
      averageValue: number,
      equipmentPropName: string
   ) => {
      const start = Number("1" + Array(equipmentAmount).join("0"));
      const end = start * 10 - 1;

      let result: number[] = [];
      let minDif = Infinity;

      for (let i = start; i < end; i++) {
         const set = new Set();
         const equipmentNumbers = ("" + i).split("").map(Number);
         equipmentNumbers.forEach((item) => set.add(item));

         if (set.size === equipmentAmount) {
            let curSum = 0;

            equipmentNumbers.forEach((item) => {
               if (equipmentPropName === "turbines" && turbines[item - 1]) {
                  curSum += turbines[item - 1].electricityPower;
               }

               if (equipmentPropName === "boilers" && boilers[item - 1]) {
                  curSum += boilers[item - 1].perfomance;
               }
            });

            if (curSum >= averageValue) {
               let curDif = Math.abs(curSum - averageValue);

               if (curDif < minDif) {
                  minDif = curDif;
                  result = equipmentNumbers;
               }
            }
         }
      }

      if (isFinite(minDif)) {
         return result;
      }

      return null;
   };

   const calcSeasonEquipment = (monthNumbers: number[], equipmentName: string) => {
      let averagePerformance = 0;

      if (equipmentName === "boilers") {
         monthNumbers.forEach(
            (number) => (averagePerformance += monthsTableData[number].heatOutput)
         );
      }

      if (equipmentName === "turbines") {
         monthNumbers.forEach((number) => (averagePerformance += monthsTableData[number].power));
      }

      averagePerformance = averagePerformance / monthNumbers.length;

      let equipmentCobmination: number[] | null = [];

      for (let curEquipmentAmount = 1; curEquipmentAmount <= boilers.length; curEquipmentAmount++) {
         equipmentCobmination = selectionOfEquipment(
            curEquipmentAmount,
            averagePerformance,
            equipmentName
         );

         if (equipmentCobmination) {
            return equipmentCobmination;
         }
      }
   };

   const calcBoilers = () => {
      const winterBoilers = calcSeasonEquipment(winterMonthNumbers, "boilers");
      if (winterBoilers) setWinterBoilerIndexes(winterBoilers);

      const summerBoilers = calcSeasonEquipment(summerMonthNumbers, "boilers");
      if (summerBoilers) setSummberBoilerIndexes(summerBoilers);

      const offSeasonBoilers = calcSeasonEquipment(offSeasonMonthNumbers, "boilers");
      if (offSeasonBoilers) setOffSeasonBoilerIndexes(offSeasonBoilers);
   };

   const calcTurbines = () => {
      const winterTurbines = calcSeasonEquipment(winterMonthNumbers, "turbines");
      if (winterTurbines) setWinterTurbineIndexes(winterTurbines);

      const summerTurbines = calcSeasonEquipment(summerMonthNumbers, "turbines");
      if (summerTurbines) setSummberTurbineIndexes(summerTurbines);

      const offSeasonTurbines = calcSeasonEquipment(offSeasonMonthNumbers, "turbines");
      if (offSeasonTurbines) setOffSeasonTurbineIndexes(offSeasonTurbines);
   };

   const calcEquipment = () => {
      calcBoilers();
      calcTurbines();
   };

   const renderBoilers = (indexes: number[]) => {
      return (
         <>
            {indexes.length > 0 && <h2 className="subtitle">Зима</h2>}
            {indexes.map((index) => (
               <EquipmentCard key={index} boiler={boilers[index - 1]} />
            ))}
         </>
      );
   };

   const renderTurbines = (indexes: number[]) => {
      return (
         <>
            {indexes.length > 0 && <h2 className="subtitle">Зима</h2>}
            {indexes.map((index) => (
               <TurbineCard key={index} turbine={turbines[index - 1]} />
            ))}
         </>
      );
   };

   return (
      <>
         <button className="button" onClick={calcEquipment}>
            Рассчитать количество оборудования
         </button>

         <div className="equipmentWrapper">
            <div className="boilers">
               <h2 className="title">Котлы</h2>
               {renderBoilers(winterBoilerIndexes)}
               {renderBoilers(summberBoilerIndexes)}
               {renderBoilers(offSeasonBoilerIndexes)}
            </div>
            <div className="turbines">
               <h2 className="title">Турбины</h2>
               {renderTurbines(winterTurbineIndexes)}
               {renderTurbines(summberTurbineIndexes)}
               {renderTurbines(offSeasonTurbineIndexes)}
            </div>
         </div>
      </>
   );
};

export default Equipment;

// function getMostAdvantageousComposition(equipmentList: any[], requiredHeatOutput: number) {
//    let bestComposition = null;
//    let minExcess = Infinity;
   
//    for (let i = 1; i <= equipmentList.length; i++) {
//      const combinations = getCombinations(equipmentList, i);
     
//      for (const combination of combinations) {
//        const totalHeatOutput = combination.reduce((sum, e) => sum + e.heatOutput, 0);
//        const excess = totalHeatOutput - requiredHeatOutput;
       
//        if (excess >= 0 && excess < minExcess) {
//          bestComposition = combination;
//          minExcess = excess;
//        }
//      }
//    }
   
//    return bestComposition;
//  }
 
//  function getCombinations(equipmentList: any[], size: number) {
//    if (size === 1) {
//      return equipmentList.map(e => [e]);
//    }
   
//    const combinations = [];
   
//    for (let i = 0; i <= equipmentList.length - size; i++) {
//      const first = equipmentList[i];
//      const rest = equipmentList.slice(i + 1);
//      const subCombinations: any[] = getCombinations(rest, size - 1);
     
//      for (const subCombination of subCombinations) {
//        combinations.push([first, ...subCombination]);
//      }
//    }
   
//    return combinations;
//  }

// let equipment = [
//    { name: "Equipment A", heatOutput: 150 },
//    { name: "Equipment B", heatOutput: 170 },
//    { name: "Equipment C", heatOutput: 170 },
//    { name: "Equipment D", heatOutput: 170 },
//    { name: "Equipment E", heatOutput: 420 },
//    { name: "Equipment F", heatOutput: 420 },
//    { name: "Equipment G", heatOutput: 420 },
//    { name: "Equipment H", heatOutput: 420 },
// ];
// let seasonHeatOutput = 350;

// // let equipment = [
// //    { name: "Equipment A", heatOutput: 150 },
// //    { name: "Equipment B", heatOutput: 170 },
// //    { name: "Equipment C", heatOutput: 170 },
// //    { name: "Equipment D", heatOutput: 170 },
// //    { name: "Equipment E", heatOutput: 420 },
// //    { name: "Equipment F", heatOutput: 420 },
// //    { name: "Equipment G", heatOutput: 420 },
// //    { name: "Equipment H", heatOutput: 420 },
// // ];
// // let seasonHeatOutput = 392;

// let optimalEquipment = getMostAdvantageousComposition(equipment, seasonHeatOutput);
// console.log(optimalEquipment);