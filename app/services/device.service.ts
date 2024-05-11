import axiosClient from "@/app/utils/axiosInstance";
import {useQuery} from "react-query";
import {IDevice} from "@/app/types/device";
import {convertError} from "@/app/services/room.service";

const fetchDevices = async (): Promise<IDevice[]> => {
    try {
        const response = await axiosClient.get('/device');
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createDevice = async (device: Omit<IDevice, 'id'>): Promise<IDevice> => {
    try {
        const response = await axiosClient.post('/device', device);
        return response.data;
    } catch (error: any) {
        throw new Error(convertError(error));
    }
}

export const updateDevice = async (id: number, status:boolean) => {
    try {
        const response = await axiosClient.patch(`/device/${id}`, {status});
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const useDevices = () => {
    return useQuery<IDevice[], Error>('devices', fetchDevices);
};