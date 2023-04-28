import { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { offSeasonMonthNumbers, summerMonthNumbers, winterMonthNumbers } from "../../data/seasons";
import { TurbineCard, EquipmentCard } from "../index";
import { IBoiler, ITurbine } from "../../models/tableDataModels";

const EquipmentList = () => {
   const { monthsTableData, boilers, turbines } = useTypedSelector((state) => state.yearTaskSlice);

   const [winterBoilers, setWinterBoilers] = useState<IBoiler[]>([]);
   const [summberBoilers, setSummberBoilers] = useState<IBoiler[]>([]);
   const [offSeasonBoilers, setOffSeasonBoilers] = useState<IBoiler[]>([]);

   const [winterTurbines, setWinterTurbines] = useState<ITurbine[]>([]);
   const [summberTurbines, setSummberTurbines] = useState<ITurbine[]>([]);
   const [offSeasonTurbines, setOffSeasonTurbines] = useState<ITurbine[]>([]);

   // метод ниже считает возможные комбинации оборудования, согласно теории верроятности это называетcя -
   // число сочтениай из n объектов(оборудование) по k, где k - amount, количество оборудования в сочетании
   // алгоритм работает рекурсивно

   const getPossibleCombinations = (equipmentList: (ITurbine | IBoiler)[], amount: number) => {
      if (amount === 1) {
         return equipmentList.map((e) => [e]);
      }

      const combinations = [];

      for (let i = 0; i <= equipmentList.length - amount; i++) {
         const first = equipmentList[i];
         const rest = equipmentList.slice(i + 1);
         const subCombinations: (ITurbine | IBoiler)[][] = getPossibleCombinations(
            rest,
            amount - 1
         );

         for (const subCombination of subCombinations) {
            combinations.push([first, ...subCombination]);
         }
      }

      return combinations;
   };

   function getMostAdvantageousComposition(
      equipmentList: (ITurbine | IBoiler)[],
      requiredHeatOutput: number
   ) {
      let bestComposition: (ITurbine | IBoiler)[] = [];
      let minExcess = Infinity;

      for (let i = 1; i <= equipmentList.length; i++) {
         const combinations = getPossibleCombinations(equipmentList, i);

         for (const combination of combinations) {
            let totalHeatOutput = 0;

            // для выявления оптимальной комбинации оборудования, необходимо вычислить
            // его суммарную производительность, для этого устанавливаются type guards, 
            // которые проверяют, какую характеристику нужно прибавлять к счётчику
            // если в функцию пришёл массив бойлеров, то функция будет работать как с болейрами
            // и прибавлять perfomance
            totalHeatOutput = combination.reduce((sum, e: IBoiler | ITurbine) => {
               if ("perfomance" in e) sum += e.perfomance;
               if ("electricityPower" in e) sum += e.electricityPower;

               return sum;
            }, 0);

            const excess = totalHeatOutput - requiredHeatOutput;

            if (excess >= 0 && excess < minExcess) {
               bestComposition = combination;
               minExcess = excess;
            }
         }
      }

      return bestComposition;
   }

   const calcSeasonEquipmentt = (
      seaonsMounthNumbers: number[],
      equipmentList: (ITurbine | IBoiler)[],
      equipmentName: "boilers" | "turbines"
   ) => {
      // среднее значение параметра - это средняя характеристика, которую мы преследуем, когда ищем выгодную комбинацию оборудования
      // в случае бойлеров - это теплопроизводительность, в случае турбин - выработка электроэнергии
      let averageParameterValue = 0;

      if (equipmentName === "boilers") {
         seaonsMounthNumbers.forEach(
            (number) => (averageParameterValue += monthsTableData[number].heatOutput)
         );
      }

      if (equipmentName === "turbines") {
         seaonsMounthNumbers.forEach(
            (number) => (averageParameterValue += monthsTableData[number].power)
         );
      }

      averageParameterValue = averageParameterValue / seaonsMounthNumbers.length;

      const bestComposition = getMostAdvantageousComposition(equipmentList, averageParameterValue);
      return bestComposition;
   };

   const calcBoilers = () => {
      const winterBoilers = calcSeasonEquipmentt(winterMonthNumbers, boilers, "boilers");
      setWinterBoilers(winterBoilers as IBoiler[]);

      const summerBoilers = calcSeasonEquipmentt(summerMonthNumbers, boilers, "boilers");
      setSummberBoilers(summerBoilers as IBoiler[]);

      const offSeasonBoilers = calcSeasonEquipmentt(offSeasonMonthNumbers, boilers, "boilers");
      setOffSeasonBoilers(offSeasonBoilers as IBoiler[]);
   };

   const calcTurbines = () => {
      const winterTurbines = calcSeasonEquipmentt(winterMonthNumbers, turbines, "turbines");
      setWinterTurbines(winterTurbines as ITurbine[]);

      const summerTurbines = calcSeasonEquipmentt(winterMonthNumbers, turbines, "turbines");
      setSummberTurbines(summerTurbines as ITurbine[]);

      const offSeasonTurbines = calcSeasonEquipmentt(winterMonthNumbers, turbines, "turbines");
      setOffSeasonTurbines(offSeasonTurbines as ITurbine[]);
   };

   const calcEquipment = () => {
      calcBoilers();
      calcTurbines();
   };

   const renderBoilers = (equipment: IBoiler[]) => {
      if (!equipment.length) return null;

      return (
         <>
            {<h2 className="subtitle">Зима</h2>}
            {equipment.map((item) => (
               <EquipmentCard key={item.name} boiler={item} />
            ))}
         </>
      );
   };

   const renderTurbines = (equipment: ITurbine[]) => {
      if (!equipment.length) return null;

      return (
         <>
            {<h2 className="subtitle">Зима</h2>}
            {equipment.map((item) => (
               <TurbineCard key={item.name} turbine={item} />
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
               {renderBoilers(winterBoilers)}
               {renderBoilers(summberBoilers)}
               {renderBoilers(offSeasonBoilers)}
            </div>
            <div className="turbines">
               <h2 className="title">Турбины</h2>
               {renderTurbines(winterTurbines)}
               {renderTurbines(summberTurbines)}
               {renderTurbines(offSeasonTurbines)}
            </div>
         </div>
      </>
   );
};

export default EquipmentList;

