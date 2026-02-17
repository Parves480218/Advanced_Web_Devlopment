require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Timestamp helper
function timestamp() {
  const now = new Date();
  return now.toISOString().replace("T", " ").replace("Z", "");
}

// --- Middleware ---
app.use(express.json());

// Serve static files from /public
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// --- Views ---
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/resources", (req, res) => {
  res.sendFile(path.join(publicDir, "resources.html"));
});

app.get("/bookings", (req, res) => {
  res.sendFile(path.join(publicDir, "bookings.html"));
});

// --- API ---
app.post("/api/resources", (req, res) => {
  const {
    action = "",
    resourceName = "",
    resourceAvailable = false,
    resourcePrice = 0,
    resourcePriceUnit = "",
  } = req.body || {};

  console.log("The client's POST request ", `[${timestamp()}]`);
  console.log("--------------------------");
  console.log("Action ➡️ ", action);
  console.log("Name ➡️ ", resourceName);
  console.log("Available ➡️ ", resourceAvailable);
  console.log("Price ➡️ ", resourcePrice);
  console.log("Price unit ➡️ ", resourcePriceUnit);
  console.log("--------------------------");

  res.json({ ok: true, echo: req.body });
});

app.get("/api/bookings", (req, res) => {
  res.json([
    {
      resource: "Meeting Room A",
      start: "2026-02-18 10:00",
      end: "2026-02-18 11:00",
    },
    {
      resource: "Projector",
      start: "2026-02-19 14:00",
      end: "2026-02-19 16:00",
    },
  ]);
});

// --- 404 for API ---
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
