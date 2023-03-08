export interface ITaskItem {
    electricity: number;
    power: number;
    warm: number; 
    heatOutput: number;
}

export interface ITurbine {
    name: string;
    type: string;
    electricityPower: number;
    thermalPower: number;
    powerGeneration: number;
}

export interface IBoiler {
    name: string;
    type: string;
    perfomance: number;
    numOfLaunches: number;
}