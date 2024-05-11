import axiosClient from "@/app/utils/axiosInstance";
import {useQuery} from "react-query";
import type {IRoom} from "@/app/types/room";
import {AxiosError} from "axios";

export const fetchRooms = async (): Promise<IRoom[]> => {
    try {
        const response = await axiosClient.get('/room');
        console.log('refresh');

        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};


export const createRoom = async (room: Omit<IRoom, 'id'>): Promise<IRoom> => {
    try {
        const response = await axiosClient.post('/room', room);
        return response.data;
    } catch (error: any) {
        throw new Error(convertError(error));

    }
}
export const convertError = (error: any): string => {
    return typeof error.response.data.message === 'string' ? error.response.data.message : error.response.data.message.join(', ');


}
export const useRooms = () => {
    return useQuery<IRoom[], Error>('rooms', fetchRooms);
};
