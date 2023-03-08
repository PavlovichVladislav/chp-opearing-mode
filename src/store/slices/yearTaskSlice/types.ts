import { IBoiler } from "../../../models/boiler";
import { ITaskItem } from "../../../models/taskItem";
import { ITurbine } from "../../../models/turbine";

export interface YearTaskState {
    monthsTableData: ITaskItem[];
    turbines: ITurbine[];
    boilers: IBoiler[];
}

export interface setTableValuePayload {
    rowNumber: number;
    value: number;
    columnNumber: number;
}

export interface setStringNamePayload {
    index: number;
    value: string;
    columnNumber: number;
}
