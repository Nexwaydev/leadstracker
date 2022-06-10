let myLeads = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const tabBtn = document.querySelector("#tab-btn")
const deleteBtn = document.querySelector("#delete-btn")
const ulEl = document.querySelector("#ul-el")

// getting the leads from localStorage and turning it back into an array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// checking if leadsFromLocalStorage is truthy and setting
// myLeads to the leadsFromLocalStorage we parse
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}


// creating an empty variable listItem to hold the html list items
// to avoid manipulating the dom every time the loop runs 
function render(leads) {
  let listItem = ""
  for (let i = 0; i < leads.length; i++) {
    listItem += `<li>
                 <a target="_blank" href="${leads[i]}">${leads[i]}</a>
               </li>`
  }
  ulEl.innerHTML = listItem
}


// the input button saves input value/the leads to localStorage
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})


tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)
  })
})


deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})





