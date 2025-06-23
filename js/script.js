const dataEntries = [];

function validateName(name) {
    return /^[A-Za-z]{3,10}$/.test(name);
}

function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]{2,64}@[a-zA-Z0-9.-]{2,253}\.[a-zA-Z]{2,}$/i.test(email);
}


function handleSubmit() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const purpose = document.getElementById("purpose").value;
    const description = document.getElementById("description").value.trim();
    const errors = [];

    if (!validateName(name)) {
        errors.push("Invalid name: 3–10 letters, no spaces or symbols.");
    }

    if (!validateEmail(email)) {
        errors.push("Invalid email format.");
    }

    if (!purpose) {
        errors.push("Contact purpose must be selected.");
    }

    if (!description) {
        errors.push("Description cannot be empty.");
    }

    const errorDiv = document.getElementById("errors");
    errorDiv.innerHTML = errors.length
        ? "<ul><li>" + errors.join("</li><li>") + "</li></ul>"
        : "";

    if (errors.length === 0) {
        const entry = { name, email, purpose, description };
        dataEntries.push(entry);
        updateTable();
        clearForm();
    }
}

function updateTable() {
    const table = document.getElementById("dataTable");
    // Clear existing content and add header row
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Purpose</th>
            <th>Description</th>
        </tr>
    `;

    // Append each valid entry
    dataEntries.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.purpose}</td>
            <td>${entry.description}</td>
        `;
        table.appendChild(row);  // SAFER than using innerHTML +=
    });
}

function clearForm() {
    document.getElementById("contactForm").reset();
}
