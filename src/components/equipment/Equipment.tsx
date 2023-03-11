import { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";


import { offSeasonMonthNumbers, summerMonthNumbers, winterMonthNumbers } from "../../data/seasons";
import { TurbineCard, EquipmentCard } from "../index";

const Equipment = () => {
   const months = useTypedSelector((state) => state.yearTaskSlice.monthsTableData);
   const boilers = useTypedSelector((state) => state.yearTaskSlice.boilers);
   const turbines = useTypedSelector((state) => state.yearTaskSlice.turbines);

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
         monthNumbers.forEach((number) => (averagePerformance += months[number].heatOutput));
      }

      if (equipmentName === "turbines") {
         monthNumbers.forEach((number) => (averagePerformance += months[number].power));
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
      console.log("calc");
      calcBoilers();
      calcTurbines();
   };

   return (
      <>
         <button className="button" onClick={calcEquipment}>
            Рассчитать количество оборудования
         </button>

         <div className="equipmentWrapper">
            <div className="boilers">
               <h2 className="title">Котлы</h2>
               {winterBoilerIndexes.length > 0 && <h2 className="subtitle">Зима</h2>}
               {winterBoilerIndexes.map((index) => (
                  <EquipmentCard key={index} boiler={boilers[index - 1]} />
               ))}
               {summberBoilerIndexes.length > 0 && <h2 className="subtitle">Лето</h2>}
               {summberBoilerIndexes.map((index) => (
                  <EquipmentCard key={index} boiler={boilers[index - 1]} />
               ))}
               {offSeasonBoilerIndexes.length > 0 && <h2 className="subtitle">Межсезонье</h2>}
               {offSeasonBoilerIndexes.map((index) => (
                  <EquipmentCard key={index} boiler={boilers[index - 1]} />
               ))}
            </div>
            <div className="turbines">
               <h2 className="title">Турбины</h2>
               {winterTurbineIndexes.length > 0 && <h2 className="subtitle">Зима</h2>}
               {winterTurbineIndexes.map((index) => (
                  <TurbineCard key={index} turbine={turbines[index - 1]} />
               ))}
               {summberTurbineIndexes.length > 0 && <h2 className="subtitle">Лето</h2>}
               {summberTurbineIndexes.map((index) => (
                  <TurbineCard key={index} turbine={turbines[index - 1]} />
               ))}
               {offSeasonTurbineIndexes.length > 0 && <h2 className="subtitle">Межсезонье</h2>}
               {offSeasonTurbineIndexes.map((index) => (
                  <TurbineCard key={index} turbine={turbines[index - 1]} />
               ))}
            </div>
         </div>
      </>
   );
};

export default Equipment;
