let search_countries = document.querySelector("#search_countries")
search_countries.classList.add("display")
let display_search_countries = () => search_countries.classList.toggle("display")
let country_names = null;
let container = document.querySelector(".container")

fetch('https://sudarshanvemarapu.github.io/rest-countries-api/countries.json').then(response => response.json()).then(data => {
    data = data.map((c) => {
        let li = document.createElement("li")
        li.className = 'dropdown-country'
        li.innerHTML = c.name
        li.addEventListener("click", () => {
            search_bar.value = li.innerHTML
            load_by_name(li.innerText);
        })
        return li
    })
    country_names = data;
}).catch(error => {
    console.error(error.message)
})

function lettersOnly(code) {
    var charCode = code;

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)

        return true;
    else
        return false;
}

search_bar.addEventListener('keyup', (event) => {
    while(search_countries.children.length > 0){
        let country = search_countries.children[0];
        country.parentNode.removeChild(country);
    }
    
    if (country_names  && lettersOnly(event.keyCode) && event.target.value.length > 0) {
        let dropdown_countries = country_names.filter((li) => {
            return li.innerText.toLowerCase().startsWith(event.target.value.toLowerCase());
        })
        try {
            
            for (let i = 0; i < Math.min(7,dropdown_countries.length); i++) {
                search_countries.appendChild(dropdown_countries[i])
            }
        }catch(error){
            console.error(error.message)
        }
        
    }
})

container.addEventListener('click', () => {
    while(search_countries.children.length > 0){
        let country = search_countries.children[0];
        country.parentNode.removeChild(country);
    }
})
display_search_countries();
