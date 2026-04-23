const API_URL = "/api/persons";

function showUIMessage(text, isError = true) {
  const msgBar = document.getElementById("ui-message-bar");
  msgBar.textContent = text;
  msgBar.className = isError ? "ui-msg error-ui" : "ui-msg success-ui";
  setTimeout(() => {
    msgBar.className = "";
    msgBar.textContent = "";
  }, 4000);
}

async function loadCustomers() {
  const container = document.getElementById("customer-list");
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Fetch failed");
    const data = await res.json();
    container.innerHTML = "";
    if (data.length === 0) {
      container.innerHTML = "<p>No customers found.</p>";
      return;
    }
    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "customer-card";
      div.innerHTML = `<strong>${person.first_name} ${person.last_name}</strong><br><small>${person.email}</small>`;
      div.addEventListener("click", () => selectCustomer(person, div));
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = "<p style='color:red;'>Error connecting to API</p>";
  }
}

function selectCustomer(person, element) {
  document.getElementById("customer-id").value = person.id;
  document.getElementById("first_name").value = person.first_name || "";
  document.getElementById("last_name").value = person.last_name || "";
  document.getElementById("email").value = person.email || "";
  document.getElementById("phone").value = person.phone || "";
  document.getElementById("birth_date").value = person.birth_date ? person.birth_date.split('T')[0] : "";
  document.querySelectorAll(".customer-card").forEach(el => el.classList.remove("active"));
  element.classList.add("active");
  document.getElementById("saveBtn").textContent = "Update Customer";
}

function resetForm() {
  const form = document.getElementById("form");
  form.reset();
  document.getElementById("customer-id").value = "";
  document.getElementById("saveBtn").textContent = "Save";
  document.querySelectorAll(".customer-card").forEach(el => el.classList.remove("active"));
}

function showConfirm() {
  return new Promise((resolve) => {
    const modal = document.getElementById("confirmModal");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");
    modal.classList.remove("hidden");
    yesBtn.onclick = () => { modal.classList.add("hidden"); resolve(true); };
    noBtn.onclick = () => { modal.classList.add("hidden"); resolve(false); };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const birthDateInput = document.getElementById("birth_date");
  const today = new Date().toISOString().split("T")[0];
  birthDateInput.min = today;

  loadCustomers();
  document.getElementById("clearBtn").addEventListener("click", resetForm);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const selectedDate = birthDateInput.value;

    const nameRegex = /^[A-Za-zÀ-ž\s\-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      showUIMessage("Names must be alphabetic.");
      return;
    }
    if (!emailRegex.test(email)) {
      showUIMessage("Invalid email format.");
      return;
    }
    if (selectedDate && selectedDate < today) {
      showUIMessage("Date cannot be in the past!");
      return;
    }

    const id = document.getElementById("customer-id").value;
    const customer = { first_name: firstName, last_name: lastName, email, phone, birth_date: selectedDate };
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
      });
      if (res.ok) {
        showUIMessage(id ? "Customer Updated!" : "Customer Added!", false);
        resetForm();
        loadCustomers();
      }
    } catch (err) {
      showUIMessage("Error saving data");
    }
  });

  document.getElementById("deleteBtn").addEventListener("click", async () => {
    const id = document.getElementById("customer-id").value;
    if (!id) {
      showUIMessage("Select a customer first.");
      return;
    }
    if (await showConfirm()) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      showUIMessage("Customer Deleted", false);
      resetForm();
      loadCustomers();
    }
  });
});