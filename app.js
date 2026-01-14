const DEFAULTS = {
  lat: 49.4702,
  lon: 10.90191,
  radius: 50,
  limit: 5,
  startYear: 1960,
  endYear: 2025,
};

const API_BASE = (document.body && document.body.dataset.apiBase) || window.GHCN_API_BASE || "";

const I18N = {
  en: {
    documentTitle: "GHCN Temperature Explorer",
    languageLabel: "Language",
    languageEnglish: "English",
    languageGerman: "German",
    brandEyebrow: "GHCN Climate Lab",
    brandTitle: "Temperature Atlas",
    brandSubhead: "Explore station coverage, annual means, and seasonal signals.",
    legendLabel: "Legend",
    darkLabel: "Dark",
    annualTable: "Annual Table",
    tableHint: "Select a station to populate the table.",
    noStation: "No station",
    yearHeader: "Year",
    tminHeader: "Tmin (C)",
    tmaxHeader: "Tmax (C)",
    noDataYet: "No data yet.",
    temperatureTrends: "Temperature Trends",
    chartHint: "Run a search and pick a station to see the chart.",
    emptyTitle: "No station selected",
    emptyBody: "Search by coordinates, pick a station, and the chart will appear.",
    seasonsLabel: "Seasons",
    seasonSpring: "Spring",
    seasonSummer: "Summer",
    seasonAutumn: "Autumn",
    seasonWinter: "Winter",
    viewConfig: "View Configuration",
    viewConfigHint: "Find stations around a coordinate and compare yearly means.",
    latitude: "Latitude",
    longitude: "Longitude",
    radius: "Radius (km)",
    maxStations: "Max stations",
    allStations: "All stations (ignore limit)",
    startYear: "Start year",
    endYear: "End year",
    fromMap: "From Map",
    search: "Search",
    reset: "Reset",
    noStationsYet: "No stations yet",
    availableStations: "Available Stations",
    sortedByDistance: "Sorted by distance",
    mapView: "Map View",
    mapHint: "Click the map to set coordinates, then use From Map.",
    mapReady: "Map ready",
    chartAria: "Temperature chart",
    stationsLoaded: "Stations loaded.",
    stationsNone: "No stations found.",
    searchFailed: "Search failed.",
    filtersReset: "Filters reset.",
    mapPickFirst: "Click the map to choose a point first.",
    coordsFromMap: "Coordinates updated from map.",
    stationLoaded: "Station data loaded.",
    stationFailed: "Failed to load station data.",
    chartUnavailable: "Chart.js is not available.",
    leafletUnavailable: "Leaflet is not available.",
    stationSearchFailed: "Station search failed.",
    stationResponseInvalid: "Station response is not a list.",
    stationDataFailed: "Station data request failed.",
    annualMeansFor: "Annual means for {name}",
    trendsFor: "Trend lines for {name}",
    coverageStation: "Station {name}",
    noStationsAvailable: "No stations available.",
    tableNoData: "No data available.",
    distanceNA: "Distance n/a",
    stationCount: "{count} station|{count} stations",
    stationsPill: "{count} station|{count} stations",
    yearRange: "{start} - {end}",
    yearRangePlaceholder: "Start - End",
    temperatureAxis: "Temperature (C)",
    annualTmin: "Annual Tmin",
    annualTmax: "Annual Tmax",
    validationLatitude: "Latitude must be between -90 and 90.",
    validationLongitude: "Longitude must be between -180 and 180.",
    validationRadius: "Radius must be greater than 0.",
    validationLimit: "Max stations must be greater than 0.",
    validationYears: "Enter a valid start and end year.",
    validationStartEnd: "Start year must be earlier than end year.",
    validationEndYear: "End year must not exceed 2025.",
    pointSelected: "Point selected",
  },
  de: {
    documentTitle: "GHCN Temperatur-Explorer",
    languageLabel: "Sprache",
    languageEnglish: "Englisch",
    languageGerman: "Deutsch",
    brandEyebrow: "GHCN Klima-Labor",
    brandTitle: "Temperatur-Atlas",
    brandSubhead: "Stationsabdeckung, Jahresmittel und saisonale Signale anzeigen.",
    legendLabel: "Legende",
    darkLabel: "Dunkel",
    annualTable: "Jahrestabelle",
    tableHint: "Station auswaehlen, um die Tabelle zu fuellen.",
    noStation: "Keine Station",
    yearHeader: "Jahr",
    tminHeader: "Tmin (C)",
    tmaxHeader: "Tmax (C)",
    noDataYet: "Noch keine Daten.",
    temperatureTrends: "Temperaturverlauf",
    chartHint: "Suche starten und Station auswaehlen, um das Diagramm zu sehen.",
    emptyTitle: "Keine Station gewaehlt",
    emptyBody: "Suche per Koordinaten, Station waehlen, dann erscheint das Diagramm.",
    seasonsLabel: "Jahreszeiten",
    seasonSpring: "Fruehling",
    seasonSummer: "Sommer",
    seasonAutumn: "Herbst",
    seasonWinter: "Winter",
    viewConfig: "Ansicht konfigurieren",
    viewConfigHint: "Stationen um Koordinaten finden und Jahresmittel vergleichen.",
    latitude: "Breite",
    longitude: "Laenge",
    radius: "Radius (km)",
    maxStations: "Max. Stationen",
    allStations: "Alle Stationen (Limit ignorieren)",
    startYear: "Startjahr",
    endYear: "Endjahr",
    fromMap: "Von Karte",
    search: "Suche",
    reset: "Zuruecksetzen",
    noStationsYet: "Noch keine Stationen",
    availableStations: "Verfuegbare Stationen",
    sortedByDistance: "Nach Distanz sortiert",
    mapView: "Kartenansicht",
    mapHint: "Karte anklicken, dann 'Von Karte' nutzen.",
    mapReady: "Karte bereit",
    chartAria: "Temperaturdiagramm",
    stationsLoaded: "Stationen geladen.",
    stationsNone: "Keine Stationen gefunden.",
    searchFailed: "Suche fehlgeschlagen.",
    filtersReset: "Filter zurueckgesetzt.",
    mapPickFirst: "Erst einen Punkt auf der Karte waehlen.",
    coordsFromMap: "Koordinaten aus Karte uebernommen.",
    stationLoaded: "Stationsdaten geladen.",
    stationFailed: "Stationsdaten konnten nicht geladen werden.",
    chartUnavailable: "Chart.js ist nicht verfuegbar.",
    leafletUnavailable: "Leaflet ist nicht verfuegbar.",
    stationSearchFailed: "Stationssuche fehlgeschlagen.",
    stationResponseInvalid: "Stationsantwort ist keine Liste.",
    stationDataFailed: "Stationsdaten-Anfrage fehlgeschlagen.",
    annualMeansFor: "Jahresmittel fuer {name}",
    trendsFor: "Trendlinien fuer {name}",
    coverageStation: "Station {name}",
    noStationsAvailable: "Keine Stationen verfuegbar.",
    tableNoData: "Keine Daten verfuegbar.",
    distanceNA: "Distanz n/v",
    stationCount: "{count} Station|{count} Stationen",
    stationsPill: "{count} Station|{count} Stationen",
    yearRange: "{start} - {end}",
    yearRangePlaceholder: "Start - Ende",
    temperatureAxis: "Temperatur (C)",
    annualTmin: "Jahresmittel Tmin",
    annualTmax: "Jahresmittel Tmax",
    validationLatitude: "Breite muss zwischen -90 und 90 liegen.",
    validationLongitude: "Laenge muss zwischen -180 und 180 liegen.",
    validationRadius: "Radius muss groesser als 0 sein.",
    validationLimit: "Max. Stationen muss groesser als 0 sein.",
    validationYears: "Gueltiges Start- und Endjahr eingeben.",
    validationStartEnd: "Startjahr muss vor Endjahr liegen.",
    validationEndYear: "Endjahr darf 2025 nicht ueberschreiten.",
    pointSelected: "Punkt gewaehlt",
  },
};

