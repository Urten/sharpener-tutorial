export default class API {
	constructor(url) {
		this.url = url;
	}

	async createEndpoint(candidate) {
		const payload = {
			voters: [],
		};
		try {
			await axios.post(this.url + candidate, payload)
		} catch (err) {
			console.log(err)
		}
	}

	async getData(candidate) {
		try {
			const res = await axios.get(this.url + candidate);
			return res;
		} catch (err) {
			console.log(err);
		}
	}


    async updateData(candidate, updatedData) {
        try {
            await axios.post(this.url + candidate, updatedData)
        } catch (err) {
            console.log(err)
        }
    }
}
