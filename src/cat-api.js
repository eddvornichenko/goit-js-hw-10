import axios from 'axios';

const url = 'https://api.thecatapi.com/v1';
const api_key = "live_lGMUTAe9W1QeOKbzlMy7xt6Nvb63P60YDLYN9UU9Uwn7PSIZFS77YTOGYADgU2FV";

export function fetchBreeds() {
    return axios.get(`${url}/breeds`, { params: { api_key } })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.response.status);
        });
};

export function fetchCatByBreed(breedId) {
    return axios.get(`${url}/images/search`, { params: { api_key, breed_ids: breedId } })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.response.status);
        });
};
