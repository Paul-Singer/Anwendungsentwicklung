(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const LANGS = ["en", "de"];
  const TEXT = {
    documentTitle: ["GHCN Temperature Dashboard", "GHCN Temperatur Dashboard"],
    brandEyebrow: ["GHCN Climate Data", "GHCN Klimadaten"],
    brandTitle: ["Temperature Dashboard", "Temperatur Dashboard"],
    brandSubhead: [
      "Search stations and compare annual and seasonal means.",
      "Stationen suchen und Jahres- sowie Saisonmittel vergleichen.",
    ],
    languageLabel: ["Language", "Sprache"],
    languageEnglish: ["English", "Englisch"],
    languageGerman: ["German", "Deutsch"],
    themeLabel: ["Theme", "Thema"],
    themeLight: ["Light", "Hell"],
    themeDark: ["Dark", "Dunkel"],
    viewConfig: ["Search & Filters", "Suche & Filter"],
    viewConfigHint: [
      "Step 1: Coordinates. Step 2: Search. Step 3: Select station.",
      "Schritt 1: Koordinaten. Schritt 2: Suche. Schritt 3: Station waehlen.",
    ],
    locationLegend: ["Location", "Standort"],
    coordHint: [
      "Use decimal degrees (e.g. 49.47020, 10.90191).",
      "Dezimalgrad nutzen (z. B. 49.47020, 10.90191).",
    ],
    latitude: ["Latitude", "Breitengrad"],
    longitude: ["Longitude", "Laengengrad"],
    filterLegend: ["Filters", "Filter"],
    radius: ["Radius (km)", "Radius (km)"],
    maxStations: ["Max stations", "Max. Stationen"],
    allStations: ["All stations (ignore limit)", "Alle Stationen (Limit ignorieren)"],
    startYear: ["Start year", "Startjahr"],
    endYear: ["End year", "Endjahr"],
    search: ["Search", "Suchen"],
    reset: ["Reset", "Zuruecksetzen"],
    availableStations: ["Available Stations", "Verfuegbare Stationen"],
    sortedByDistance: ["Sorted by distance", "Nach Distanz sortiert"],
    temperatureTrends: ["Temperature Chart", "Temperatur Diagramm"],
    chartAria: ["Temperature chart", "Temperaturdiagramm"],
    emptyTitle: ["No station selected", "Keine Station gewaehlt"],
    emptyBody: [
      "Search by coordinates, pick a station, and the chart will appear.",
      "Koordinaten eingeben, Station waehlen und das Diagramm erscheint.",
    ],
    seasonsLabel: ["Seasons (optional)", "Jahreszeiten (optional)"],
    seasonSpring: ["Spring", "Fruehling"],
    seasonSummer: ["Summer", "Sommer"],
    seasonAutumn: ["Autumn", "Herbst"],
    seasonWinter: ["Winter", "Winter"],
    annualTable: ["Annual Means", "Jahresmittel"],
    tableCaption: ["Annual temperature means by year", "Jaehrliche Temperaturmittel pro Jahr"],
    yearHeader: ["Year", "Jahr"],
    tminHeader: ["Tmin (C)", "Tmin (C)"],
    tmaxHeader: ["Tmax (C)", "Tmax (C)"],
    noDataYet: ["No data yet.", "Noch keine Daten."],
    skipToContent: ["Skip to content", "Zum Inhalt springen"],
    chartHint: ["Run a search, then select a station.", "Suche ausfuehren und Station waehlen."],
    tableHint: ["Select a station to show the table.", "Station waehlen, um die Tabelle zu sehen."],
    noStationsYet: ["No stations yet", "Noch keine Stationen"],
    stationsNone: ["No stations found.", "Keine Stationen gefunden."],
    stationsLoaded: ["Stations loaded.", "Stationen geladen."],
    stationLoaded: ["Station data loaded.", "Stationsdaten geladen."],
    filtersReset: ["Filters reset.", "Filter zurueckgesetzt."],
    requestFailed: ["Request failed.", "Anfrage fehlgeschlagen."],
    stationCountSingular: ["{count} station", "{count} Station"],
    stationCountPlural: ["{count} stations", "{count} Stationen"],
    yearRangePlaceholder: ["Start - End", "Start - Ende"],
    trendsFor: ["Trends for {station}", "Trends fuer {station}"],
    annualMeansFor: ["Annual means for {station}", "Jahresmittel fuer {station}"],
    coverageStation: ["Station: {station}", "Station: {station}"],
    distanceLabel: ["{distance} km", "{distance} km"],
    noStationsAvailable: ["No stations available.", "Keine Stationen vorhanden."],
    validationLat: ["Latitude must be between -90 and 90.", "Breitengrad muss zwischen -90 und 90 liegen."],
    validationLon: ["Longitude must be between -180 and 180.", "Laengengrad muss zwischen -180 und 180 liegen."],
    validationRadius: ["Radius must be greater than 0.", "Radius muss groesser als 0 sein."],
    validationYears: [
      "Start year must be earlier than end year.",
      "Startjahr muss vor dem Endjahr liegen.",
    ],
    validationRange: [
      "Year range must be between {min} and {max}.",
      "Jahresbereich muss zwischen {min} und {max} liegen.",
    ],
    annualTmin: ["Annual Tmin", "Jahr Tmin"],
    annualTmax: ["Annual Tmax", "Jahr Tmax"],
    springTmin: ["Spring Tmin", "Fruehling Tmin"],
    springTmax: ["Spring Tmax", "Fruehling Tmax"],
    summerTmin: ["Summer Tmin", "Sommer Tmin"],
    summerTmax: ["Summer Tmax", "Sommer Tmax"],
    autumnTmin: ["Autumn Tmin", "Herbst Tmin"],
    autumnTmax: ["Autumn Tmax", "Herbst Tmax"],
    winterTmin: ["Winter Tmin", "Winter Tmin"],
    winterTmax: ["Winter Tmax", "Winter Tmax"],
    temperatureAxis: ["Temperature (C)", "Temperatur (C)"],
  };

  const form = $("#search-form");
  const latInput = $("#lat");
  const lonInput = $("#lon");
  const radiusInput = $("#radius");
  const limitInput = $("#limit");
  const allStationsInput = $("#all-stations");
  const startInput = $("#start-year");
  const endInput = $("#end-year");
  const searchBtn = $("#search-btn");
  const resetBtn = $("#reset-btn");
  const stationList = $("#station-list");
  const stationsPill = $("#stations-pill");
  const statusText = $("#status-text");
  const spinner = $("#spinner");
  const stationCount = $("#station-count");
  const yearRange = $("#year-range");
  const chartCanvas = $("#trend-chart");
  const chartEmpty = $("#chart-empty");
  const chartTitle = $("#chart-title");
  const tableTitle = $("#table-title");
  const coverageChip = $("#coverage-chip");
  const table = $("#year-table");
  const tableBody = table.querySelector("tbody");
  const langSelect = $("#lang-select");
  const themeSelect = $("#theme-select");
  const seasonChecks = $$("input[data-season]");
  const apiBase = document.body.dataset.apiBase || "";

  const defaults = {
    lat: 49.4702,
    lon: 10.90191,
    radius: 50,
    limit: 5,
    start: 1960,
    end: 2025,
  };

  let stations = [];
  let selectedId = "";
  let stationData = null;
  let chart = null;

  const langIndex = () => Math.max(0, LANGS.indexOf(langSelect.value || "en"));
  const t = (key) => (TEXT[key] || ["", ""])[langIndex()];
  const tp = (key, vars) =>
    t(key).replace(/\{(\w+)\}/g, (_, k) => (vars && k in vars ? vars[k] : ""));
  const num = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  };
  const esc = (value) =>
    String(value || "").replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );
  const fmt = (value) =>
    value === null || value === undefined || Number.isNaN(value)
      ? "n/a"
      : Number(value).toFixed(1);
  const fmtDist = (value) =>
    tp("distanceLabel", { distance: value === null ? "?" : Number(value).toFixed(1) });
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const setStatus = (text = "", tone = "") => {
    statusText.textContent = text;
    statusText.dataset.tone = tone;
  };
  const setLoading = (on) => {
    spinner.classList.toggle("active", on);
    searchBtn.disabled = on;
  };
  const setStationsPill = (count) => {
    const text =
      count && count > 0
        ? tp(count === 1 ? "stationCountSingular" : "stationCountPlural", { count })
        : t("noStationsYet");
    stationsPill.textContent = text;
    stationsPill.classList.toggle("active", count > 0);
    stationCount.textContent = text;
  };

  const applyDefaults = () => {
    latInput.value = defaults.lat;
    lonInput.value = defaults.lon;
    radiusInput.value = defaults.radius;
    limitInput.value = defaults.limit;
    startInput.value = defaults.start;
    endInput.value = defaults.end;
    allStationsInput.checked = false;
    limitInput.disabled = false;
    yearRange.textContent = t("yearRangePlaceholder");
  };

  const activeStationName = () => {
    const station = stations.find((item) => item.id === selectedId);
    return station ? station.name : "";
  };

  const applyLanguage = () => {
    document.documentElement.lang = langSelect.value;
    document.title = t("documentTitle");
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (TEXT[key]) {
        el.textContent = t(key);
      }
    });
    $$("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (TEXT[key]) {
        el.setAttribute("aria-label", t(key));
      }
    });
    chartTitle.textContent = selectedId ? tp("trendsFor", { station: activeStationName() }) : t("chartHint");
    tableTitle.textContent = selectedId ? tp("annualMeansFor", { station: activeStationName() }) : t("tableHint");
    setStationsPill(stations.length);
    if (!stations.length) {
      yearRange.textContent = t("yearRangePlaceholder");
    }
    if (!selectedId) {
      coverageChip.textContent = t("noStationsYet");
    }
    renderTable();
    renderChart();
  };

  const setTheme = (value) => {
    document.documentElement.dataset.theme = value;
    themeSelect.value = value;
    localStorage.setItem("ghcn-theme", value);
    renderChart();
  };

  const validate = ({ lat, lon, radius, start, end }) => {
    if (lat === null || lat < -90 || lat > 90) return t("validationLat");
    if (lon === null || lon < -180 || lon > 180) return t("validationLon");
    if (radius === null || radius <= 0) return t("validationRadius");
    if (start === null || end === null) return tp("validationRange", { min: startInput.min, max: endInput.max });
    if (start > end) return t("validationYears");
    const minYear = Number(startInput.min) || 1800;
    const maxYear = Number(endInput.max) || 2025;
    if (start < minYear || end > maxYear) return tp("validationRange", { min: minYear, max: maxYear });
    return "";
  };

  const updateStations = (items) => {
    stations = items || [];
    selectedId = "";
    stationData = null;
    setStationsPill(stations.length);
    stationList.innerHTML = "";
    chartEmpty.classList.remove("is-hidden");
    if (!stations.length) {
      stationList.innerHTML = `<li class="muted">${t("noStationsAvailable")}</li>`;
      return;
    }
    stations.forEach((station) => {
      const li = document.createElement("li");
      li.innerHTML = `<button class="station-item" type="button" data-id="${station.id}">
          <span>${esc(station.name)}</span>
          <span>${fmtDist(station.distance_km)}</span>
        </button>`;
      stationList.appendChild(li);
    });
  };

  const setActiveStation = (id) => {
    selectedId = id;
    $$(".station-item").forEach((btn) => {
      const active = btn.dataset.id === id;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };

  const getFormValues = () => ({
    lat: num(latInput.value),
    lon: num(lonInput.value),
    radius: num(radiusInput.value),
    limit: num(limitInput.value),
    start: num(startInput.value),
    end: num(endInput.value),
  });

  const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      let message = "";
      try {
        const data = await response.json();
        message = data && data.error ? data.error : "";
      } catch (error) {
        message = "";
      }
      throw new Error(message || t("requestFailed"));
    }
    return response.json();
  };

  const onSearch = async (event) => {
    event.preventDefault();
    setStatus("");
    const values = getFormValues();
    const error = validate(values);
    if (error) {
      setStatus(error, "error");
      return;
    }
    const params = new URLSearchParams({
      lat: values.lat,
      lon: values.lon,
      radius: values.radius,
      start: values.start,
      end: values.end,
    });
    if (!allStationsInput.checked && values.limit) {
      params.set("limit", values.limit);
    }
    setLoading(true);
    try {
      const data = await fetchJson(`${apiBase}/stations?${params.toString()}`);
      updateStations(data);
      yearRange.textContent = `${values.start} - ${values.end}`;
      setStatus(data.length ? t("stationsLoaded") : t("stationsNone"), data.length ? "success" : "");
    } catch (error) {
      setStatus(error.message || t("requestFailed"), "error");
    } finally {
      setLoading(false);
      renderTable();
      renderChart();
    }
  };

  const onReset = () => {
    applyDefaults();
    updateStations([]);
    setStatus(t("filtersReset"), "success");
    coverageChip.textContent = t("noStationsYet");
    chartTitle.textContent = t("chartHint");
    tableTitle.textContent = t("tableHint");
    tableBody.innerHTML = `<tr class="empty-row"><td colspan="3">${t("noDataYet")}</td></tr>`;
  };

  const onStationClick = async (event) => {
    const btn = event.target.closest("button[data-id]");
    if (!btn) return;
    const id = btn.dataset.id;
    const values = getFormValues();
    setActiveStation(id);
    setLoading(true);
    try {
      const data = await fetchJson(`${apiBase}/station/${id}/data?start=${values.start}&end=${values.end}`);
      stationData = data;
      chartEmpty.classList.add("is-hidden");
      chartTitle.textContent = tp("trendsFor", { station: data.name });
      tableTitle.textContent = tp("annualMeansFor", { station: data.name });
      coverageChip.textContent = tp("coverageStation", { station: data.name });
      setStatus(t("stationLoaded"), "success");
    } catch (error) {
      setStatus(error.message || t("requestFailed"), "error");
      stationData = null;
      chartEmpty.classList.remove("is-hidden");
    } finally {
      setLoading(false);
      renderTable();
      renderChart();
    }
  };

  const seasonKeys = () => seasonChecks.filter((item) => item.checked).map((item) => item.dataset.season);

  const seriesByYear = (years, list, key) => {
    const map = new Map((list || []).map((item) => [item.year, item]));
    return years.map((year) => (map.has(year) ? map.get(year)[key] : null));
  };

  const cap = (value) => value.charAt(0).toUpperCase() + value.slice(1);

  const renderTable = () => {
    const seasons = seasonKeys();
    const head = `<tr>
        <th scope="col">${t("yearHeader")}</th>
        <th scope="col">${t("tminHeader")}</th>
        <th scope="col">${t("tmaxHeader")}</th>
        ${seasons
          .map(
            (s) =>
              `<th scope="col">${t(`season${cap(s)}`)} Tmin</th><th scope="col">${t(`season${cap(s)}`)} Tmax</th>`
          )
          .join("")}
      </tr>`;
    table.querySelector("thead").innerHTML = head;
    if (!stationData || !stationData.annual || !stationData.annual.length) {
      const cols = 3 + seasons.length * 2;
      tableBody.innerHTML = `<tr class="empty-row"><td colspan="${cols}">${t("noDataYet")}</td></tr>`;
      return;
    }
    const seasonsData = stationData.seasons || {};
    tableBody.innerHTML = stationData.annual
      .map((row) => {
        const cells = seasons
          .map((season) => {
            const list = seasonsData[season] || [];
            const found = list.find((item) => item.year === row.year) || {};
            return `<td>${fmt(found.tmin)}</td><td>${fmt(found.tmax)}</td>`;
          })
          .join("");
        return `<tr><td>${row.year}</td><td>${fmt(row.tmin)}</td><td>${fmt(row.tmax)}</td>${cells}</tr>`;
      })
      .join("");
  };

  const renderChart = () => {
    if (!chartCanvas || !stationData || !stationData.annual || !stationData.annual.length) {
      if (chart) {
        chart.destroy();
        chart = null;
      }
      return;
    }
    const years = stationData.annual.map((row) => row.year);
    const seasons = seasonKeys();
    const colors = {
      annualTmin: css("--accent"),
      annualTmax: "#d6604f",
      springTmin: "#4caf50",
      springTmax: "#2e7d32",
      summerTmin: "#f4a261",
      summerTmax: "#e76f51",
      autumnTmin: "#8d6e63",
      autumnTmax: "#6d4c41",
      winterTmin: "#5c6bc0",
      winterTmax: "#3949ab",
    };

    const datasets = [
      {
        label: t("annualTmin"),
        data: stationData.annual.map((row) => row.tmin),
        borderColor: colors.annualTmin,
      },
      {
        label: t("annualTmax"),
        data: stationData.annual.map((row) => row.tmax),
        borderColor: colors.annualTmax,
      },
    ];

    seasons.forEach((season) => {
      const list = stationData.seasons && stationData.seasons[season];
      datasets.push(
        {
          label: t(`${season}Tmin`),
          data: seriesByYear(years, list, "tmin"),
          borderColor: colors[`${season}Tmin`],
        },
        {
          label: t(`${season}Tmax`),
          data: seriesByYear(years, list, "tmax"),
          borderColor: colors[`${season}Tmax`],
        }
      );
    });

    datasets.forEach((set) => {
      set.borderWidth = 2;
      set.pointRadius = 2;
      set.tension = 0.25;
    });

    const grid = css("--chart-grid");
    const axis = css("--chart-axis");

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: axis, boxWidth: 12, boxHeight: 12 },
        },
      },
      interaction: { mode: "index", intersect: false },
      scales: {
        x: { ticks: { color: axis }, grid: { color: grid } },
        y: {
          ticks: { color: axis },
          grid: { color: grid },
          title: { display: true, text: t("temperatureAxis"), color: axis },
        },
      },
    };

    if (chart) {
      chart.data.labels = years;
      chart.data.datasets = datasets;
      chart.options = options;
      chart.update();
    } else if (window.Chart) {
      chart = new Chart(chartCanvas.getContext("2d"), {
        type: "line",
        data: { labels: years, datasets },
        options,
      });
    }
  };

  form.addEventListener("submit", onSearch);
  resetBtn.addEventListener("click", onReset);
  stationList.addEventListener("click", onStationClick);
  allStationsInput.addEventListener("change", () => {
    limitInput.disabled = allStationsInput.checked;
  });
  seasonChecks.forEach((box) =>
    box.addEventListener("change", () => {
      renderTable();
      renderChart();
    })
  );
  langSelect.addEventListener("change", () => {
    localStorage.setItem("ghcn-lang", langSelect.value);
    applyLanguage();
  });
  themeSelect.addEventListener("change", () => setTheme(themeSelect.value));

  const init = () => {
    applyDefaults();
    const savedLang = localStorage.getItem("ghcn-lang");
    if (savedLang && LANGS.includes(savedLang)) {
      langSelect.value = savedLang;
    }
    const savedTheme = localStorage.getItem("ghcn-theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme || (prefersDark ? "dark" : "light"));
    applyLanguage();
    setStationsPill(0);
    setStatus("");
    tableTitle.textContent = t("tableHint");
    chartTitle.textContent = t("chartHint");
  };

  init();
})();
