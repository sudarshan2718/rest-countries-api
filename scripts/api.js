
let country_index = 0;


async function fetchAllCountries() {
    let countryData = null;
    let url = "https://restcountries.eu/rest/v2/all?fields=name;capital;flag;population;region;subregion;currencies;languages;borders;topLevelDomain"
    await fetch(url)
        .then(function (response) {
            return response.json()
        }).then(data => {
            countryData = data;
        })
        .catch(function (error) {
            flash(`request failed, try again`, ERROR)
            console.error(error.message);
        });
    return countryData;
}

async function fetchByregion(country_region) {
    let countryData = null;
    let url = `https://restcountries.eu/rest/v2/region/${country_region.toLowerCase()}?fields=name;capital;flag;population;region;subregion;currencies;languages;borders;topLevelDomain`;
    await fetch(url)
        .then(function (response) {
            return response.json()
        }).then(data => {
            countryData = data;
        })
        .catch(function (error) {
            flash(`${country_region} not found`, ERROR)
            console.error(error.message);
        });
    return countryData;
}
// name, flag, population, region, capital
async function fetchByName(country_name) {
    let countryData = null;
    let url = `https://restcountries.eu/rest/v2/name/${country_name.toLowerCase()}?fields=name;capital;flag;population;region;`;
    await fetch(url)
        .then(function (response) {
            return response.json()
        }).then(data => {
            countryData = data;
        })
        .catch(function (error) {
            flash(`${country_name} not found`, ERROR)
            console.error(error.message);
        });
    return countryData;
}

async function fetchByFullName(country_name) {
    let countryData = null;
    let url = `https://restcountries.eu/rest/v2/name/${country_name.toLowerCase()}?fullText=true&fields=name;capital;flag;population;region;subregion;currencies;languages;borders;topLevelDomain`;
    await fetch(url)
        .then(function (response) {
            return response.json()
        }).then(data => {
            countryData = data;
        })
        .catch(function (error) {
            flash(`${country_name} not found`, ERROR)
            console.error(error.message);
        });
    return countryData;
}

function load_countries() {
    fetchAllCountries().then(data => {
        setTimeout(() => {
            if (country_index + 10 <= data.length) {
                let i = country_index
                while (i < country_index + 10) {
                    let { name, flag, population, region, capital } = data[i]
                    createCountry(name, flag, population, region, capital)
                    ++i;
                }
                country_index = i;
            }
        }, 500)



    }).catch(function (error) {
        flash(`request failed, try again`, ERROR)
        console.error(error.message);
    })
}

function load_country_by_region(country_region) {
    clearCountries();
    fetchByregion(country_region).then(function (data) {
        for (let country of data) {
            let { name, flag, population, region, capital } = country
            createCountry(name, flag, population, region, capital)
        }
        // console.log(data.length)
    }).catch(function (error) {
        flash(`${country_region} is not a region`, ERROR)
        console.error(error.message);
    })
}

function load_by_name(country_name) {
    clearCountries();
    fetchByName(country_name).then(function (data) {
        for (let country of data) {
            let { name, flag, population, region, capital } = country
            createCountry(name, flag, population, region, capital)
        }
    }).catch(function (error) {
        flash(`${country_name} is not a country`, ERROR)
        console.error(error.message);
    })
}

function load_by_full_name(country_name) {
    clearCountries();
    fetchByFullName(country_name).then(function (data) {
        for (let country of data) {
            let { name, flag, population, region, capital } = country
            createCountry(name, flag, population, region, capital)
        }
        // console.log(data.length)
    }).catch(function (error) {
        flash(`${country_name} not found`, ERROR)
        console.error(error.message);
    })
}








// createCountry('India', "https://restcountries.eu/data/ind.svg", 1295210000, 'Asia', 'New Delhi')
// main page
// flag, name, population, region, capital
// "https://restcountries.eu/data/ind.svg"
// India
// भारत
// 1295210000
// Asia
// New Delhi

// details
// flag
// name, native name, population, region, sub region, capital
// top level domain , currencies, languages
// border countries

// https://restcountries.eu/rest/v2/all?fields=name;capital;flag;population;region;subregion;currencies;languages;borders