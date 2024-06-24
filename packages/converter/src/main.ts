import './style.css';

const env = import.meta.env;
const apiKey = (env.VITE_CONVERTER_API_KEY);

// Variables
let currencies_url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;
let currencies : any = null;
const baseCurrency = document.querySelector('select#baseCurrency') as HTMLSelectElement;
const targetCurrency = document.querySelector('select#targetCurrency') as HTMLSelectElement;

// Au clic sur le bouton "Convertir", on récupère les valeurs des devises sélectionnées (base, target)
addEventListener('submit', (evt) => {
    evt.preventDefault();
    const amount = document.querySelector('input#amount') as HTMLInputElement;
    const baseCurrencySelected = baseCurrency.value;
    const targetCurrencySelected = targetCurrency.value;
    console.log(baseCurrencySelected, targetCurrencySelected);
    makeRequest(baseCurrencySelected, targetCurrencySelected, amount.value);
});

// 3) Lorsque l'utilisateur clique sur le bouton "Convertir", on récupère les valeurs des devises sélectionnées
function makeRequest(baseCurrencySelected: string, targetCurrencySelected: string, amount: string) {
    let base : string = baseCurrencySelected;
    let target : string = targetCurrencySelected;
    let amountResult = document.querySelector('span#resAmount') as HTMLSpanElement;
    let resBaseCurrency = document.querySelector('span#resBaseCurrency') as HTMLSpanElement;
    let resValue = document.querySelector('span#resValue') as HTMLSpanElement;
    let resTargetCurrency = document.querySelector('span#resTargetCurrency') as HTMLSpanElement;
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${base}&currencies=${target}`;
    console.log(url);
    const data = fetch(url)
        .then(response => response.json())
        .then(res => {
            let n = res.data[target];
            console.log(`${amount} ${base} => `, parseFloat(amount) * n.toFixed(2), ` ${target}`);
            let valueOfResult = parseFloat(amount) * n;
            amountResult.textContent = amount;
            resBaseCurrency.textContent = base;
            resValue.textContent = valueOfResult.toFixed(2).toString();
            resTargetCurrency.textContent = target;
            return res.data;
        })
        .catch(error => console.error(error));
    return data;
}

// 1) Au chargement de la page, on récupère les devises disponibles et on les ajoute dans les listes déroulantes
currencies = fetch(currencies_url)
    .then(response => response.json())
    .then(data => {
        currencies = data;
        for (const currency in currencies.data) {
            const option = document.createElement('option');
            option.value = currency;
            option.text = currency;
            baseCurrency.innerHTML += option.outerHTML;
            targetCurrency.innerHTML += option.outerHTML;
        }
    })
    .catch(error => console.error(error));
