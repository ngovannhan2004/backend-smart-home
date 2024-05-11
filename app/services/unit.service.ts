import axiosClient from "@/app/utils/axiosInstance";

import {useQuery} from "react-query";

import {UnitI} from "@/app/types/unit";


export const fetchUnits = async (): Promise<UnitI[]> => {
    try {
        const response = await axiosClient.get('/unit');
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createUnit = async (unit: Omit<UnitI, 'id'>): Promise<UnitI> => {
    try {
        const response = await axiosClient.post('/unit', unit);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const useUnits = () => {
    return useQuery<UnitI[], Error>('units', fetchUnits);
};
