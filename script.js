const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdown = document.querySelectorAll(".selectContainer select")

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


const update = async () => {
    
    const enteredValue = document.querySelector("#input").value
    if(enteredValue === "" || enteredValue < 1){
        enteredValue = 1
        enteredValue.value = "1"
    }

    let newUrl = `${baseUrl}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`
    let response = await fetch(newUrl)
    let data = await response.json()
    let rate = data[to.value.toLowerCase()]
    let finamlAmount = (enteredValue * rate).toFixed(2)

    output.innerText = finamlAmount
}


window.addEventListener("load", () => {
    update()
})


const updateFlag = (e) => {
    const currCode = e.value
    const countryCode = countryList[currCode]
    const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = e.parentElement.querySelector("img")
    img.src = newSrc    
}




submit.addEventListener('click', async (e) => {
    e.preventDefault()
    const enteredValue = document.querySelector("#input").value
    if(enteredValue === "" || enteredValue < 1){
        enteredValue = 1
        enteredValue.value = "1"
    }
    
    let newUrl = `${baseUrl}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`
    let response = await fetch(newUrl)
    let data = await response.json()
    let rate = data[to.value.toLowerCase()]
    let finamlAmount = (enteredValue * rate).toFixed(2)

    output.innerText = finamlAmount
       
})

