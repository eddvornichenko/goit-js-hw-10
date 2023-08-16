import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './style.css';

const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { selector, divCatInfo, loader, error } = ref;

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let arrBreedsId = [];

axios.get('https://api.thecatapi.com/v1/breeds', {
    headers: {
        'x-api-key': 'live_lGMUTAe9W1QeOKbzlMy7xt6Nvb63P60YDLYN9UU9Uwn7PSIZFS77YTOGYADgU2FV'
    }
})
.then(response => {
    response.data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: selector,
        data: arrBreedsId
    });
})
.catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function renderCatInfo(url, breed) {
    divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breed.name}" width="400"/></div><div class="box"><h1>${breed.name}</h1><p>${breed.description}</p><p><b>Temperament:</b> ${breed.temperament}</p></div>`
    divCatInfo.classList.remove('is-hidden');
}

function onSelectBreed(event) {
    if (divCatInfo.classList.contains('is-hidden')) {
        divCatInfo.classList.remove('is-hidden');
        return;
    }

    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    divCatInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
        headers: {
            'x-api-key': 'live_lGMUTAe9W1QeOKbzlMy7xt6Nvb63P60YDLYN9UU9Uwn7PSIZFS77YTOGYADgU2FV'
        }
    })
    .then(response => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');
        const { url, breeds } = response.data[0];

        renderCatInfo(url, breeds[0]);
    })
    .catch(onFetchError);
}

function onFetchError(error) {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
}
