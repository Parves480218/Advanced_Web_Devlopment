// ===============================
// 1) DOM references
// ===============================
const actions = document.getElementById("resourceActions");
const resourceNameContainer = document.getElementById("resourceNameContainer");
const role = "admin"; 

let createButton = null;
let updateButton = null;
let deleteButton = null;

// ===============================
// 2) Button creation helpers
// ===============================
const BUTTON_BASE_CLASSES = "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out";
const BUTTON_ENABLED_CLASSES = "bg-brand-primary text-white hover:bg-brand-dark/80 shadow-soft";

function addButton({ label, type = "button", value, classes = "" }) {
    const btn = document.createElement("button");
    btn.type = type;
    btn.textContent = label;
    btn.name = "action";
    if (value) btn.value = value;
    btn.className = `${BUTTON_BASE_CLASSES} ${classes}`.trim();
    actions.appendChild(btn);
    return btn;
}

function setButtonEnabled(btn, enabled) {
    if (!btn) return;
    btn.disabled = !enabled;
    btn.classList.toggle("cursor-not-allowed", !enabled);
    btn.classList.toggle("opacity-50", !enabled);
    if (enabled) {
        btn.classList.add("hover:bg-brand-dark/80");
    } else {
        btn.classList.remove("hover:bg-brand-dark/80");
    }
}

function renderActionButtons(currentRole) {
    createButton = addButton({
        label: "Create",
        type: "submit",
        value: "create",
        classes: BUTTON_ENABLED_CLASSES,
    });

    if (currentRole === "admin") {
        updateButton = addButton({ label: "Update", value: "update", classes: BUTTON_ENABLED_CLASSES });
        deleteButton = addButton({ label: "Delete", value: "delete", classes: BUTTON_ENABLED_CLASSES });
        setButtonEnabled(updateButton, false);
        setButtonEnabled(deleteButton, false);
    }
    setButtonEnabled(createButton, false);
}

// ===============================
// 3) Enhanced Validation Logic
// ===============================
function isResourceNameValid(value) {
    const trimmed = value.trim();
    const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ ]+$/;
    return trimmed.length >= 5 && trimmed.length <= 30 && allowedPattern.test(trimmed);
}

function isDescriptionValid(value) {
    const trimmed = value.trim();
    // Rule: 10-50 characters, meaningful text
    return trimmed.length >= 10 && trimmed.length <= 50;
}

function setInputVisualState(input, state) {
    input.classList.remove("border-green-500", "bg-green-100", "border-red-500", "bg-red-100");
    if (state === "valid") {
        input.classList.add("border-green-500", "bg-green-100");
    } else if (state === "invalid") {
        input.classList.add("border-red-500", "bg-red-100");
    }
}

function globalValidate() {
    const nameInput = document.getElementById("resourceName");
    const descInput = document.getElementById("resourceDescription");

    const nameIsValid = isResourceNameValid(nameInput.value);
    const descIsValid = isDescriptionValid(descInput.value);

    // Update Name Visuals
    if (nameInput.value.trim() === "") setInputVisualState(nameInput, "neutral");
    else setInputVisualState(nameInput, nameIsValid ? "valid" : "invalid");

    // Update Description Visuals
    if (descInput.value.trim() === "") setInputVisualState(descInput, "neutral");
    else setInputVisualState(descInput, descIsValid ? "valid" : "invalid");

    // ENABLE CREATE ONLY IF BOTH ARE VALID
    const allValid = nameIsValid && descIsValid;
    setButtonEnabled(createButton, allValid);
    if (updateButton) setButtonEnabled(updateButton, allValid);
}

// ===============================
// 4) Initialization
// ===============================
renderActionButtons(role);

const nameInput = document.createElement("input");
nameInput.id = "resourceName";
nameInput.className = "mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 transition-all duration-200";
nameInput.placeholder = "e.g., Meeting Room A";
resourceNameContainer.appendChild(nameInput);

const descInput = document.getElementById("resourceDescription");

nameInput.addEventListener("input", globalValidate);
descInput.addEventListener("input", globalValidate);

// Run once to set initial disabled state
globalValidate();