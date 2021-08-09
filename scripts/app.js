let moon = document.querySelector('#moon');
let body = document.querySelector('body');
let mode = document.querySelector('#mode');
let filter = document.querySelector('.filter')
let dropdown = document.querySelector('#dropdown');
let region = document.querySelector('#region');
let dropdown_items = document.querySelectorAll('.dropdown-item')
let flash_element = document.querySelector('.flash');
let flash_button = document.querySelector('.flash-button');
let flash_message = document.querySelector('.flash-message');
let search_bar = document.querySelector('#search_bar');
let countries = document.querySelector('.countries');

let ERROR= 'e';
let SUCCESS= 's';
let DARK = false;
localStorage.setItem('country','undefined');
flash_element.classList.add('display');

let display_flash = () => flash_element.classList.toggle('display');

let display_flash_status = true;

flash_button.addEventListener('click', () => {
    display_flash_status = display_flash();
})

function flash(msg,mode){
    // flash_element.classList.remove('flash_animation');
    flash_message.innerHTML = msg;
    if(mode.toLowerCase() === 'e'){
        flash_element.classList.add('redColor')
        flash_element.classList.remove('greenColor');
    }else if(mode.toLowerCase() === 's'){
        flash_element.classList.remove('redColor')
        flash_element.classList.add('greenColor')
    }
    if(display_flash_status){
        display_flash_status = display_flash();
    }
    // flash_element.classList.add('flash_animation');
    
}

body.classList.add('dark')
moon.classList.add('fas')
moon.classList.add('far')

body.classList.toggle('dark');
moon.classList.toggle('fas')



let darkmode = () => {
   let body_mode =  body.classList.toggle('dark');
    moon.classList.toggle('fas');
    moon.classList.toggle('far');
    return body_mode;
}

if(localStorage.getItem('DARK') == 'true' && DARK == false){
    DARK = darkmode();
    localStorage.setItem('DARK', DARK);
}
mode.addEventListener('click', () => {
   DARK =  darkmode();
   localStorage.setItem('DARK', DARK);
})

let isNoDropdown = true
dropdown.classList.add('display')
let showDropdown = () => {
    isNoDropdown = dropdown.classList.toggle('display')
}


filter.addEventListener('click', () => {
    showDropdown();
})

load_countries();

function clearCountries() {
    while (countries.children.length > 0) {
        let country = countries.children[0];
        country.parentNode.removeChild(country);
    }
}

// filter
for (let drop_item of dropdown_items) {
    drop_item.addEventListener('click', () => {
        search_bar.value = '';
        if (region.innerHTML !== drop_item.innerHTML) {
            if (!isNoDropdown) {
                region.innerHTML = drop_item.innerHTML;
            }
            if (!display_flash_status) {
                display_flash();
            }
            load_country_by_region(region.innerText.toLowerCase());
        }
    })
}
let SEARCH_RESULTS = false;
// search bar
search_bar.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        if (!display_flash_status) {
            display_flash();
        }
        region.innerHTML = 'Filter by region'
        // prevent html in search bar
        let strippedString = event.target.value.replace(/(<([^>]+)>)/gi, "");
        if(strippedString.length === 0){
            SEARCH_RESULTS = false;
            window.location = '/index.html'
        }else{
            SEARCH_RESULTS = true;
            load_by_name(strippedString);
        }
        
    }
})

function createCountry(_name, _imgsrc, _population, _region, _capital) {
    let card = document.createElement("div")
    let flag = document.createElement("div")
    let img = document.createElement("img")
    let data = document.createElement("div")
    let country_name = document.createElement("h3")
    let data_list = document.createElement("ul")
    let population = document.createElement("li")
    let region = document.createElement("li")
    let capital = document.createElement("li")
    card.appendChild(flag)
    flag.appendChild(img)
    card.appendChild(data)
    data.appendChild(country_name)
    data.appendChild(data_list)
    data_list.appendChild(population)
    data_list.appendChild(region)
    data_list.appendChild(capital)
    countries.appendChild(card)
    card.className = "card"
    flag.className = "flag"
    data.className = "data"
    img.alt = "flag image"
    img.src = `${_imgsrc}`
    img.backgroundColor = 'red';
    country_name.innerHTML = `${_name}`
    population.innerHTML = `Population: ${_population}`
    region.innerHTML = `Region: ${_region}`
    capital.innerHTML = `Capital: ${_capital}`

    card.addEventListener('click',() => {
        localStorage.setItem('country',_name);
        window.location = 'https://sudarshan2718.github.io/rest-countries-api/details.html'
    })
}

window.addEventListener('scroll', async () => {

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
        
        if (search_bar.value.length === 0 && region.innerText === 'Filter by region' && SEARCH_RESULTS === false) {
            try {
                load_countries();
            } catch (err) {
                flash(err.message,'E');
                console.log(err.message)
            }
        }
        
    }
})
