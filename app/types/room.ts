import {IDevice} from "@/app/types/device";

export interface IRoom {
    id: number;
    name: string;
    description: string;
    devices?: IDevice[];
}