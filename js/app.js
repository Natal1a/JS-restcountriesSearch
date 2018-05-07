
const endpoint = 'https://restcountries.eu/rest/v2/all';
const countries = [];

fetch(endpoint)
  .then(resp => resp.json())
  .then(data => countries.push(...data));

  console.log(countries);

function findMatches(wordToMatch, countries){
  return countries.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    // console.log(place.name, place.capital);
    return place.name.match(regex) || place.capital.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
  const matchArray = findMatches(this.value, countries);
  const suggestions = document.querySelector('.suggestions');
  console.log(matchArray);
  const html = matchArray.map(place => {
    const population = numberWithCommas(place.population)
    const regex = new RegExp(this.value, 'gi');
    const countryName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
    const capitalName = place.capital.replace(regex, `<span class="hl">${this.value}</span>`);
    return `<li>
      <span>${countryName} (${capitalName})</span> <span class="info">
       ${population}</span>
    </li>`
  }).join('');
  suggestions.innerHTML = html;
}

const input = document.querySelector('.search');
input.addEventListener('change', displayMatches);
input.addEventListener('keyup', displayMatches);
