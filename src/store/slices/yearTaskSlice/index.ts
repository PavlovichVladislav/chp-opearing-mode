import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setStringNamePayload, setTableValuePayload, YearTaskState } from "./types";
import { ITaskItem } from "../../../models/taskItem";
import { ITurbine } from "../../../models/turbine";
import { IBoiler } from "../../../models/boiler";

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
         switch (action.payload.columnNumber) {
            case 0:
               state.turbines[action.payload.rowNumber] = {
                  ...state.turbines[action.payload.rowNumber],
                  name: String(action.payload.value),
               };
               break;
            case 1:
               state.turbines[action.payload.rowNumber] = {
                  ...state.turbines[action.payload.rowNumber],
                  type: String(action.payload.value),
               };
               break;
            case 2:
               state.turbines[action.payload.rowNumber] = {
                  ...state.turbines[action.payload.rowNumber],
                  electricityPower: action.payload.value,
               };
               break;
            case 3:
               state.turbines[action.payload.rowNumber] = {
                  ...state.turbines[action.payload.rowNumber],
                  thermalPower: action.payload.value,
               };
               break;
            case 4:
               state.turbines[action.payload.rowNumber] = {
                  ...state.turbines[action.payload.rowNumber],
                  powerGeneration: action.payload.value,
               };
               break;
            default:
               break;
         }
      },
      setTurbineName: (state, action: PayloadAction<setStringNamePayload>) => {
         switch (action.payload.columnNumber) {
            case 0:
               state.turbines[action.payload.index] = {
                  ...state.turbines[action.payload.index],
                  name: action.payload.value,
               };
               break;
            case 1:
               state.turbines[action.payload.index] = {
                  ...state.turbines[action.payload.index],
                  type: action.payload.value,
               };
               break;
            default:
               break;
         }
      },
      setBoilerValue: (state, action: PayloadAction<setTableValuePayload>) => {
         switch (action.payload.columnNumber) {
            case 0:
               state.boilers[action.payload.rowNumber] = {
                  ...state.boilers[action.payload.rowNumber],
                  name: String(action.payload.value),
               };
               break;
            case 1:
               state.boilers[action.payload.rowNumber] = {
                  ...state.boilers[action.payload.rowNumber],
                  type: String(action.payload.value),
               };
               break;
            case 2:
               state.boilers[action.payload.rowNumber] = {
                  ...state.boilers[action.payload.rowNumber],
                  perfomance: action.payload.value,
               };
               break;
            case 3:
               state.boilers[action.payload.rowNumber] = {
                  ...state.boilers[action.payload.rowNumber],
                  numOfLaunches: action.payload.value,
               };
               break;
            default:
               break;
         }
      },
      setBoilerName: (state, action: PayloadAction<setStringNamePayload>) => {
         switch (action.payload.columnNumber) {
            case 0:
               state.boilers[action.payload.index] = {
                  ...state.boilers[action.payload.index],
                  name: action.payload.value,
               };
               break;
            case 1:
               state.boilers[action.payload.index] = {
                  ...state.boilers[action.payload.index],
                  type: action.payload.value,
               };
               break;
            default:
               break;
         }
      },
   },
});

export const {
   setMonthsTableValue,
   setTurbineValue,
   setBoilerValue,
   setTurbineName,
   setBoilerName,
} = yearTaskSlice.actions;

export default yearTaskSlice.reducer;
