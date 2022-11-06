import axios from 'axios';

import { baseURL } from '../config';

export const addEvent = async (newItem) => {
    const { data } = await axios.post(baseURL + '/events/add/', newItem);
    return data;
}

export const getAllEvents = async () => {
    const { data } = await axios.get(baseURL + '/events/allEvents');
    return data;
}

export const getEventsForSelectedDateAndLocation = async (date, location) => {
    const { data } = await axios.get(baseURL + '/events/getEventsForSelectedDateAndLocation/' + date + "/" + location);
    return data;
}

export const getSelectedEvent = async (id) => {
    const { data } = await axios.get(baseURL + '/events/getEvent/' + id);
    return data;
}

export const deleteEvent = async (id) => {
    const { data } = await axios.get(baseURL + '/events/delete/' + id);
    return data;
}

export const editEvent = async (newItem, id) => {
    const { data } = await axios.post(baseURL + '/events/update/' + id, newItem);
    return data;
}