const SEASONS = [
  { key: "spring", labelKey: "seasonSpring", tmin: "#3e9a6f", tmax: "#6db388" },
  { key: "summer", labelKey: "seasonSummer", tmin: "#d68b2c", tmax: "#f2a85c" },
  { key: "autumn", labelKey: "seasonAutumn", tmin: "#a56a43", tmax: "#c07d56" },
  { key: "winter", labelKey: "seasonWinter", tmin: "#2f8ca3", tmax: "#4db6c6" },
];

const ANNUAL_COLORS = {
  tmin: "#3a6fa3",
  tmax: "#d04b3b",
};

const elements = {
  form: document.getElementById("search-form"),
  langSelect: document.getElementById("lang-select"),
  lat: document.getElementById("lat"),
  lon: document.getElementById("lon"),
  radius: document.getElementById("radius"),
  limit: document.getElementById("limit"),
  allStations: document.getElementById("all-stations"),
  startYear: document.getElementById("start-year"),
  endYear: document.getElementById("end-year"),
  searchBtn: document.getElementById("search-btn"),
  resetBtn: document.getElementById("reset-btn"),
  fromMapBtn: document.getElementById("from-map"),
  statusText: document.getElementById("status-text"),
  stationsPill: document.getElementById("stations-pill"),
  spinner: document.getElementById("spinner"),
  stationList: document.getElementById("station-list"),
  stationCount: document.getElementById("station-count"),
  yearRange: document.getElementById("year-range"),
  tableTitle: document.getElementById("table-title"),
  chartTitle: document.getElementById("chart-title"),
  coverageChip: document.getElementById("coverage-chip"),
  chartEmpty: document.getElementById("chart-empty"),
  table: document.getElementById("year-table"),
  seasonChecks: Array.from(document.querySelectorAll("[data-season]")),
  legendToggle: document.getElementById("legend-toggle"),
  darkToggle: document.getElementById("dark-toggle"),
  mapToggle: document.getElementById("map-toggle"),
  mapPanel: document.getElementById("map-panel"),
  mapStatus: document.getElementById("map-status"),
};

