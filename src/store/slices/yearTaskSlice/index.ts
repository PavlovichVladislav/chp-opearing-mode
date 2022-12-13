import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setStringNamePayload, setTableValuePayload, YearTaskState } from "./types";
import { ITaskItem } from "../../../models/taskItem";
import { ITurbine } from "../../../models/turbine";
import { IBoiler } from "../../../models/boiler";

const initialState: YearTaskState = {
   data: Array(12).map(function () {
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
      setTableValue: (state, action: PayloadAction<setTableValuePayload>) => {
         switch (action.payload.valueType) {
            case 1:
               state.data[action.payload.index] = {
                  ...state.data[action.payload.index],
                  electricity: action.payload.value,
               };
               break;
            case 2:
               state.data[action.payload.index] = {
                  ...state.data[action.payload.index],
                  power: action.payload.value,
               };
               break;
            case 3:
               state.data[action.payload.index] = {
                  ...state.data[action.payload.index],
                  warm: action.payload.value,
               };
               break;
            case 4:
               state.data[action.payload.index] = {
                  ...state.data[action.payload.index],
                  heatOutput: action.payload.value,
               };
               break;
            default:
               break;
         }
      },
      setTurbineValue: (state, action: PayloadAction<setTableValuePayload>) => {
         switch (action.payload.valueType) {
            case 0:
               state.turbines[action.payload.index] = {
                  ...state.turbines[action.payload.index],
                  name: String(action.payload.value),
               };
               break;
            case 1:
               state.turbines[action.payload.index] = {
                  ...state.turbines[action.payload.index],
                  type: String(action.payload.value),
               };
               break;
            case 2:
               state.turbines[action.payload.index] = {
                  ...state.turbines[action.payload.index],
                  electricityPower: action.payload.value,
               };
               break;
            case 3:
               state.turbines[action.payload.index] = {
                  ...state.turbines[action.payload.index],
                  thermalPower: action.payload.value,
               };
               break;
            case 4:
               state.turbines[action.payload.index] = {
                  ...state.turbines[action.payload.index],
                  powerGeneration: action.payload.value,
               };
               break;
            default:
               break;
         }
      },
      setTurbineName: (state, action: PayloadAction<setStringNamePayload>) => {
         switch (action.payload.valueType) {
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
         switch (action.payload.valueType) {
            case 0:
               state.boilers[action.payload.index] = {
                  ...state.boilers[action.payload.index],
                  name: String(action.payload.value),
               };
               break;
            case 1:
               state.boilers[action.payload.index] = {
                  ...state.boilers[action.payload.index],
                  type: String(action.payload.value),
               };
               break;
            case 2:
               state.boilers[action.payload.index] = {
                  ...state.boilers[action.payload.index],
                  perfomance: action.payload.value,
               };
               break;
            case 3:
               state.boilers[action.payload.index] = {
                  ...state.boilers[action.payload.index],
                  numOfLaunches: action.payload.value,
               };
               break;
            default:
               break;
         }
      },
      setBoilerName: (state, action: PayloadAction<setStringNamePayload>) => {
         switch (action.payload.valueType) {
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

export const { setTableValue, setTurbineValue, setBoilerValue, setTurbineName, setBoilerName } = yearTaskSlice.actions;

export default yearTaskSlice.reducer;
