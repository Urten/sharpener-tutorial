// Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// DOM elements
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const errorMessages = document.getElementById("errorMessages");
const usersTable = document.getElementById("usersTable");

// UI helpers
function showError(message) {
  errorMessages.innerHTML = `
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      ${message}
    </div>
  `;
}

function clearError() {
  errorMessages.innerHTML = "";
}

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
}

// Render users
function renderUsers(users) {
  if (!users || users.length === 0) {
    usersTable.innerHTML = `
      <div class="text-gray-500 text-center py-6">
        No users found.
      </div>
    `;
    return;
  }

  usersTable.innerHTML = `
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="text-left px-3 py-2">ID</th>
          <th class="text-left px-3 py-2">Name</th>
          <th class="text-left px-3 py-2">Email</th>
          <th class="text-left px-3 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr class="border-b hover:bg-gray-50">
            <td class="px-3 py-2">${user.id}</td>
            <td class="px-3 py-2">${user.name}</td>
            <td class="px-3 py-2">${user.email}</td>
            <td class="px-3 py-2">
              <button
                class="text-red-600 hover:underline"
                onclick="deleteUser(${user.id})"
              >
                Delete
              </button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// API calls
async function fetchUsers() {
  try {
    clearError();
    const res = await api.get("/users");
    renderUsers(res.data);
  } catch (err) {
    console.error(err);
    showError("Failed to fetch users");
  }
}

async function addUser(name, email) {
  try {
    clearError();
    await api.post("/users", { name, email });
    clearForm();
    fetchUsers();
  } catch (err) {
    console.error(err);

    if (err.response?.status === 400) {
      showError("Name and email are required");
    } else if (err.response?.status === 409) {
      showError("Email already exists");
    } else {
      showError("Failed to add user");
    }
  }
}

async function deleteUser(id) {
  if (!confirm("Delete this user?")) return;

  try {
    clearError();
    await api.delete(`/users/${id}`);
    fetchUsers();
  } catch (err) {
    console.error(err);
    showError("Failed to delete user");
  }
}

// Event listeners
userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    showError("Both name and email are required");
    return;
  }

  addUser(name, email);
});

// Initial load
fetchUsers();
