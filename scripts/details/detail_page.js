let moon = document.querySelector('#moon');
let body = document.querySelector('body');
let mode = document.querySelector('#mode');

let flag_image = document.querySelector('.flag img')
let country_name = document.querySelector('.country-name')
let native_name = document.querySelector('#native_name');
let population = document.querySelector('#population');
let region = document.querySelector('#region');
let sub_region = document.querySelector('#sub_region');
let capital = document.querySelector('#capital');
let tld = document.querySelector('#tld');
let currencies = document.querySelector('#currency');
let langs = document.querySelector('#langs');
let border_countries = document.querySelector('.border-countries');

let DARK = false;

body.classList.add('dark')
moon.classList.add('fas')
moon.classList.add('far')

body.classList.toggle('dark');
moon.classList.toggle('fas')


let darkmode = () => {
    let body_mode = body.classList.toggle('dark');
    moon.classList.toggle('fas');
    moon.classList.toggle('far');
    return body_mode;
}


if (localStorage.getItem('DARK') == 'true' && DARK == false) {
    DARK = darkmode();
    localStorage.setItem('DARK', DARK);
}

mode.addEventListener('click', () => {
    DARK = darkmode();
    localStorage.setItem('DARK', DARK);
})


function renderPage(_name, _imgsrc, _region, _population, _sub_region, _capital, _native_name, _langs, _border_countries, _tld, _currencies) {
    flag_image.src = _imgsrc;
    country_name.innerHTML = _name;
    native_name.innerHTML = _native_name;
    population.innerHTML = _population;
    region.innerHTML = _region;
    sub_region.innerHTML = _sub_region;
    capital.innerHTML = _capital;
    tld.innerHTML = _tld.join(', ');
    langs.innerHTML = _langs.join(', ');
    currencies.innerHTML = _currencies.join(', ');
    while(border_countries.children.length>0){
        let border = border_countries.children[0];
        border.parentNode.removeChild(border);
    }
    for (let bc of _border_countries) {
        let anchor = document.createElement('span')
        anchor.innerHTML = bc;
        anchor.addEventListener('click', () => {
            localStorage.setItem('country', load_by_code(bc))
        })
        border_countries.appendChild(anchor);

    }
}

async function fetchByFullName(country_name) {
    let countryData = null;
    let url = `https://restcountries.eu/rest/v2/name/${country_name.toLowerCase()}?fullText=true&fields=name;capital;flag;population;region;subregion;currencies;languages;borders;topLevelDomain;nativeName`;
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
function load_by_full_name(country_name) {
    fetchByFullName(country_name).then(function (data) {
        let country = data[0]
        let { name, flag, population, region, capital, subregion, languages, currencies, borders, topLevelDomain, nativeName } = country
        languages = languages.map(language => language.name)
        currencies = currencies.map(currency => currency.name)
        renderPage(name, flag, region, population, subregion, capital, nativeName, languages, borders, topLevelDomain, currencies)

    }).catch(function (error) {
        flash(`${country_name} not found`, ERROR)
        console.error(error.message);
    })
}

function load_by_code(code) {
    let name = null;
    fetch(`https://restcountries.eu/rest/v2/alpha/${code}?fields=name;capital;flag;population;region;subregion;currencies;languages;borders;topLevelDomain;nativeName`)
        .then(response => response.json())
        .then(data => {
            
            let { name, flag, population, region, capital, subregion, languages, currencies, borders, topLevelDomain, nativeName } = data
            languages = languages.map(language => language.name)
            currencies = currencies.map(currency => currency.name)
            renderPage(name, flag, region, population, subregion, capital, nativeName, languages, borders, topLevelDomain, currencies)

        }).catch(error => {
            console.error(error.message);
        })
    return name
}

// renderPage(
//     'United States of America',
//     "https://restcountries.eu/data/ind.svg",
//     "Americas",
//     323947000,
//     "Northern America",
//     "Washington, D.C.",
//     "United States",
//     ['English'],
//     ["CAN", "MEX"],
//     [".us"],
//     ['United States dollar']
// )

if (localStorage.getItem('country') !== 'undefined') {
    load_by_full_name(localStorage.getItem('country'))
    localStorage.setItem('country', 'undefined');
} else {
    window.location = '/index.html'
}

