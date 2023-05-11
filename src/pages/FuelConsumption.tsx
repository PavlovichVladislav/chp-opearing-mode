import React from "react";

const calcPayload = (load: number[], efficiency: number[]) => {
   if (load.length !== efficiency.length)
      throw new Error("length of load array must be equal to length of efficiency array");
   const result = [];

   for (let i = 0; i < load.length; i++) {
      result.push((load[i] * efficiency[i]) / 100);
   }

   return result;
};

const calcHeatLoss = (payload: number[], efficiency: number[]) => {
   if (payload.length !== efficiency.length)
      throw new Error("length of payload array must be equal to length of efficiency array");
   const result = [];

   for (let i = 0; i < payload.length; i++) {
      result.push((payload[i] * (100 - efficiency[i])) / efficiency[i]);
   }

   return result;
};

const calcAverageLoadsValue = (load: number[]) => {
   if (load.length < 2) throw new Error("length of load array must be equal or greater then 2");
   const result = [];

   for (let i = 0; i < load.length - 1; i++) {
      result.push((load[i] + load[i + 1]) / 2);
   }

   return result;
};

const calcAbsHeatLosses = (heatLoss: number[]) => {
   if (heatLoss.length < 2)
      throw new Error("length of heatLoss array must be equal or greater then 2");
   const result = [];

   for (let i = 0; i < heatLoss.length - 1; i++) {
      result.push(heatLoss[i + 1] - heatLoss[i]);
   }

   return result;
};

const calcRelativeHeatLosses = (absoluteHeatLosses: number[], load: number[]) => {
   if (absoluteHeatLosses.length !== load.length - 1)
      throw new Error("length of absoluteHeatLosses must be equal to length of load - 1");
   const result = [];

   for (let i = 0; i < absoluteHeatLosses.length; i++) {
      result.push(absoluteHeatLosses[i] / (load[i + 1] - load[i]));
   }

   return result;
};

const calcBoilerFuelConsumption = (relativeHeatLosses: number[], payload: number[]) => {
   if (relativeHeatLosses.length !== payload.length - 1)
      throw new Error("length of relativeHeatLosses must be equal to length of payload - 1");
   const result = [];

   for (let i = 0; i < relativeHeatLosses.length; i++) {
      //   const value = 1 + relativeHeatLosses[i] / (payload[i + 1] - payload[i]);
      const value = 1 + relativeHeatLosses[i];

      result.push(value * 0.1429);
   }

   return result;
};

// ОПРТ для котельного цеха
// RIFC - опрт котла - массив опрт при разных нагрузках
const calcBoilersFuelConsumption = (
   boilersComposition: {
      name: string;
      count: number;
      RIFC: { b: number; Q: number }[];
   }[]
) => {
   // опрт цеха - результат функции
   const shopRIFC = new Map<number, number>();

   // перебираем пары ОПРТ для каждого котла
   // новое значение - это старое значение для этого b(опрт при нагрузке)
   // + новое значение - это очередной Q в переборе
   // Резюмирую: взяли бойлер, взяли его RIFC перебрали, просуммировали для каждого b, соответствующие ему Q,
   // если у нас 3 одинаковых болйера, то мы просто Q умножаем на boiler.count
   // взяли второй бойлер, и такая же логика, b могут пересекаться, следовательно при одном b могут быть Q = Q1 * count1 + Q2 * count 2
   boilersComposition.forEach((boiler) => {
      boiler.RIFC.forEach(({ b, Q }) => {
         const newValue = Q * boiler.count + (shopRIFC.get(b) || 0);
         shopRIFC.set(b, newValue);
      });
   });

   return shopRIFC;
};

const FuelConsumption = () => {
   const load = [75, 77.5, 80, 85, 89.4, 90, 95, 100, 101.4];
   const efficiency = [87.3, 87.5, 87.65, 87.85, 87.96, 87.97, 88.03, 88.05, 88.06];
   const payload = calcPayload(load, efficiency);
   const heatLoss = calcHeatLoss(payload, efficiency);
   const averageLoadsValue = calcAverageLoadsValue(load);
   const absoluteIncrsHeatLosses = calcAbsHeatLosses(heatLoss);
   const relativeIncrsHeatLosses = calcRelativeHeatLosses(absoluteIncrsHeatLosses, payload);
   const boilerFuelConsumption = calcBoilerFuelConsumption(relativeIncrsHeatLosses, payload);

   const shopRIFC = calcBoilersFuelConsumption([
      {
         name: "TP-170",
         count: 3,
         RIFC: [
            { b: 0.152, Q: 76.25 },
            { b: 0.154, Q: 78.75 },
            { b: 0.157, Q: 82.5 },
            { b: 0.158, Q: 87.2 },
         ],
      },
      {
         name: "TP-80",
         count: 4,
         RIFC: [
            { b: 0.154, Q: 178.8 },
            { b: 0.157, Q: 185 },
            { b: 0.15, Q: 192.65 },
            { b: 0.159, Q: 197.65 },
         ],
      },
   ]);

   console.log(boilerFuelConsumption);
   console.log(averageLoadsValue);
   console.log(shopRIFC);

   return <div></div>;
};

export default FuelConsumption;
