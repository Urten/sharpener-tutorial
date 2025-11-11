import API from "./api.js";
import { capitalizeFirst } from "./utils.js";
import VoteBoard from "./voteBoard.js"

axios.defaults.headers.common["Content-Type"] = "application/json";


const candidates = ["mahesh", "ravi", "hari", "loki", "thor"]

export const api = new API("https://crudcrud.com/api/4219dc9989f34c01bf67486deb694891/")

const dummyData = {
    _id: "1243242342424",
    voters: [
        "rahul",
        "abinash",
        "abdul"
    ]
}


for(let candidate of candidates) {
    const candidateSelection = document.querySelector(".candidate-selection")
    const option = document.createElement("option")
    option.value = candidate.toLowerCase()
    option.textContent = capitalizeFirst(candidate)

    candidateSelection.append(option)

}



const board = new VoteBoard(candidates)


document.addEventListener("DOMContentLoaded", () => {


    // add functionality to form submit


    const form = document.querySelector("form")

    form.addEventListener("submit", addVoter)
    
})

board.recountTotal()

async function addVoter(event) {
    event.preventDefault()
    const voterName = event.target.name.value.toLowerCase()
    const candidate = event.target.candidate.value.toLowerCase()

    console.log(voterName)
    console.log(candidate)

    await board.addVoter(candidate, voterName)
    board.recountTotal()
}