const state = {
  stations: [],
  selectedId: null,
  selectedStation: null,
  data: null,
  language: "en",
  activeSeasons: new Set(),
  chart: null,
  map: null,
  mapLayers: [],
  mapPoint: null,
  lastSearch: null,
};

function getString(key) {
  const dictionary = I18N[state.language] || I18N.en;
  return dictionary[key] || I18N.en[key] || "";
}

function t(key, vars) {
  let value = getString(key);
  if (!vars) {
    return value;
  }
  return value.replace(/\{(\w+)\}/g, (match, name) => {
    if (Object.prototype.hasOwnProperty.call(vars, name)) {
      return vars[name];
    }
    return match;
  });
}

function tPlural(key, count) {
  const value = getString(key);
  if (value.includes("|")) {
    const parts = value.split("|");
    const template = count === 1 ? parts[0] : parts[1];
    return template.replace("{count}", count);
  }
  return t(key, { count });
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (key) {
      element.textContent = t(key);
    }
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (key) {
      element.setAttribute("aria-label", t(key));
    }
  });
  document.title = t("documentTitle");
}

function initLanguage() {
  const stored = window.localStorage ? localStorage.getItem("ghcn-lang") : null;
  const preferred = stored || document.documentElement.lang || "en";
  applyLanguage(preferred);
}

function applyLanguage(lang) {
  state.language = I18N[lang] ? lang : "en";
  document.documentElement.lang = state.language;
  if (elements.langSelect) {
    elements.langSelect.value = state.language;
  }
  if (window.localStorage) {
    localStorage.setItem("ghcn-lang", state.language);
  }
  applyTranslations();
  updateMetrics();
  updatePill(state.stations.length);
  updateStationTitles(state.data || {});
  if (state.stations.length || elements.stationList.children.length) {
    renderStations(state.stations);
    if (state.selectedId) {
      highlightStation(state.selectedId);
    }
  }
  if (state.data) {
    renderChart(state.data);
    renderTable(state.data);
  } else {
    renderEmptyTable();
  }
  updateMapStatus();
  updateSearchButton();
}

