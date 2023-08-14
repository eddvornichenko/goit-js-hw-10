const url = 'https://api.thecatapi.com/v1';
const api_key = "live_lGMUTAe9W1QeOKbzlMy7xt6Nvb63P60YDLYN9UU9Uwn7PSIZFS77YTOGYADgU2FV";


export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });       
};

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });  
};
