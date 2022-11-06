import axios from 'axios';

import { baseURL } from '../config';

export const addVehicle = async (newItem) => {
    const { data } = await axios.post(baseURL + '/vehicle/add/', newItem);
    return data;
}

export const getAllVehicles = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/allVehicles');
    return data;
}

export const getSelectedVehicle = async (id) => {
    const { data } = await axios.get(baseURL + '/vehicle/getVehicle/' + id);
    return data;
}

export const getSelectedVehicleByNumber = async (num) => {
    const { data } = await axios.get(baseURL + '/vehicle/getVehicleByNumber/' + num);
    return data;
}

export const deleteVehicle = async (id) => {
    const { data } = await axios.get(baseURL + '/vehicle/delete/' + id);
    return data;
}

export const editVehicle = async (newItem, id) => {
    const { data } = await axios.post(baseURL + '/vehicle/update/' + id, newItem);
    return data;
}

export const assignVehicle = async (newItem) => {
    const { data } = await axios.post(baseURL + '/assignVehicle/add/', newItem);
    return data;
}

export const getAvaiableNotAssignedVehicles = async (date) => {
    console.log(date);
    const { data } = await axios.get(baseURL + '/assignVehicle/getAvaiableNotAssignedVehicles/' + date);
    return data;
}