function updateMapStatus() {
  if (!elements.mapStatus) {
    return;
  }
  elements.mapStatus.textContent = state.mapPoint ? t("pointSelected") : t("mapReady");
}

function init() {
  setDefaults();
  bindEvents();
  toggleLimitInput();
  initLanguage();
  updateSearchButton();
  if (window.Chart) {
    Chart.defaults.font.family = "\"Sora\", sans-serif";
  }
}

function setDefaults() {
  elements.lat.value = DEFAULTS.lat.toFixed(5);
  elements.lon.value = DEFAULTS.lon.toFixed(5);
  elements.radius.value = DEFAULTS.radius;
  elements.limit.value = DEFAULTS.limit;
  elements.startYear.value = DEFAULTS.startYear;
  elements.endYear.value = DEFAULTS.endYear;
}

function bindEvents() {
  elements.form.addEventListener("submit", handleSearch);
  elements.resetBtn.addEventListener("click", handleReset);
  elements.fromMapBtn.addEventListener("click", handleFromMap);
  elements.allStations.addEventListener("change", toggleLimitInput);
  if (elements.langSelect) {
    elements.langSelect.addEventListener("change", handleLanguageChange);
  }
  elements.seasonChecks.forEach((input) => {
    input.addEventListener("change", handleSeasonToggle);
  });
  elements.legendToggle.addEventListener("change", handleLegendToggle);
  elements.darkToggle.addEventListener("change", handleThemeToggle);
  elements.mapToggle.addEventListener("change", handleMapToggle);
  elements.stationList.addEventListener("click", handleStationClick);
  ["input", "change"].forEach((eventName) => {
    elements.lat.addEventListener(eventName, updateSearchButton);
    elements.lon.addEventListener(eventName, updateSearchButton);
    elements.startYear.addEventListener(eventName, updateSearchButton);
    elements.endYear.addEventListener(eventName, updateSearchButton);
  });
}

function readForm() {
  return {
    lat: parseFloat(elements.lat.value),
    lon: parseFloat(elements.lon.value),
    radius: parseFloat(elements.radius.value),
    limit: parseInt(elements.limit.value, 10),
    allStations: elements.allStations.checked,
    startYear: parseInt(elements.startYear.value, 10),
    endYear: parseInt(elements.endYear.value, 10),
  };
}

function validateForm(values) {
  if (Number.isNaN(values.lat) || values.lat < -90 || values.lat > 90) {
    return { ok: false, message: t("validationLatitude") };
  }
  if (Number.isNaN(values.lon) || values.lon < -180 || values.lon > 180) {
    return { ok: false, message: t("validationLongitude") };
  }
  if (Number.isNaN(values.radius) || values.radius <= 0) {
    return { ok: false, message: t("validationRadius") };
  }
  if (!values.allStations && (Number.isNaN(values.limit) || values.limit <= 0)) {
    return { ok: false, message: t("validationLimit") };
  }
  if (Number.isNaN(values.startYear) || Number.isNaN(values.endYear)) {
    return { ok: false, message: t("validationYears") };
  }
  if (values.startYear > values.endYear) {
    return { ok: false, message: t("validationStartEnd") };
  }
  if (values.endYear > DEFAULTS.endYear) {
    return { ok: false, message: t("validationEndYear") };
  }
  return { ok: true };
}

function updateSearchButton() {
  const values = readForm();
  const validation = validateForm(values);
  elements.searchBtn.disabled = !validation.ok;
  if (!validation.ok) {
    setStatus(validation.message, "error");
  } else {
    setStatus("", "");
  }
}

