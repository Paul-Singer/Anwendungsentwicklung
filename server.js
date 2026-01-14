const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  PORT,
  CORS_ORIGIN,
  SERVE_STATIC,
  MIN_YEAR,
  MAX_YEAR,
} = require("./lib/config");
const { ensureMetadataReady } = require("./lib/metadata");
const { searchStations, findStationById } = require("./lib/stationsRepo");
const { getStationData } = require("./lib/ghcnService");

const app = express();
app.use(express.json());

const origins = parseOrigins(CORS_ORIGIN);
if (origins === "*") {
  app.use(cors());
} else {
  app.use(cors({ origin: origins }));
}

if (SERVE_STATIC) {
  app.use(express.static(path.join(__dirname)));
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/stations", async (req, res) => {
  const lat = parseNumber(req.query.lat);
  const lon = parseNumber(req.query.lon);
  const radius = parseNumber(req.query.radius);
  const start = parseIntParam(req.query.start);
  const end = parseIntParam(req.query.end);
  const limit = parseIntParam(req.query.limit);

  const validationError = validateSearch(lat, lon, radius, start, end);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const results = await searchStations({ lat, lon, radius, start, end, limit });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: "Station search failed." });
  }
});

app.get("/station/:id/data", async (req, res) => {
  const start = parseIntParam(req.query.start);
  const end = parseIntParam(req.query.end);
  const validationError = validateYears(start, end);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const station = await findStationById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: "Station not found." });
    }
    if (start < station.start_year || end > station.end_year) {
      return res.status(404).json({ error: "No data in the requested range." });
    }

    const parsed = await getStationData(station.id, start, end);
    return res.json({
      station: station.id,
      name: station.name,
      latitude: station.latitude,
      longitude: station.longitude,
      annual: parsed.annual,
      seasons: parsed.seasons,
    });
  } catch (error) {
    return res.status(500).json({ error: "Station data request failed." });
  }
});

ensureMetadataReady()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`GHCN backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize metadata:", error.message);
    process.exit(1);
  });

function parseOrigins(value) {
  if (!value || value === "*") {
    return "*";
  }
  return value.split(",").map((entry) => entry.trim()).filter(Boolean);
}

function parseNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function parseIntParam(value) {
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) ? number : null;
}

function validateSearch(lat, lon, radius, start, end) {
  if (lat === null || lat < -90 || lat > 90) {
    return "Latitude must be between -90 and 90.";
  }
  if (lon === null || lon < -180 || lon > 180) {
    return "Longitude must be between -180 and 180.";
  }
  if (radius === null || radius <= 0) {
    return "Radius must be greater than 0.";
  }
  return validateYears(start, end);
}

function validateYears(start, end) {
  if (start === null || end === null) {
    return "Start and end year are required.";
  }
  if (start > end) {
    return "Start year must be earlier than end year.";
  }
  if (start < MIN_YEAR || end > MAX_YEAR) {
    return `Year range must be between ${MIN_YEAR} and ${MAX_YEAR}.`;
  }
  return "";
}
