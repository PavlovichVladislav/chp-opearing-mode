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
      result.push(payload[i] * (100 - efficiency[i]) / efficiency[i]);
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

const FuelConsumption = () => {
   const load = [75, 77.5, 80, 85, 89.4, 90, 95, 100, 101.4];
   const efficiency = [87.3, 87.5, 87.65, 87.85, 87.96, 87.97, 88.03, 88.05, 88.06];
   const payload = calcPayload(load, efficiency);
   const heatLoss = calcHeatLoss(payload, efficiency);
   const averageLoadsValue = calcAverageLoadsValue(load);
   const absoluteIncrsHeatLosses = calcAbsHeatLosses(heatLoss);
   const relativeIncrsHeatLosses = calcRelativeHeatLosses(absoluteIncrsHeatLosses, payload);
   const boilerFuelConsumption = calcBoilerFuelConsumption(relativeIncrsHeatLosses, payload);

   console.log(boilerFuelConsumption);
   console.log(averageLoadsValue);

   return <div></div>;
};

export default FuelConsumption;
