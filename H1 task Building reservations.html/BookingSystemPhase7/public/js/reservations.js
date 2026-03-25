import { requireAuthOrBlockPage, logout, initAuthUI } from "./auth-ui.js";

initAuthUI();

if (!requireAuthOrBlockPage()) {
  throw new Error("Authentication required");
}

window.logout = logout;

const form = document.getElementById("reservationForm");
const reservationListEl = document.getElementById("reservationList");
const messageEl = document.getElementById("message");
const clearReservationBtn = document.getElementById("clearReservationBtn");

const reservationIdInput = document.getElementById("reservationId");
const resourceIdInput = document.getElementById("resourceId");
const userIdInput = document.getElementById("userId");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const noteInput = document.getElementById("note");
const statusInput = document.getElementById("status");

let reservationsCache = [];
let selectedReservationId = null;

function getToken() {
  return localStorage.getItem("token") || "";
}

function getAuthHeaders(includeJson = false) {
  const headers = {};
  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (includeJson) {
    headers["Content-Type"] = "application/json";
    headers.Accept = "application/json";
  }

  return headers;
}

function showMessage(type, text) {
  if (!messageEl) return;

  messageEl.className = "mt-6 rounded-2xl border px-4 py-3 text-sm whitespace-pre-line";
  messageEl.classList.remove("hidden");

  if (type === "success") {
    messageEl.classList.add("border-emerald-300", "bg-emerald-50", "text-emerald-900");
  } else if (type === "info") {
    messageEl.classList.add("border-amber-300", "bg-amber-50", "text-amber-900");
  } else {
    messageEl.classList.add("border-rose-300", "bg-rose-50", "text-rose-900");
  }

  messageEl.textContent = text;
}

function clearMessage() {
  if (!messageEl) return;
  messageEl.textContent = "";
  messageEl.className = "hidden mt-6 rounded-2xl border px-4 py-3 text-sm whitespace-pre-line";
}

function readResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json().catch(() => ({ ok: false, error: "Invalid JSON response" }));
  }

  return response.text().catch(() => "");
}

function localDateTimeToIso(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function isoToLocalInputValue(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function setDateInputMinimums() {
  const now = new Date();
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  if (startTimeInput) startTimeInput.min = localNow;
  if (endTimeInput) endTimeInput.min = localNow;
}

function getPayloadFromForm() {
  return {
    resourceId: Number(resourceIdInput.value),
    userId: Number(userIdInput.value),
    startTime: localDateTimeToIso(startTimeInput.value),
    endTime: localDateTimeToIso(endTimeInput.value),
    note: noteInput.value.trim(),
    status: statusInput.value,
  };
}

function validatePayload(payload, actionValue) {
  if (actionValue !== "delete") {
    if (!payload.resourceId || !payload.userId) {
      return "Resource ID and User ID are required.";
    }

    if (!payload.startTime || !payload.endTime) {
      return "Start time and end time are required.";
    }

    const start = new Date(payload.startTime);
    const end = new Date(payload.endTime);
    const now = new Date();

    if (start <= now) {
      return "Start time must be in the future.";
    }

    if (end <= start) {
      return "End time must be later than start time.";
    }
  }

  if ((actionValue === "update" || actionValue === "delete") && !reservationIdInput.value) {
    return `${actionValue[0].toUpperCase() + actionValue.slice(1)} failed: select a reservation first.`;
  }

  return null;
}

function clearForm() {
  reservationIdInput.value = "";
  resourceIdInput.value = "";
  userIdInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
  noteInput.value = "";
  statusInput.value = "active";
  selectedReservationId = null;
  highlightSelectedReservation(null);
  setDateInputMinimums();
}

function fillForm(reservation) {
  reservationIdInput.value = reservation.id ?? "";
  resourceIdInput.value = reservation.resource_id ?? reservation.resourceId ?? "";
  userIdInput.value = reservation.user_id ?? reservation.userId ?? "";
  startTimeInput.value = isoToLocalInputValue(reservation.start_time ?? reservation.startTime);
  endTimeInput.value = isoToLocalInputValue(reservation.end_time ?? reservation.endTime);
  noteInput.value = reservation.note ?? "";
  statusInput.value = reservation.status ?? "active";
  selectedReservationId = Number(reservation.id);
  highlightSelectedReservation(selectedReservationId);
}

function renderReservationList(reservations) {
  if (!reservationListEl) return;

  if (!reservations.length) {
    reservationListEl.innerHTML = `
      <div class="rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/60">
        No reservations found.
      </div>
    `;
    return;
  }

  reservationListEl.innerHTML = reservations
    .map((reservation) => {
      const selectedClass =
        Number(reservation.id) === Number(selectedReservationId)
          ? " ring-2 ring-brand-blue/40 bg-brand-blue/5"
          : "";

      return `
        <button
          type="button"
          data-reservation-id="${reservation.id}"
          class="w-full text-left rounded-2xl border border-black/10 bg-white px-4 py-3 transition hover:bg-black/5${selectedClass}"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="font-semibold truncate">Reservation #${reservation.id}</div>
              <div class="mt-1 text-sm text-black/70 truncate">
                Resource: ${reservation.resource_name ?? reservation.resource_id ?? "—"}
              </div>
              <div class="mt-1 text-sm text-black/70 truncate">
                User: ${reservation.user_email ?? reservation.user_id ?? "—"}
              </div>
              <div class="mt-1 text-xs text-black/50">
                ${formatDateTime(reservation.start_time)} → ${formatDateTime(reservation.end_time)}
              </div>
              <div class="mt-1 text-xs text-black/50">
                Status: ${reservation.status ?? "—"}
              </div>
              ${reservation.note ? `<div class="mt-1 text-xs text-black/50">Note: ${reservation.note}</div>` : ""}
            </div>
          </div>
        </button>
      `;
    })
    .join("");

  reservationListEl.querySelectorAll("[data-reservation-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      clearMessage();
      const id = Number(btn.dataset.reservationId);
      const reservation = reservationsCache.find((item) => Number(item.id) === id);
      if (!reservation) return;
      fillForm(reservation);
    });
  });
}