async function handleSearch(event) {
  event.preventDefault();
  const values = readForm();
  const validation = validateForm(values);
  if (!validation.ok) {
    setStatus(validation.message, "error");
    return;
  }
  setLoading(true);
  clearStationData();
  updateMetrics(values, 0);
  state.lastSearch = { lat: values.lat, lon: values.lon, radius: values.radius };
  try {
    const stations = await fetchStations(values);
    state.stations = stations;
    updateMetrics(values, stations.length);
    updatePill(stations.length);
    renderStations(stations);
    setStatus(stations.length ? t("stationsLoaded") : t("stationsNone"), stations.length ? "success" : "");
    if (elements.mapToggle.checked) {
      updateMapStations();
    }
  } catch (error) {
    setStatus(error.message || t("searchFailed"), "error");
  } finally {
    setLoading(false);
  }
}

function handleReset() {
  elements.form.reset();
  setDefaults();
  toggleLimitInput();
  elements.seasonChecks.forEach((input) => {
    input.checked = false;
  });
  state.activeSeasons.clear();
  clearStationData();
  state.stations = [];
  state.selectedId = null;
  state.selectedStation = null;
  state.lastSearch = null;
  renderStations([]);
  updateMetrics();
  updatePill(0);
  setStatus(t("filtersReset"), "");
  if (elements.mapToggle.checked) {
    updateMapStations();
  }
  updateSearchButton();
}

function handleLanguageChange(event) {
  applyLanguage(event.target.value);
}

function handleFromMap() {
  if (!state.mapPoint) {
    setStatus(t("mapPickFirst"), "error");
    return;
  }
  elements.lat.value = state.mapPoint.lat.toFixed(5);
  elements.lon.value = state.mapPoint.lng.toFixed(5);
  setStatus(t("coordsFromMap"), "success");
  updateSearchButton();
}

function handleSeasonToggle(event) {
  const key = event.target.dataset.season;
  if (!key) {
    return;
  }
  if (event.target.checked) {
    state.activeSeasons.add(key);
  } else {
    state.activeSeasons.delete(key);
  }
  if (state.data) {
    renderChart(state.data);
    renderTable(state.data);
  }
}

function handleLegendToggle() {
  if (!state.chart) {
    return;
  }
  state.chart.options.plugins.legend.display = elements.legendToggle.checked;
  state.chart.update();
}

function handleThemeToggle() {
  document.documentElement.setAttribute("data-theme", elements.darkToggle.checked ? "dark" : "light");
  updateChartTheme();
}

function handleMapToggle() {
  const show = elements.mapToggle.checked;
  elements.mapPanel.classList.toggle("is-visible", show);
  if (show) {
    if (!state.map) {
      initMap();
    } else {
      setTimeout(() => state.map.invalidateSize(), 200);
    }
    updateMapStations();
  }
  updateMapStatus();
}

function handleStationClick(event) {
  const button = event.target.closest("button[data-id]");
  if (!button) {
    return;
  }
  const id = button.dataset.id;
  selectStation(id);
}

function toggleLimitInput() {
  elements.limit.disabled = elements.allStations.checked;
}

function setStatus(message, tone) {
  elements.statusText.textContent = message || "";
  if (tone) {
    elements.statusText.dataset.tone = tone;
  } else {
    delete elements.statusText.dataset.tone;
  }
}

function setLoading(isLoading) {
  elements.spinner.classList.toggle("active", isLoading);
  elements.searchBtn.disabled = isLoading || !validateForm(readForm()).ok;
}

function updatePill(count) {
  if (count > 0) {
    elements.stationsPill.textContent = tPlural("stationsPill", count);
    elements.stationsPill.classList.add("active");
  } else {
    elements.stationsPill.textContent = t("noStationsYet");
    elements.stationsPill.classList.remove("active");
  }
}

function updateMetrics(values = readForm(), count = state.stations.length) {
  elements.stationCount.textContent = tPlural("stationCount", count);
  if (values.startYear && values.endYear) {
    elements.yearRange.textContent = t("yearRange", { start: values.startYear, end: values.endYear });
  } else {
    elements.yearRange.textContent = t("yearRangePlaceholder");
  }
}

