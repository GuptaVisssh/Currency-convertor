// let url ="https://api.currencyapi.com/v3/latest?apikey=cur_live_JNrJEHSDXwv20G9o7MjW0xG2WmDarSW1eqP2YBIH";


const exchangeRates = {usd: 1};
const fromCurrency = document.querySelector(".select-container #from")
const toCurrency = document.querySelector(".select-container #to")
const inputAmount =document.querySelector(".converter-container .input-amount")
const result = document.querySelector(".converter-container .result")
const swapBtn = document.querySelector(".select-container .swap-btn")




let apiData = async () =>{
    try {
        const res = await fetch('https://www.floatrates.com/daily/usd.json')
        const data = await res.json()
        // console.log(data);

        if(res.ok){
            for(const currencyCode in data){

                const currencyInfo = data[currencyCode]
                const {code,name} = currencyInfo

                exchangeRates[currencyCode] = currencyInfo.rate
                
                

                const option1 =document.createElement("option")
                option1.value = code;
                option1.textContent = `${code} - ${name}`

                const option2 = option1.cloneNode(true)


                fromCurrency.appendChild(option1)     
                toCurrency.appendChild(option2)           
                
                
            }
            // console.log(exchangeRates);
            

            fromCurrency.value = fromCurrency.options[4].value
            toCurrency.value = toCurrency.options[8].value
            convert()
        }
        
    } catch (error) {
        console.log("Error loading currency data");
        
    }
}

apiData()



const convert = () =>{
    const inputValue = parseFloat(inputAmount.value)
    const fromCurrencyValue = fromCurrency.value.toLowerCase() 
    const toCurrencyValue = toCurrency.value.toLowerCase()


    const convertedValue = (inputValue * exchangeRates[toCurrencyValue])/exchangeRates[fromCurrencyValue]

    const resultValue  = `<span class="result-currency">${toCurrencyValue}</span> ${convertedValue.toFixed(2)}`

    result.innerHTML = resultValue;

}


toCurrency.addEventListener("change", convert)
fromCurrency.addEventListener("change", convert)
inputAmount.addEventListener("input", convert)


swapBtn.addEventListener("click", ()=>{
    const fromCurrencyValue = fromCurrency.value
    const toCurrencyValue = toCurrency.value

    fromCurrency.value=  toCurrencyValue
    toCurrency.value=fromCurrencyValue

    convert()

})