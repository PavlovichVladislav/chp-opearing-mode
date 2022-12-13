import { IBoiler } from "../../../models/boiler";
import { ITaskItem } from "../../../models/taskItem";
import { ITurbine } from "../../../models/turbine";

export interface YearTaskState {
    data: ITaskItem[];
    turbines: ITurbine[];
    boilers: IBoiler[];
}

export interface setTableValuePayload {
    index: number;
    value: number;
    valueType: number;
}

export interface setStringNamePayload {
    index: number;
    value: string;
    valueType: number;
}