async function fetchStations(values) {
  const params = new URLSearchParams({
    lat: values.lat,
    lon: values.lon,
    radius: values.radius,
    start: values.startYear,
    end: values.endYear,
  });
  if (!values.allStations && values.limit) {
    params.set("limit", values.limit);
  }
  const response = await fetch(`${API_BASE}/stations?${params.toString()}`);
  if (response.status === 204) {
    return [];
  }
  if (!response.ok) {
    throw new Error(t("stationSearchFailed"));
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error(t("stationResponseInvalid"));
  }
  return data;
}

async function selectStation(id) {
  if (state.selectedId === id) {
    return;
  }
  state.selectedId = id;
  state.selectedStation = state.stations.find((station) => station.id === id) || null;
  highlightStation(id);
  setLoading(true);
  try {
    const values = readForm();
    const data = await fetchStationData(id, values.startYear, values.endYear);
    state.data = data;
    updateStationTitles(data);
    renderChart(data);
    renderTable(data);
    setStatus(t("stationLoaded"), "success");
    if (elements.mapToggle.checked) {
      updateMapStations();
    }
  } catch (error) {
    setStatus(error.message || t("stationFailed"), "error");
  } finally {
    setLoading(false);
  }
}

async function fetchStationData(id, startYear, endYear) {
  const params = new URLSearchParams({ start: startYear, end: endYear });
  const response = await fetch(`${API_BASE}/station/${encodeURIComponent(id)}/data?${params.toString()}`);
  if (!response.ok) {
    throw new Error(t("stationDataFailed"));
  }
  return response.json();
}

function updateStationTitles(data) {
  const name = data.name || (state.selectedStation && state.selectedStation.name) || data.station || state.selectedId;
  elements.tableTitle.textContent = name ? t("annualMeansFor", { name }) : t("tableHint");
  elements.chartTitle.textContent = name ? t("trendsFor", { name }) : t("chartHint");
  elements.coverageChip.textContent = name ? t("coverageStation", { name }) : t("noStation");
}

function renderStations(stations) {
  elements.stationList.innerHTML = "";
  if (!stations.length) {
    const item = document.createElement("li");
    item.className = "muted";
    item.textContent = t("noStationsAvailable");
    elements.stationList.appendChild(item);
    return;
  }
  stations.forEach((station) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "station-item";
    button.dataset.id = station.id;
    const name = document.createElement("div");
    name.textContent = station.name || station.id;
    const meta = document.createElement("span");
    meta.textContent = formatDistance(station.distance_km);
    button.appendChild(name);
    button.appendChild(meta);
    item.appendChild(button);
    elements.stationList.appendChild(item);
  });
}

function highlightStation(id) {
  const buttons = elements.stationList.querySelectorAll(".station-item");
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.id === id);
  });
}

function renderChart(data) {
  if (!window.Chart) {
    setStatus(t("chartUnavailable"), "error");
    return;
  }
  const annual = Array.isArray(data.annual) ? data.annual : [];
  const labels = annual.map((row) => String(row.year));
  const datasets = [
    {
      label: t("annualTmin"),
      data: annual.map((row) => toNumber(row.tmin)),
      borderColor: ANNUAL_COLORS.tmin,
      backgroundColor: ANNUAL_COLORS.tmin,
      tension: 0.3,
      pointRadius: 2,
      borderWidth: 2,
    },
    {
      label: t("annualTmax"),
      data: annual.map((row) => toNumber(row.tmax)),
      borderColor: ANNUAL_COLORS.tmax,
      backgroundColor: ANNUAL_COLORS.tmax,
      tension: 0.3,
      pointRadius: 2,
      borderWidth: 2,
    },
  ];

  state.activeSeasons.forEach((key) => {
    const seasonConfig = SEASONS.find((season) => season.key === key);
    if (!seasonConfig || !data.seasons || !data.seasons[key]) {
      return;
    }
    const seasonLabel = t(seasonConfig.labelKey);
    const seasonMap = mapByYear(data.seasons[key]);
    const tminValues = labels.map((year) => {
      const entry = seasonMap.get(year);
      return entry ? toNumber(entry.tmin) : null;
    });
    const tmaxValues = labels.map((year) => {
      const entry = seasonMap.get(year);
      return entry ? toNumber(entry.tmax) : null;
    });
    datasets.push(
      {
        label: `${seasonLabel} Tmin`,
        data: tminValues,
        borderColor: seasonConfig.tmin,
        backgroundColor: seasonConfig.tmin,
        borderDash: [6, 6],
        tension: 0.3,
        pointRadius: 1.5,
        borderWidth: 2,
      },
      {
        label: `${seasonLabel} Tmax`,
        data: tmaxValues,
        borderColor: seasonConfig.tmax,
        backgroundColor: seasonConfig.tmax,
        borderDash: [6, 6],
        tension: 0.3,
        pointRadius: 1.5,
        borderWidth: 2,
      }
    );
  });

  const axisColor = cssVar("--chart-axis");
  const gridColor = cssVar("--chart-grid");

  if (state.chart) {
    state.chart.data.labels = labels;
    state.chart.data.datasets = datasets;
    state.chart.update();
  } else {
    state.chart = new Chart(document.getElementById("trend-chart"), {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            display: elements.legendToggle.checked,
            labels: { color: axisColor },
          },
        },
        scales: {
          x: {
            ticks: { color: axisColor },
            grid: { color: gridColor },
          },
          y: {
            ticks: { color: axisColor },
            grid: { color: gridColor },
            title: {
              display: true,
              text: t("temperatureAxis"),
              color: axisColor,
            },
          },
        },
      },
    });
  }

  elements.chartEmpty.classList.toggle("is-hidden", labels.length > 0);
}

