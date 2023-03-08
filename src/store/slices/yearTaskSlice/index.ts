import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { setTableValuePayload, YearTaskState } from "./types";
import { ITaskItem, IBoiler, ITurbine } from "../../../models/tableDataModels";

const initialState: YearTaskState = {
   monthsTableData: Array(12).map(function () {
      return {} as ITaskItem;
   }),
   turbines: Array(1).map(function () {
      return {} as ITurbine;
   }),
   boilers: Array(1).map(function () {
      return {} as IBoiler;
   }),
};

export const yearTaskSlice = createSlice({
   name: "yearTask",
   initialState,
   reducers: {
      setMonthsTableValue: (state, action: PayloadAction<setTableValuePayload>) => {
         const { columnNumber, rowNumber, value } = action.payload;
         const columnNames = ["electricity", "power", "warm", "heatOutput"];
         const columnName = columnNames[columnNumber];

         state.monthsTableData[rowNumber] = {
            ...state.monthsTableData[rowNumber],
            [columnName]: value,
         };
      },
      setTurbineValue: (state, action: PayloadAction<setTableValuePayload>) => {
         const { columnNumber, rowNumber, value } = action.payload;
         const columnNames = [
            "name",
            "type",
            "electricityPower",
            "thermalPower",
            "powerGeneration",
         ];
         const columnName = columnNames[columnNumber];

         state.turbines[rowNumber] = {
            ...state.turbines[rowNumber],
            [columnName]: columnNumber >= 2 ? +value : value, // 1 -й и 2- й столбцы - строки
         };
      },
      setBoilerValue: (state, action: PayloadAction<setTableValuePayload>) => {
         const { columnNumber, rowNumber, value } = action.payload;
         const columnNames = ["name", "type", "perfomance", "numOfLaunches"];
         const columnName = columnNames[columnNumber];

         state.boilers[rowNumber] = {
            ...state.boilers[rowNumber],
            [columnName]: columnNumber >= 2 ? +value : value, // 1 -й и 2- й столбцы - строки,
         };
      },
   },
});

export const { setMonthsTableValue, setTurbineValue, setBoilerValue } = yearTaskSlice.actions;

export default yearTaskSlice.reducer;
