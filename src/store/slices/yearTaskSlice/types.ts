import { ITaskItem, IBoiler, ITurbine } from "../../../models/tableDataModels";

export interface YearTaskState {
    monthsTableData: ITaskItem[];
    turbines: ITurbine[];
    boilers: IBoiler[];
}

export interface setTableValuePayload {
    rowNumber: number;
    value: number | string;
    columnNumber: number;
}
