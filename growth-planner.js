// Growth planner — season planning from growth_planner.pkl data (growth-planner-data.js).
// Relies on t()/trText()/currentLocale() from app.js (loaded before this file).
(() => {
  const data = window.GROWTH_PLANNER_DATA;
  const form = document.getElementById("growthForm");
  if (!data || !form) return;

  const profiles = data.profiles;
  const templates = data.stage_templates;
  const constants = data.constants;
  const STORAGE_KEY = "terraGrowthPlan";

  const displayNames = {
    rice: "Rice", maize: "Maize", wheat: "Wheat", barley: "Barley", millet: "Millet",
    chickpea: "Chickpea", kidneybeans: "Kidney beans", pigeonpeas: "Pigeon pea",
    mothbeans: "Moth beans", mungbean: "Mung bean", blackgram: "Black gram",
    lentil: "Lentil", soybean: "Soybean", groundnut: "Groundnut", cotton: "Cotton",
    sugarcane: "Sugarcane", jute: "Jute", potato: "Potato", tomato: "Tomato",
    watermelon: "Watermelon", muskmelon: "Muskmelon", coffee: "Coffee", banana: "Banana",
    grapes: "Grapes", pomegranate: "Pomegranate", mango: "Mango", orange: "Orange",
    apple: "Apple", papaya: "Papaya", coconut: "Coconut",
  };
  const sourceMeta = {
    rainfed: { icon: "☔", key: "sourceRainfed" },
    well: { icon: "◍", key: "sourceWell" },
    borewell: { icon: "↧", key: "sourceBorewell" },
    canal: { icon: "≈", key: "sourceCanal" },
    drip: { icon: "💧", key: "sourceDrip" },
  };
  const groupKeys = {
    cereal: "groupCereal", pulse: "groupPulse", cash: "groupCash",
    vegetable: "groupVegetable", cucurbit: "groupCucurbit", perennial: "groupPerennial",
  };

  // stage names arrive as English strings inside the pkl's stage templates
  const stageTranslations = {
    "Land preparation": { hi: "खेत की तैयारी", mr: "जमिनीची मशागत", te: "భూమి తయారీ" },
    "Sowing + basal dose": { hi: "बुवाई + आधार खाद", mr: "पेरणी + बेसल डोस", te: "విత్తనం + బేసల్ డోస్" },
    "First weeding": { hi: "पहली निराई", mr: "पहिली खुरपणी", te: "మొదటి కలుపు తీత" },
    "Top dressing 1": { hi: "पहली टॉप ड्रेसिंग", mr: "टॉप ड्रेसिंग १", te: "టాప్ డ్రెస్సింగ్ 1" },
    "Top dressing 2": { hi: "दूसरी टॉप ड्रेसिंग", mr: "टॉप ड्रेसिंग २", te: "టాప్ డ్రెస్సింగ్ 2" },
    "Top dressing": { hi: "टॉप ड्रेसिंग", mr: "टॉप ड्रेसिंग", te: "టాప్ డ్రెస్సింగ్" },
    "Pest scouting spray": { hi: "कीट निगरानी छिड़काव", mr: "कीड पाहणी फवारणी", te: "పురుగు పరిశీలన పిచికారీ" },
    Harvest: { hi: "कटाई", mr: "कापणी", te: "కోత" },
    "Sowing + seed treatment": { hi: "बुवाई + बीज उपचार", mr: "पेरणी + बीजप्रक्रिया", te: "విత్తనం + విత్తన శుద్ధి" },
    "Pod borer spray": { hi: "फली छेदक छिड़काव", mr: "घाटे अळी फवारणी", te: "కాయ తొలుచు పురుగు పిచికారీ" },
    "Second spray": { hi: "दूसरा छिड़काव", mr: "दुसरी फवारणी", te: "రెండవ పిచికారీ" },
    "Pest management 1": { hi: "कीट प्रबंधन 1", mr: "कीड व्यवस्थापन १", te: "పురుగు నిర్వహణ 1" },
    "Pest management 2": { hi: "कीट प्रबंधन 2", mr: "कीड व्यवस्थापन २", te: "పురుగు నిర్వహణ 2" },
    "Harvest / picking": { hi: "कटाई / तुड़ाई", mr: "कापणी / वेचणी", te: "కోత / తెంపడం" },
    "Pruning + basin repair": { hi: "छंटाई + थाला मरम्मत", mr: "छाटणी + आळे दुरुस्ती", te: "కత్తిరింపు + పాదు మరమ్మతు" },
    "Manure + basal dose": { hi: "खाद + आधार खुराक", mr: "शेणखत + बेसल डोस", te: "ఎరువు + బేసల్ డోస్" },
    "Irrigation cycle": { hi: "सिंचाई चक्र", mr: "पाणी पाळी", te: "నీటి తడి" },
    "Pest / disease round 1": { hi: "कीट/रोग दौर 1", mr: "कीड/रोग फेरी १", te: "పురుగు/తెగులు విడత 1" },
    "Pest / disease round 2": { hi: "कीट/रोग दौर 2", mr: "कीड/रोग फेरी २", te: "పురుగు/తెగులు విడత 2" },
    "Land prep + mulch": { hi: "खेत तैयारी + मल्च", mr: "मशागत + आच्छादन", te: "భూమి తయారీ + మల్చింగ్" },
    "Trailing + weeding": { hi: "बेल फैलाव + निराई", mr: "वेल पसरवणे + खुरपणी", te: "తీగ సర్దుట + కలుపు తీత" },
    Fertigation: { hi: "फर्टिगेशन", mr: "फर्टिगेशन", te: "ఫర్టిగేషన్" },
    "Fruit fly management": { hi: "फल मक्खी प्रबंधन", mr: "फळमाशी व्यवस्थापन", te: "పండు ఈగ నిర్వహణ" },
    "Harvest (multi-pick)": { hi: "कटाई (कई तुड़ाई)", mr: "कापणी (अनेक तोडे)", te: "కోత (పలు విడతలు)" },
    "Land prep + bed making": { hi: "खेत तैयारी + क्यारी", mr: "मशागत + गादीवाफे", te: "భూమి తయారీ + మడులు" },
    "Seed material + planting": { hi: "बीज सामग्री + रोपाई", mr: "बियाणे + लागवड", te: "విత్తనం + నాటడం" },
    "Gap filling + weeding": { hi: "गैप भराई + निराई", mr: "नांगे भरणे + खुरपणी", te: "ఖాళీ నింపడం + కలుపు తీత" },
  };
  const stageName = (name) => {
    const language = localStorage.getItem("terraLanguage") || "en";
    return stageTranslations[name]?.[language] || name;
  };

  const cropName = (id) => trText(displayNames[id] || id);
  const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const formatDate = (date) => {
    try {
      return date.toLocaleDateString(currentLocale(), { day: "numeric", month: "short" });
    } catch { return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" }); }
  };

  // ----- form setup -----
  const sourcesBox = document.getElementById("waterSources");
  Object.entries(constants.IRRIGATION_CAPACITY_MM).forEach(([source, capacity], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "source-card" + (index === 0 ? " selected" : "");
    button.dataset.source = source;
    const extra = source === "drip"
      ? t("dripBonus", { percent: Math.round(constants.DRIP_EFFICIENCY_GAIN * 100) })
      : t("addsWater", { mm: capacity });
    button.innerHTML = `<b>${sourceMeta[source].icon}</b><span><strong data-i18n="${sourceMeta[source].key}">${t(sourceMeta[source].key)}</strong><small>${extra}</small></span><i>✓</i>`;
    sourcesBox.appendChild(button);
  });
  sourcesBox.addEventListener("click", (event) => {
    const card = event.target.closest(".source-card");
    if (!card) return;
    sourcesBox.querySelectorAll(".source-card").forEach((c) => c.classList.toggle("selected", c === card));
  });

  const goalSwitch = document.getElementById("goalSwitch");
  goalSwitch.addEventListener("click", (event) => {
    const card = event.target.closest(".goal-card");
    if (!card) return;
    goalSwitch.querySelectorAll(".goal-card").forEach((c) => c.classList.toggle("selected", c === card));
  });

  const cropSelect = document.getElementById("inputCrop");
  Object.keys(profiles)
    .map((id) => ({ id, label: cropName(id) }))
    .sort((a, b) => a.label.localeCompare(b.label))
    .forEach(({ id, label }) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = label;
      cropSelect.appendChild(option);
    });

  const sowingInput = document.getElementById("inputSowingDate");
  sowingInput.value = new Date().toISOString().slice(0, 10);

  // ----- planning maths -----
  const volatilityScore = { low: 1, medium: 0.5, high: 0 };

  function evaluateCrop(id, context) {
    const profile = profiles[id];
    const capacity = constants.IRRIGATION_CAPACITY_MM[context.source] || 0;
    const waterNeed = profile.water_mm * (context.source === "drip" ? 1 - constants.DRIP_EFFICIENCY_GAIN : 1);
    const irrigationMm = Math.min(capacity, Math.max(0, waterNeed - context.rainfall));
    const waterOk = context.rainfall + capacity >= waterNeed;

    const inputCost = profile.cost * context.acres;
    const irrigationCost = irrigationMm * constants.IRRIGATION_COST_PER_MM_ACRE * context.acres;
    const labourTotal = profile.labour_days * context.acres;
    const hiredDays = Math.max(0, labourTotal - context.ownLabour);
    const labourCost = hiredDays * constants.HIRED_LABOUR_RATE;
    const spend = inputCost + irrigationCost + labourCost;
    const revenue = profile.yield_per_acre * profile.price_per_qtl * context.acres;
    const net = revenue - spend;

    let seasonOk = true;
    if (profile.season && constants.SEASON_WINDOWS[profile.season]) {
      const [first, last] = constants.SEASON_WINDOWS[profile.season];
      const month = context.sowing.getMonth() + 1;
      seasonOk = month >= first && month <= last;
    }
    const upfrontPerAcre = profile.cost + (profile.establishment_cost || 0);
    return {
      id, profile, waterNeed, irrigationMm, waterOk, seasonOk,
      inputCost, irrigationCost, labourTotal, hiredDays, labourCost,
      spend, revenue, net, netPerAcre: net / context.acres,
      roi: spend > 0 ? net / spend : 0,
      safety: 0.6 * (volatilityScore[profile.price_volatility] ?? 0.5) + 0.4 * (profile.msp_backed ? 1 : 0),
      upfrontPerAcre,
    };
  }

  function rankCrops(context) {
    const results = Object.keys(profiles).map((id) => evaluateCrop(id, context));
    const norm = (values) => {
      const min = Math.min(...values), max = Math.max(...values);
      return (v) => (max === min ? 0.5 : (v - min) / (max - min));
    };
    const nNet = norm(results.map((r) => r.netPerAcre));
    const nRoi = norm(results.map((r) => r.roi));
    const nWater = norm(results.map((r) => r.waterNeed));
    const nCapital = norm(results.map((r) => r.upfrontPerAcre));
    const weights = constants.GOAL_WEIGHTS[context.goal] || constants.GOAL_WEIGHTS.max_profit;
    results.forEach((r) => {
      const factors = [nNet(r.netPerAcre), nRoi(r.roi), r.safety, 1 - nWater(r.waterNeed), 1 - nCapital(r.upfrontPerAcre)];
      r.score = factors.reduce((sum, f, i) => sum + f * weights[i], 0);
      if (!r.seasonOk) r.score *= 0.6;
      if (!r.waterOk) r.score *= 0.5;
    });
    return results.sort((a, b) => b.score - a.score);
  }

  function buildStages(result, context) {
    const template = templates[result.profile.group] || templates.cereal;
    return template.map(([name, fraction, costShare, labourShare]) => {
      const date = new Date(context.sowing);
      date.setDate(date.getDate() + Math.round(fraction * result.profile.duration_days));
      return {
        name, date,
        cost: costShare * result.inputCost,
        labour: Math.max(1, Math.round(labourShare * result.labourTotal)),
      };
    });
  }

  // ----- rendering -----
  const resultsBox = document.getElementById("growthResults");
  const matchStrip = document.getElementById("matchStrip");
  const planDetail = document.getElementById("planDetail");
  let ranked = [];
  let context = null;

  function renderMatches(selectedId) {
    matchStrip.innerHTML = "";
    ranked.slice(0, 6).forEach((result) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "match-card" + (result.id === selectedId ? " selected" : "");
      card.dataset.crop = result.id;
      const flags = [];
      if (result.profile.msp_backed) flags.push(`<em>${t("mspBadge")}</em>`);
      if (result.profile.n_fixing) flags.push(`<em>${trText("Soil builder")}</em>`);
      if (result.profile.group === "perennial") flags.push(`<em>${trText("Perennial")}</em>`);
      if (!result.seasonOk) flags.push(`<em class="warn">${t("offSeason")}</em>`);
      if (!result.waterOk) flags.push(`<em class="warn">${t("waterTight")}</em>`);
      card.innerHTML = `<small>${t(groupKeys[result.profile.group] || "groupCereal")}</small><b>${cropName(result.id)}</b><span class="match-net${result.net < 0 ? " negative" : ""}">${money(result.net)} ${t("matchNet")}</span><div class="match-flags">${flags.join("")}</div>`;
      matchStrip.appendChild(card);
    });
  }

  function renderPlan(result) {
    const stages = buildStages(result, context);
    const profile = result.profile;
    const capacity = constants.IRRIGATION_CAPACITY_MM[context.source] || 0;
    const scaleMax = Math.max(result.waterNeed, context.rainfall + result.irrigationMm) || 1;
    const rainWidth = Math.min(100, (Math.min(context.rainfall, result.waterNeed) / scaleMax) * 100);
    const irrigationWidth = Math.min(100 - rainWidth, (result.irrigationMm / scaleMax) * 100);
    const needLeft = Math.min(100, (result.waterNeed / scaleMax) * 100);

    const seasonTag = profile.season
      ? `<span class="plan-season-tag${result.seasonOk ? "" : " warn"}">${t("season_" + profile.season)}${result.seasonOk ? "" : " · " + t("offSeason")}</span>`
      : "";

    const statCards = [
      [money(result.spend), t("estSpend")],
      [money(result.revenue), t("estRevenue")],
      [`<b class="${result.net < 0 ? "negative" : ""}">${money(result.net)}</b>`, t("estNet"), true],
      [money(result.spend / Math.max(1, profile.yield_per_acre * context.acres)) + "/q", t("breakEven")],
    ].map(([value, label, raw]) => `<p>${raw ? value : `<b>${value}</b>`}<span>${label}</span></p>`).join("");

    const stageRows = stages.map((stage) => `
      <div class="stage-row">
        <span class="stage-date">${formatDate(stage.date)}</span>
        <span class="stage-name">${stageName(stage.name)}</span>
        <span class="stage-cost">${money(stage.cost)}</span>
        <span class="stage-labour">${stage.labour} ${t("daysUnit")}</span>
      </div>`).join("");

    const harvest = stages[stages.length - 1];
    const notes = [];
    if (profile.group === "perennial") {
      notes.push(t("perennialNote", {
        cost: (profile.establishment_cost || 0).toLocaleString("en-IN"),
        year: profile.years_to_income || 1,
        span: profile.productive_years || "—",
      }));
    }
    notes.push(t("harvestNote", {
      qtl: Math.round(profile.yield_per_acre * context.acres).toLocaleString("en-IN"),
      date: formatDate(harvest.date),
      price: profile.price_per_qtl.toLocaleString("en-IN"),
    }));
    if (result.hiredDays > 0) {
      notes.push(t("labourNote", {
        total: Math.round(result.labourTotal), hired: Math.round(result.hiredDays),
        cost: Math.round(result.labourCost).toLocaleString("en-IN"),
      }));
    }
    if (profile.note) notes.push(profile.note);

    planDetail.innerHTML = `
      <div class="plan-header"><div><p class="kicker">${t("seasonPlanKicker")}</p><h3>${cropName(result.id)}</h3></div>${seasonTag}</div>
      <div class="plan-stats">${statCards}</div>
      <div class="water-check">
        <h4>${t("waterCheckTitle")}</h4>
        <p>${t("waterCheckCopy", { need: Math.round(result.waterNeed), rain: Math.round(context.rainfall), extra: capacity })}</p>
        <div class="water-meter"><i class="rain-fill" style="width:${rainWidth}%"></i><i class="irrigation-fill" style="left:${rainWidth}%;width:${irrigationWidth}%"></i><i style="left:${needLeft}%;width:2px;background:#c58f4a"></i></div>
        <div class="water-legend"><span><i class="dot-rain"></i>${t("waterRain")}</span><span><i class="dot-irrigation"></i>${t("waterIrrigation")}</span><span><i class="dot-need"></i>${t("waterNeed")}</span></div>
        <p class="water-verdict${result.waterOk ? "" : " short"}">${result.waterOk ? t("waterOkMsg") : t("waterShortMsg")}</p>
      </div>
      <div class="stage-table">
        <div class="stage-row head"><span>${t("stageWhen")}</span><span>${t("stageWork")}</span><span class="stage-cost">${t("stageCost")}</span><span class="stage-labour">${t("stageLabour")}</span></div>
        ${stageRows}
      </div>
      ${notes.map((note) => `<p class="plan-note">${note}</p>`).join("")}`;
  }

  matchStrip.addEventListener("click", (event) => {
    const card = event.target.closest(".match-card");
    if (!card) return;
    matchStrip.querySelectorAll(".match-card").forEach((c) => c.classList.toggle("selected", c === card));
    const result = ranked.find((r) => r.id === card.dataset.crop);
    if (result) renderPlan(result);
  });

  // ----- submit + persistence -----
  function readForm() {
    return {
      acres: Math.max(0.1, parseFloat(document.getElementById("inputAcres").value) || 1),
      sowingDate: sowingInput.value,
      ownLabour: Math.max(0, parseFloat(document.getElementById("inputOwnLabour").value) || 0),
      source: sourcesBox.querySelector(".source-card.selected")?.dataset.source || "rainfed",
      rainfall: Math.max(0, parseFloat(document.getElementById("inputRainfall").value) || 0),
      crop: cropSelect.value,
      goal: goalSwitch.querySelector(".goal-card.selected")?.dataset.goal || "max_profit",
    };
  }

  function buildResults(saved) {
    context = {
      ...saved,
      sowing: saved.sowingDate ? new Date(saved.sowingDate + "T00:00:00") : new Date(),
      ownLabour: saved.ownLabour,
    };
    ranked = rankCrops(context);
    let selected = saved.crop !== "auto" ? ranked.find((r) => r.id === saved.crop) : ranked[0];
    if (!selected) selected = ranked[0];
    if (saved.crop !== "auto" && !ranked.slice(0, 6).some((r) => r.id === selected.id)) {
      ranked = [selected, ...ranked.filter((r) => r.id !== selected.id)];
    }
    renderMatches(selected.id);
    renderPlan(selected);
    resultsBox.hidden = false;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const saved = readForm();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    buildResults(saved);
    resultsBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // restore a previous plan (also keeps results visible across the language-change reload)
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && saved.acres) {
      document.getElementById("inputAcres").value = saved.acres;
      if (saved.sowingDate) sowingInput.value = saved.sowingDate;
      if (saved.ownLabour) document.getElementById("inputOwnLabour").value = saved.ownLabour;
      document.getElementById("inputRainfall").value = saved.rainfall;
      cropSelect.value = saved.crop && (saved.crop === "auto" || profiles[saved.crop]) ? saved.crop : "auto";
      sourcesBox.querySelectorAll(".source-card").forEach((c) => c.classList.toggle("selected", c.dataset.source === saved.source));
      goalSwitch.querySelectorAll(".goal-card").forEach((c) => c.classList.toggle("selected", c.dataset.goal === saved.goal));
      buildResults(saved);
    }
  } catch { /* start fresh */ }
})();
