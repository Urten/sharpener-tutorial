import API from "./api.js";

const candidates = ["mahesh", "ravi", "hari"]

const api = new API("https://crudcrud.com/api/aeffba1abb504d54b600012877e2d2dd/")


let data = {}


document.addEventListener("DOMContentLoaded", async () => {
    // console.log("DOM loaded")

    // try to get the already stored data
    
    for (let candidate of candidates) {
        try {
            const res = await api.getData(candidate)
            console.log(res)

        } catch {err} {
            console.log(err)
            api.createEndpoint(candidate)
        }
    }
})