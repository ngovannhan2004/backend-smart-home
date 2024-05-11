import {IRoom} from "@/app/types/room";
import { UnitI } from "./unit";

export interface IDevice {
    id: number;
    name: string;
    description: string;
    status: boolean;
    pinMode: string;
    value: number;
    image: string;
    room?: IRoom;
    unit?: UnitI;
    isSensor: boolean;
    unitId: number;
    roomId: number;
}