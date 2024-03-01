const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdown = document.querySelectorAll(".selectContainer select")
const enteredValue = document.querySelector("#input").value
const from = document.querySelector(".from select")
const to = document.querySelector(".to select")
const output = document.querySelector("#output")
const submit = document.querySelector("#submit")



for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change", (e)=>{
    updateFlag(e.target)
    })
}


let newUrl

const updateFlag = (e) => {
    const currCode = e.value
    const countryCode = countryList[currCode]
    const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = e.parentElement.querySelector("img")
    img.src = newSrc    
}


let getResponse = async () => {
    newUrl = `${baseUrl}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`
    let response = await fetch(newUrl)
    let data = await response.json()
    let ans = data[to.value.toLowerCase()]
    output.innerHTML = Math.round(ans * enteredValue)

}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    getResponse()
    
})