function renderTable(data) {
  const annual = Array.isArray(data.annual) ? data.annual : [];
  const seasons = data.seasons || {};
  const table = elements.table;
  table.innerHTML = "";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  headRow.appendChild(createCell(t("yearHeader"), "th"));
  headRow.appendChild(createCell(t("tminHeader"), "th"));
  headRow.appendChild(createCell(t("tmaxHeader"), "th"));

  state.activeSeasons.forEach((key) => {
    const seasonConfig = SEASONS.find((season) => season.key === key);
    if (seasonConfig) {
      const label = t(seasonConfig.labelKey);
      headRow.appendChild(createCell(`${label} Tmin`, "th"));
      headRow.appendChild(createCell(`${label} Tmax`, "th"));
    }
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  if (!annual.length) {
    const row = document.createElement("tr");
    row.className = "empty-row";
    const cell = document.createElement("td");
    cell.colSpan = 3 + state.activeSeasons.size * 2;
    cell.textContent = t("tableNoData");
    row.appendChild(cell);
    tbody.appendChild(row);
  } else {
    const seasonMaps = {};
    state.activeSeasons.forEach((key) => {
      if (seasons[key]) {
        seasonMaps[key] = mapByYear(seasons[key]);
      }
    });
    annual.forEach((row) => {
      const tr = document.createElement("tr");
      tr.appendChild(createCell(row.year));
      tr.appendChild(createCell(formatValue(row.tmin)));
      tr.appendChild(createCell(formatValue(row.tmax)));
      state.activeSeasons.forEach((key) => {
        const entry = seasonMaps[key] ? seasonMaps[key].get(String(row.year)) : null;
        tr.appendChild(createCell(formatValue(entry ? entry.tmin : null)));
        tr.appendChild(createCell(formatValue(entry ? entry.tmax : null)));
      });
      tbody.appendChild(tr);
    });
  }

  table.appendChild(tbody);
}

function renderEmptyTable() {
  elements.table.innerHTML = `
    <thead>
      <tr>
        <th>${t("yearHeader")}</th>
        <th>${t("tminHeader")}</th>
        <th>${t("tmaxHeader")}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="empty-row">
        <td colspan="3">${t("noDataYet")}</td>
      </tr>
    </tbody>
  `;
}

function createCell(value, tag = "td") {
  const cell = document.createElement(tag);
  cell.textContent = value;
  return cell;
}

function mapByYear(list) {
  const map = new Map();
  list.forEach((entry) => {
    map.set(String(entry.year), entry);
  });
  return map;
}

function formatValue(value) {
  const number = toNumber(value);
  if (number === null) {
    return "--";
  }
  return number.toFixed(1);
}

function formatDistance(value) {
  const number = toNumber(value);
  if (number === null) {
    return t("distanceNA");
  }
  return `${number.toFixed(1)} km`;
}

function clearStationData() {
  state.data = null;
  state.selectedId = null;
  state.selectedStation = null;
  elements.coverageChip.textContent = t("noStation");
  elements.tableTitle.textContent = t("tableHint");
  elements.chartTitle.textContent = t("chartHint");
  elements.chartEmpty.classList.remove("is-hidden");
  renderEmptyTable();
  if (state.chart) {
    state.chart.destroy();
    state.chart = null;
  }
}

function updateChartTheme() {
  if (!state.chart) {
    return;
  }
  const axisColor = cssVar("--chart-axis");
  const gridColor = cssVar("--chart-grid");
  state.chart.options.plugins.legend.labels.color = axisColor;
  state.chart.options.scales.x.ticks.color = axisColor;
  state.chart.options.scales.y.ticks.color = axisColor;
  state.chart.options.scales.x.grid.color = gridColor;
  state.chart.options.scales.y.grid.color = gridColor;
  state.chart.options.scales.y.title.color = axisColor;
  state.chart.update();
}

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function initMap() {
  if (!window.L) {
    setStatus(t("leafletUnavailable"), "error");
    return;
  }
  state.map = L.map("map", { zoomControl: true });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "Map data (c) OpenStreetMap contributors",
  }).addTo(state.map);
  state.map.setView([DEFAULTS.lat, DEFAULTS.lon], 6);
  state.map.on("click", (event) => {
    state.mapPoint = event.latlng;
    elements.fromMapBtn.disabled = false;
    updateMapStatus();
    placeMapPoint(event.latlng);
  });
}

