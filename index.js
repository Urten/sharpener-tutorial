// Add form submit event listener when the page loads
document.querySelector('form').addEventListener('submit', handleFormSubmit);

// Initialize vote counts
const voteCounts = {
    suresh: 0,
    deepank: 0,
    abhik: 0
};

// Load initial vote counts
async function initializeVoteCounts() {
    try {
        for (const candidate of ['suresh', 'deepank', 'abhik']) {
            const response = await axios.get(url + '/' + candidate);
            if (response.data && response.data.length > 0) {
                updateVoteDisplay(candidate, response.data.length);
            }
        }
    } catch (err) {
        console.error('Error loading initial votes:', err);
    }
}

// Call initialization when page loads
initializeVoteCounts();

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = event.target.name.value.trim();
    const toVote = event.target.monitor.value;
    
    if (!name) {
        alert('Please enter your name');
        return;
    }

    try {
        const data = {
            candidateName: toVote,
            voterName: name,
            timestamp: new Date().toISOString()
        };

        // Add vote to database
        const response = await addToDb(data, toVote);
        
        if (response) {
            // Update the UI
            updateVoteDisplay(toVote, null, true);
            
            // Create vote entry with delete button
            const voteList = document.getElementById(toVote);
            const voteEntry = document.createElement('div');
            voteEntry.className = 'vote-entry';
            voteEntry.innerHTML = `
                <span>${name}</span>
                <button onclick="handleDelete('${response.data._id}', '${toVote}', this)">Delete Vote</button>
            `;
            voteList.appendChild(voteEntry);
            
            // Clear the form
            event.target.name.value = '';
            event.target.monitor.selectedIndex = 0;
        }
    } catch (err) {
        console.error('Error submitting vote:', err);
        alert('Error submitting your vote. Please try again.');
    }
}


const url = "https://crudcrud.com/api/32011895ccbb4e54b863882b98f7e25d";

// Update vote display in the UI
function updateVoteDisplay(candidate, count = null, increment = false) {
    const candidateLi = document.getElementById(candidate);
    if (!candidateLi) return;
    
    if (count === null && increment) {
        voteCounts[candidate]++;
    } else if (count !== null) {
        voteCounts[candidate] = count;
    }
    
    // Update the display
    let displayText = candidateLi.textContent.split(':')[0];
    candidateLi.textContent = `${displayText}: ${voteCounts[candidate]} votes`;
}

// Handle vote deletion
async function handleDelete(id, candidateName, buttonElement) {
    try {
        await deleteFromDb(id, candidateName);
        // Remove the vote entry from UI
        const voteEntry = buttonElement.parentElement;
        voteEntry.remove();
        // Update vote count
        voteCounts[candidateName]--;
        updateVoteDisplay(candidateName, voteCounts[candidateName]);
    } catch (err) {
        console.error('Error deleting vote:', err);
        alert('Error deleting the vote. Please try again.');
    }
}

// Database interaction functions
async function addToDb(data, name) {
    try {
        const response = await axios.post(`${url}/${name}`, data);
        return response;
    } catch (err) {
        console.error('Error adding to database:', err);
        throw err;
    }
}

async function getFromDb(name) {
    try {
        const response = await axios.get(`${url}/${name}`);
        return response;
    } catch (err) {
        console.error('Error getting from database:', err);
        throw err;
    }
}

async function deleteFromDb(id, name) {
    try {
        const response = await axios.delete(`${url}/${name}/${id}`);
        return response;
    } catch (err) {
        console.error('Error deleting from database:', err);
        throw err;
    }
}

async function updateDb(id, data, name) {
    try {
        const response = await axios.put(`${url}/${name}/${id}`, data);
        return response;
    } catch (err) {
        console.error('Error updating database:', err);
        throw err;
    }
}

