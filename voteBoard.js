import { api } from "./index.js"; // importing instantiated api object
import { capitalizeFirst } from "./utils.js";

export default class VoteBoard {
	// lets create the voteboard first
	constructor(candidates) {
		this.candidates = candidates;
		this.initialDisplay();
	}

	async addVoter(candidate, voterName, id) {
		const li = document.getElementById(candidate).children[0];
		if (!id) {
			id = await api.addVoter(candidate, voterName);
		}
		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "delete";

		const voterLi = document.createElement("li");
		voterLi.id = id;
		voterLi.textContent = capitalizeFirst(voterName);
		voterLi.append(deleteBtn);
		li.appendChild(voterLi);

		deleteBtn.addEventListener("click", async () =>
			await this.deleteVoter(candidate, id)
		);

		this.recountTotal()
		this.totalCandidateVotes(candidate)
	}

	async deleteVoter(candidate, id) {
		await api.deleteVoter(candidate, id);
		document.getElementById(id).remove()

		this.recountTotal()
		this.totalCandidateVotes(candidate)
	}

	async initialDisplay() {
		// get the data from the api

		const ul = document.querySelector(".candidate-list");

		for (let candidate of this.candidates) {
			const li = document.createElement("li");
			li.id = candidate;
			li.textContent = capitalizeFirst(candidate);

			ul.appendChild(li);

			// first list done

			const voterUl = document.createElement("ul");
			voterUl.className = "voter-list";
			li.appendChild(voterUl);

			const data = await api.getData(candidate);
			try {
				if (data.length > 0 && data.length !== undefined) {
					for (let voter of data) {
						const id = voter["_id"];
						console.log("voter_id", voter["_id"])
						const voterName = voter["voterName"];
						await this.addVoter(candidate, voterName, id);
					}
				}
			} catch (err) {
				console.log(err)
				continue
			} finally{
						// make total vote counter for all the candidates

			this.totalCandidateVotes(candidate)
			}


		}







		this.recountTotal()
	}

	totalCandidateVotes(candidate) {
		const li = document.querySelector("#" + candidate)
		const voterUl = li.querySelector(".voter-list")


		const votes = voterUl ? voterUl.children.length : 0;

		let totalVotes = li.querySelector(".candidate-vote-count");
		if (!totalVotes) {
			totalVotes = document.createElement("p");
			totalVotes.className = "candidate-vote-count";
			totalVotes.textContent = `Total Votes: ${votes}`;
			li.appendChild(totalVotes);
		}

		totalVotes.textContent = `Total Votes: ${votes}`;
	}

	recountTotal() {
		let total = 0;

		// Get all voter list elements under each candidate
		const candidateLis = document.querySelectorAll(".candidate-list > li");

		candidateLis.forEach(candidateLi => {
			const voterList = candidateLi.querySelector(".voter-list");
			if (voterList) {
				total += voterList.children.length;
			}
		});

		// Update total votes text
		const totalP = document.querySelector(".total-votes");
		totalP.textContent = `Total Votes: ${total}`;
	}

}