function highlightSelectedReservation(id) {
  if (!reservationListEl) return;

  reservationListEl.querySelectorAll("[data-reservation-id]").forEach((el) => {
    const currentId = Number(el.dataset.reservationId);
    const isSelected = id && currentId === Number(id);
    el.classList.toggle("ring-2", isSelected);
    el.classList.toggle("ring-brand-blue/40", isSelected);
    el.classList.toggle("bg-brand-blue/5", isSelected);
  });
}

async function loadReservations() {
  try {
    const response = await fetch("/api/reservations", {
      headers: getAuthHeaders(false),
    });

    const body = await readResponseBody(response);

    if (!response.ok) {
      renderReservationList([]);
      showMessage("error", `Failed to load reservations (${response.status}).`);
      return;
    }

    reservationsCache = Array.isArray(body.data) ? body.data : [];
    renderReservationList(reservationsCache);

    if (selectedReservationId) {
      const found = reservationsCache.find((item) => Number(item.id) === Number(selectedReservationId));
      if (found) {
        fillForm(found);
      }
    }
  } catch (err) {
    console.error("Failed to load reservations:", err);
    renderReservationList([]);
    showMessage("error", "Could not load reservations. Check the server and try again.");
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  clearMessage();

  const actionValue = event.submitter?.value || "create";
  const payload = getPayloadFromForm();
  const validationError = validatePayload(payload, actionValue);

  if (validationError) {
    showMessage("error", validationError);
    return;
  }

  let method = "POST";
  let url = "/api/reservations";
  let body = null;

  if (actionValue === "create") {
    method = "POST";
    body = JSON.stringify(payload);
  } else if (actionValue === "update") {
    method = "PUT";
    url = `/api/reservations/${reservationIdInput.value}`;
    body = JSON.stringify(payload);
  } else if (actionValue === "delete") {
    method = "DELETE";
    url = `/api/reservations/${reservationIdInput.value}`;
  } else {
    showMessage("error", `Unknown action: ${actionValue}`);
    return;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...getAuthHeaders(Boolean(body)),
      },
      body,
    });

    const responseBody = response.status === 204 ? null : await readResponseBody(response);

    if (!response.ok) {
      const errorText =
        responseBody?.error ||
        responseBody?.message ||
        `Request failed (${response.status}).`;

      if (response.status === 404) {
        showMessage("error", "Reservation not found. Refresh the list and try again.");
      } else {
        showMessage("error", errorText);
      }
      return;
    }

    if (actionValue === "create") {
      showMessage("success", "Reservation created successfully.");
    } else if (actionValue === "update") {
      showMessage("success", "Reservation updated successfully.");
    } else {
      showMessage("success", "Reservation deleted successfully.");
    }

    clearForm();
    await loadReservations();
  } catch (err) {
    console.error("Reservation request failed:", err);
    showMessage("error", "Network error. Could not reach the server.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

  if (clearReservationBtn) {
    clearReservationBtn.addEventListener("click", () => {
      clearMessage();
      clearForm();
    });
  }

  setDateInputMinimums();
  loadReservations();
});