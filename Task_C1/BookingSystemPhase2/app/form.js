// ===============================
// Form handling for resources page
// ===============================

function $(id) {
    return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = $("resourceForm");
    if (!form) return;

    form.addEventListener("submit", onSubmit);
});

async function onSubmit(event) {
    event.preventDefault();
    
    // Get the inputs
    const nameInput = $("resourceName");
    const descInput = $("resourceDescription");
    const createBtn = event.submitter;

    // Safety Check: If button is disabled, do not proceed
    if (createBtn && createBtn.disabled) return;

    // 3) Make the server receive correct, meaningful data (TRIMMED)
    const payload = {
        action: createBtn?.value || "create",
        resourceName: nameInput.value.trim(),
        resourceDescription: descInput.value.trim(),
        resourceAvailable: $("resourceAvailable")?.checked ?? false,
        resourcePrice: $("resourcePrice")?.value ?? "0",
        resourcePriceUnit: document.querySelector('input[name="resourcePriceUnit"]:checked')?.value ?? "hour"
    };

    console.log("Sending Cleaned Payload:", payload);

    try {
        const response = await fetch("https://httpbin.org/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Success! Server received:", data.json);
            alert("Resource saved successfully!");
            // Optional: reset form after success
            // $("resourceForm").reset();
        } else {
            alert("Server error: " + response.status);
        }
    } catch (err) {
        console.error("POST error:", err);
        alert("Connection failed. Please check your network.");
    }
}