export default class API {
	constructor(url) {
		this.url = url;
	}

	async addVoter(candidate, voterName) {
		try {
			const res = await axios.post(this.url + candidate, {voterName})
			console.log(res.data["_id"])
			return await res.data["_id"]
		} catch (err) {
			console.log(err)
		}
	}

	async deleteVoter(candidate, id) {
		try {
			const res = await axios.delete(this.url + candidate + "/" + id)
			console.log("Deleted:", res.status)
		} catch (err) {
			console.log(err)
		}
	}

	async getData(candidate) {
		try {
			const res = await axios.get(this.url + candidate) // this should return an array
			if (res.data.length > 0) {
				return res.data
			} 
		} catch (err) {
				console.log(err)
		}
	}
}