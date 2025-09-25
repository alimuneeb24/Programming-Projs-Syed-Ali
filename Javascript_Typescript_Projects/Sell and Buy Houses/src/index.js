async function fetchhouses() {
    try {
        let resp = await fetch('houses.json');
        let data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function renderhouses(filters = {}) {
    const houses = await fetchhouses();
    const hsdiv = document.getElementById('houses');

    hsdiv.innerHTML = `
        <label>
            <input type="checkbox" id="pricefilter" ${filters.price ? "checked" : ""}> Less than 1,000,000 euros
        </label>
        <label>
            <input type="checkbox" id="sizefilter" ${filters.size ? "checked" : ""}> Less than 200m²
        </label>
        <div id="housesList"></div>
    `;

    const housesListDiv = document.getElementById('housesList');

    const filteredHouses = houses.filter(house => {
        const filterByPrice = filters.price ? house.price < 1000000 : true;
        const filterBySize = filters.size ? house.size < 200 : true;
        return filterByPrice && filterBySize;
    });

    filteredHouses.forEach(house => {
        const housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        const img = document.createElement('img');
        img.src = house.image;
        img.className = 'houseImage';

        const header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = house.address;

        const size = document.createElement('p');
        size.className = 'sizem';
        size.innerHTML = `${house.size} m²`;

        const desc = document.createElement('p');
        desc.className = 'descri';
        desc.innerHTML = house.text;

        const price = document.createElement('p');
        price.className = 'pric';
        const numberstr = new Intl.NumberFormat('fi-FI').format(house.price);
        price.innerHTML = `${numberstr} €`;

        housecontainer.appendChild(img);
        housecontainer.appendChild(header);
        housecontainer.appendChild(size);
        housecontainer.appendChild(desc);
        housecontainer.appendChild(price);

        housesListDiv.appendChild(housecontainer);
    });
    attachEventListeners();
}

function attachEventListeners() {
    const priceFilter = document.getElementById('pricefilter');
    const sizeFilter = document.getElementById('sizefilter');

    const updateFilters = () => {
        const filters = {
            price: priceFilter.checked,
            size: sizeFilter.checked,
        };
        renderhouses(filters);
    };

    priceFilter.removeEventListener('change', updateFilters);
    sizeFilter.removeEventListener('change', updateFilters);

    priceFilter.addEventListener('change', updateFilters);
    sizeFilter.addEventListener('change', updateFilters);
}

document.addEventListener('DOMContentLoaded', () => {
    renderhouses();
});