function placeMapPoint(latlng) {
  clearMapLayers("mapPoint");
  const marker = L.circleMarker([latlng.lat, latlng.lng], {
    radius: 7,
    color: "#1c7f85",
    fillColor: "#1c7f85",
    fillOpacity: 0.9,
  }).addTo(state.map);
  marker._tag = "mapPoint";
  state.mapLayers.push(marker);
}

function updateMapStations() {
  if (!state.map || !state.lastSearch) {
    return;
  }
  clearMapLayers("stations");
  const { lat, lon, radius } = state.lastSearch;
  const center = L.circleMarker([lat, lon], {
    radius: 6,
    color: "#1c7f85",
    fillColor: "#1c7f85",
    fillOpacity: 0.9,
  }).addTo(state.map);
  center._tag = "stations";
  state.mapLayers.push(center);

  const circle = L.circle([lat, lon], {
    radius: radius * 1000,
    color: "#1c7f85",
    fillColor: "#1c7f85",
    fillOpacity: 0.08,
  }).addTo(state.map);
  circle._tag = "stations";
  state.mapLayers.push(circle);

  state.stations.forEach((station) => {
    if (station.latitude === null || station.latitude === undefined) {
      return;
    }
    if (station.longitude === null || station.longitude === undefined) {
      return;
    }
    const isSelected = station.id === state.selectedId;
    const marker = L.circleMarker([station.latitude, station.longitude], {
      radius: isSelected ? 7 : 5,
      color: isSelected ? "#2f9b6a" : "#d16a4d",
      fillColor: isSelected ? "#2f9b6a" : "#d16a4d",
      fillOpacity: 0.85,
      weight: 1,
    }).addTo(state.map);
    marker._tag = "stations";
    marker.bindPopup(`${station.name || station.id}<br>${formatDistance(station.distance_km)}`);
    marker.on("click", () => selectStation(station.id));
    state.mapLayers.push(marker);
  });

  state.map.fitBounds(circle.getBounds(), { padding: [30, 30] });
}

function clearMapLayers(tag) {
  state.mapLayers = state.mapLayers.filter((layer) => {
    if (!tag || layer._tag === tag) {
      layer.remove();
      return false;
    }
    return true;
  });
}

init();
