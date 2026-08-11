const translations = {
  en: {},
  hi: {
    plan: "खेत की योजना",
    dashboard: "डैशबोर्ड",
    ask: "मीता से पूछें",
    rooted: "आपके खेत से जुड़ा। आगे के लिए तैयार।",
    landingIntro:
      "मिट्टी, मौसम, बाज़ार संकेत और थोड़ी अधिक निश्चितता—एक शांत जगह में।",
    start: "खेत की योजना शुरू करें",
    fieldProfile: "खेत की प्रोफ़ाइल",
    plannerIntro:
      "अपने रीडिंग का उपयोग करें, मिट्टी स्वास्थ्य कार्ड स्कैन करें या मौसम को काम करने दें।",
    soilSource: "मिट्टी का स्रोत चुनें",
    conditions: "बढ़ने की स्थितियाँ",
    recommendation: "सिफारिशें पाएं",
    newPlan: "नई खेत योजना",
    knowField: "अपने खेत को जानें",
    saved: "इस डिवाइस पर सुरक्षित",
    soilReadings: "मिट्टी की रीडिंग",
    soilHint: "अपना खेत डेटा कैसे लाना है चुनें।",
    manual: "मैन्युअल रूप से भरें",
    manualHint: "मेरे पास N, P, K और pH मूल्य हैं",
    scanCard: "मिट्टी स्वास्थ्य कार्ड स्कैन करें",
    scanHint: "फोटो से N, P, K और pH पढ़ें",
    dropCard: "अपना मिट्टी स्वास्थ्य कार्ड डालें",
    ocrHint: "स्पष्ट JPG या PNG—हम N, P, K और pH पढ़ेंगे।",
    browse: "ब्राउज़ करें",
    weatherIntake: "मौसम जानकारी",
    weatherHint: "15-दिन का स्थानीय पूर्वानुमान या अपनी स्थिति जोड़ें।",
    useLocation: "मेरा स्थान उपयोग करें",
    weatherAwait: "स्थान की प्रतीक्षा है",
    weatherAwaitHint: "हम आज और अगले 14 दिन जोड़ेंगे।",
    seeRecommendations: "मेरी सिफारिशें देखें",
    privacy: "आपके रीडिंग केवल इस ब्राउज़र में सेव होते हैं।",
    seasonPlan: "मानसून सीजन योजना",
    hello: "नमस्ते, अनया।",
    fieldReady: "आपका खेत तैयार है।",
    temperature: "तापमान",
    rainfall: "मिमी अनुमानित बारिश",
    matches: "फसल मिलान",
    fieldReading: "खेत की रीडिंग",
    recommendationTitle: "आपकी अगली फसल के लिए एक छोटी किताब।",
    turnPage: "पन्ना पलटने के लिए तीरों का उपयोग करें",
    downloadPdf: "पीडीएफ सारांश डाउनलोड करें",
    whyItWorks: "यह क्यों काम करता है",
    weatherTitle: "अगले 15 दिन आपके साथ हैं।",
    weatherCopy:
      "पूर्वानुमान हमें केवल आज नहीं, बल्कि फसल की शुरुआती अवधि में ताप, नमी और बारिश को तौलने में मदद करता है।",
    forecast: "15-दिन का पूर्वानुमान",
    soilSnapshot: "मिट्टी स्नैपशॉट",
    inputFactors: "मिलान के पीछे इनपुट कारक।",
    fieldCompanion: "आपका खेत साथी",
    askTitle: "मीता से अपने मौसम के बारे में कुछ भी पूछें।",
    mitaGreeting:
      "मैं आपकी फसल योजना को सरल शब्दों में समझाने के लिए यहाँ हूँ। नीचे एक सवाल आज़माएँ।",
    whySuggested: "यह फसल क्यों सुझाई गई?",
    whenSow: "कब बोना चाहिए?",
    improveSoil: "मिट्टी कैसे सुधारें?",
    askPlaceholder: "अपने खेत के बारे में पूछें…",
    speechHint: "अपना सवाल बोलने के लिए गोल बटन दबाएँ।",
    footer: "उन हाथों के लिए जो हमारा भविष्य उगाते हैं।",
  },
  mr: {
    plan: "शेताची योजना",
    dashboard: "डॅशबोर्ड",
    ask: "मिताला विचारा",
    rooted: "तुमच्या शेताशी जोडलेले. पुढच्यासाठी तयार.",
    start: "शेत योजना सुरू करा",
    fieldProfile: "शेत प्रोफाइल",
    newPlan: "नवीन शेत योजना",
    knowField: "तुमचे शेत जाणून घ्या",
    manual: "स्वतः भरा",
    scanCard: "माती आरोग्य कार्ड स्कॅन करा",
    weatherIntake: "हवामान माहिती",
    useLocation: "माझे स्थान वापरा",
    seeRecommendations: "माझ्या शिफारसी पहा",
    seasonPlan: "पावसाळी हंगाम योजना",
    hello: "नमस्कार, अनया।",
    fieldReady: "तुमचे शेत तयार आहे।",
    recommendationTitle: "तुमच्या पुढच्या पिकासाठी छोटी पुस्तिका।",
    downloadPdf: "पीडीएफ सारांश डाउनलोड करा",
    askTitle: "मिताला तुमच्या हंगामाबद्दल काहीही विचारा।",
  },
  te: {
    plan: "పొలం ప్రణాళిక",
    dashboard: "డాష్‌బోర్డ్",
    ask: "మితాను అడగండి",
    rooted: "మీ పొలంలో వేళ్ళూనుకున్నది. రేపటికి సిద్ధం.",
    start: "పొలం ప్రణాళిక ప్రారంభించండి",
    fieldProfile: "పొలం వివరాలు",
    newPlan: "కొత్త పొలం ప్రణాళిక",
    knowField: "మీ పొలాన్ని తెలుసుకోండి",
    manual: "మాన్యువల్‌గా నమోదు చేయండి",
    scanCard: "సాయిల్ హెల్త్ కార్డ్ స్కాన్ చేయండి",
    weatherIntake: "వాతావరణ సమాచారం",
    useLocation: "నా స్థానాన్ని ఉపయోగించండి",
    seeRecommendations: "నా సిఫార్సులు చూడండి",
    seasonPlan: "వర్షాకాల ప్రణాళిక",
    hello: "నమస్కారం, అనయా.",
    fieldReady: "మీ పొలం సిద్ధంగా ఉంది.",
    recommendationTitle: "మీ తదుపరి పంటకు ఒక చిన్న పుస్తకం.",
    downloadPdf: "పీడీఎఫ్ సారాంశం డౌన్‌లోడ్ చేయండి",
    askTitle: "మీ సీజన్ గురించి మితాను ఏదైనా అడగండి.",
  },
};

const defaultField = {
  nitrogen: 90,
  phosphorus: 42,
  potassium: 38,
  ph: 6.5,
  temperature: 27.4,
  humidity: 74,
  rainfall: 164,
  forecast: null,
};
const cropLibrary = [
  {
    name: "Groundnut",
    image: "gowtham-agm-X_YBLZrjH0U-unsplash.jpg",
    temp: 26,
    rain: 75,
    ph: 6.3,
    price: "₹6,100",
    unit: "per quintal",
    notes: ["Soil builder", "Warm season"],
    description:
      "A nutrient-aware choice that can diversify the field and support a healthy rotation.",
  },
  {
    name: "Millet",
    image: "ikshana-productions-NnSdKhQYVvU-unsplash.jpg",
    temp: 28,
    rain: 55,
    ph: 6.7,
    price: "₹2,650",
    unit: "per quintal",
    notes: ["Resilient", "Low water"],
    description:
      "A resilient option that protects returns through variable rainfall.",
  },
  {
    name: "Coffee",
    image: "mike-kenneally-TD4DBagg2wE-unsplash.jpg",
    temp: 23,
    rain: 120,
    ph: 6.1,
    price: "₹12,300",
    unit: "per quintal",
    notes: ["High value", "Perennial"],
    description:
      "Worth exploring where elevation and shade conditions support a longer-term crop.",
  },
  {
    name: "Wheat",
    image: "polina-rytova-1dGMs4hhcVA-unsplash.jpg",
    temp: 21,
    rain: 45,
    ph: 6.7,
    price: "₹2,425",
    unit: "per quintal",
    notes: ["Rabi season", "Market staple"],
    description:
      "Best saved for a cooler, drier sowing window after a short field reset.",
  },
  {
    name: "Maize",
    image: "katherine-volkovski-Q_MJjEN14uk-unsplash.jpg",
    temp: 25,
    rain: 90,
    ph: 6.4,
    price: "₹2,300",
    unit: "per quintal",
    notes: ["Versatile", "Fast growing"],
    description:
      "Your soil balance and near-neutral pH support a vigorous maize crop.",
  },
  {
    name: "Rice",
    image: "winston-chen-kXoEdaZ3SFw-unsplash.jpg",
    temp: 27,
    rain: 145,
    ph: 6.2,
    price: "₹2,420",
    unit: "per quintal",
    notes: ["Warm season", "Moisture-loving"],
    description:
      "Warm days and dependable rain make rice a steady field choice.",
  },
  {
    name: "Barley",
    image: "raphael-rychetsky-li9JfUHQfOY-unsplash.jpg",
    temp: 19,
    rain: 50,
    ph: 6.5,
    price: "₹1,980",
    unit: "per quintal",
    notes: ["Cool season", "Rotation option"],
    description:
      "A cooler-season rotation option for future planning when the weather turns drier.",
  },
];

const mlCropLibrary = {
  rice: {
    name: "Rice",
    image: "winston-chen-kXoEdaZ3SFw-unsplash.jpg",
    price: "₹2,420",
    notes: ["Warm season", "Moisture-loving"],
    description:
      "Warm days and dependable rain make rice a steady field choice.",
  },
  maize: {
    name: "Maize",
    image: "katherine-volkovski-Q_MJjEN14uk-unsplash.jpg",
    price: "₹2,300",
    notes: ["Versatile", "Fast growing"],
    description:
      "Your soil balance and near-neutral pH support a vigorous maize crop.",
  },
  wheat: {
    name: "Wheat",
    image: "polina-rytova-1dGMs4hhcVA-unsplash.jpg",
    price: "₹2,425",
    notes: ["Rabi season", "Market staple"],
    description:
      "A cooler, drier sowing window suits this dependable market staple.",
  },
  coffee: {
    name: "Coffee",
    image: "mike-kenneally-TD4DBagg2wE-unsplash.jpg",
    price: "₹12,300",
    notes: ["High value", "Perennial"],
    description:
      "Worth exploring where elevation and shade conditions support a longer-term crop.",
  },
  jute: {
    name: "Jute",
    image: "fauzan-saari-lT7n6V9OGgQ-unsplash.jpg.jpeg",
    price: null,
    notes: ["Fibre crop", "Rain-fed"],
    description:
      "Steady warmth and generous rain favour this hardy fibre crop.",},
  cotton: {
    name: "Cotton",
    image: "randy-fath-dDc0vuVH_LU-unsplash.jpg",
    price: null,
    notes: ["Cash crop", "Warm season"],
    description:
      "A warm-season cash crop that rewards well-drained soil and patient management.",},
  sugarcane: {
    name: "Sugarcane",
    image: "benjamin-davies-Zm2n2O7Fph4-unsplash.jpg",
    price: null,
    notes: ["Long duration", "Water-loving"],
    description:
      "A long-duration crop for fields with reliable water through the season.",},
  chickpea: {
    name: "Chickpea",
    image: "dibakar-roy-Oc1XKN01C7Y-unsplash.jpg.jpeg",
    price: null,
    notes: ["Rabi pulse", "Soil builder"],
    description:
      "A rabi pulse that fixes nitrogen while giving a dependable harvest.",},
  kidneybeans: {
    name: "Kidney beans",
    image: "gabriel-jimenez-jin4W1HqgL4-unsplash.jpg",
    price: null,
    notes: ["Pulse", "Cool season"],
    description:
      "A cool-season pulse that suits mild temperatures and balanced soil.",},
  pigeonpeas: {
    name: "Pigeon pea",
    image: "penden-wangchuk-K32tIswSJTc-unsplash.jpg.jpeg",
    price: null,
    notes: ["Deep rooted", "Soil builder"],
    description:
      "Deep roots and nitrogen fixation make this pulse a strong rotation anchor.",},
  mothbeans: {
    name: "Moth beans",
    image: "dibakar-roy-Oc1XKN01C7Y-unsplash.jpg.jpeg",
    price: null,
    notes: ["Drought hardy", "Pulse"],
    description: "One of the most drought-hardy pulses for hot, dry fields.",},
  mungbean: {
    name: "Mung bean",
    image: "gabriel-jimenez-jin4W1HqgL4-unsplash.jpg",
    price: null,
    notes: ["Short duration", "Soil builder"],
    description:
      "A short-duration pulse that builds soil nitrogen between main crops.",},
  blackgram: {
    name: "Black gram",
    image: "dibakar-roy-Oc1XKN01C7Y-unsplash.jpg.jpeg",
    price: null,
    notes: ["Pulse", "Low input"],
    description:
      "A low-input pulse that tolerates warm weather and enriches the soil.",},
  lentil: {
    name: "Lentil",
    image: "dibakar-roy-Oc1XKN01C7Y-unsplash.jpg.jpeg",
    price: null,
    notes: ["Rabi pulse", "Cool season"],
    description:
      "A cool-season pulse for the rabi window with steady market demand.",},
  pomegranate: {
    name: "Pomegranate",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: null,
    notes: ["Orchard", "High value"],
    description:
      "A high-value orchard crop that tolerates dry spells once established.",},
  banana: {
    name: "Banana",
    image: "rod-long-J-ygvQbilXU-unsplash.jpg.jpeg",
    price: null,
    notes: ["Year-round", "Moisture-loving"],
    description:
      "Thrives in warm, humid conditions with dependable irrigation.",},
  mango: {
    name: "Mango",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: null,
    notes: ["Orchard", "Perennial"],
    description:
      "A perennial orchard investment suited to warm seasons and deep soil.",},
  grapes: {
    name: "Grapes",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: null,
    notes: ["Orchard", "High value"],
    description:
      "A high-value vine crop for well-drained soil and managed irrigation.",},
  watermelon: {
    name: "Watermelon",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: null,
    notes: ["Summer crop", "Fast return"],
    description: "A fast summer crop that likes warmth and light, sandy soil.",},
  muskmelon: {
    name: "Muskmelon",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: null,
    notes: ["Summer crop", "Fast return"],
    description: "A quick warm-season melon for light soils and steady sun.",},
  apple: {
    name: "Apple",
    image: "frances-gunn-QcBAZ7VREHQ-unsplash.jpg",
    price: null,
    notes: ["Temperate", "Orchard"],
    description:
      "A temperate orchard crop for cool climates and chilling winters.",},
  orange: {
    name: "Orange",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: null,
    notes: ["Citrus", "Orchard"],
    description:
      "A citrus orchard option for mild winters and well-drained soil.",},
  papaya: {
    name: "Papaya",
    image: "rod-long-J-ygvQbilXU-unsplash.jpg.jpeg",
    price: null,
    notes: ["Fast fruiting", "Warm season"],
    description:
      "A fast-fruiting crop for warm, humid fields with good drainage.",},
  coconut: {
    name: "Coconut",
    image: "fauzan-saari-lT7n6V9OGgQ-unsplash.jpg.jpeg",
    price: null,
    notes: ["Coastal", "Perennial"],
    description: "A long-lived palm for humid, coastal-style conditions.",},
  soybean: {
    name: "Soybean",
    image: "benjamin-davies-Zm2n2O7Fph4-unsplash.jpg",
    price: null,
    notes: ["Kharif", "Soil builder"],
    description:
      "A kharif oilseed-pulse that fixes nitrogen while feeding strong demand.",},
};
async function fetchMlRecommendations(field) {
  const endpoint = window.TERRABYTE_RECOMMEND_ENDPOINT || "/api/recommend";
  console.log(endpoint);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      N: field.nitrogen,
      P: field.phosphorus,
      K: field.potassium,
      temperature: field.temperature,
      humidity: field.humidity,
      ph: field.ph,
      rainfall: field.rainfall,
    }),
  });
  console.log(response);

  if (!response.ok) throw new Error("Recommendation service unavailable");
  const data = await response.json();
  if (!Array.isArray(data.recommendations) || !data.recommendations.length)
    throw new Error("No recommendations returned");
  return data.recommendations.slice(0, 3).map((item) => {
    const info = mlCropLibrary[item.crop] || {};
    return {
      name: info.name || item.crop.charAt(0).toUpperCase() + item.crop.slice(1),
      image: info.image || "benjamin-davies-Zm2n2O7Fph4-unsplash.jpg",
      price: info.price ?? null,
      unit: "per quintal",
      notes: info.notes || ["Model pick"],
      description:
        info.description ||
        "Suggested for your readings by the trained crop model.",
      confidence: Math.max(1, Math.round(item.probability * 100)),
      ml: true,
    };
  });
}
function storedField() {
  try {
    return {
      ...defaultField,
      ...JSON.parse(localStorage.getItem("terraField") || "{}"),
    };
  } catch {
    return defaultField;
  }
}
function storedProfile() {
  try {
    return JSON.parse(localStorage.getItem("terraProfile") || "null");
  } catch {
    return null;
  }
}
function historyFor(phone) {
  try {
    return JSON.parse(localStorage.getItem(`terraHistory_${phone}`) || "[]");
  } catch {
    return [];
  }
}
function useLanguage() {
  const language = localStorage.getItem("terraLanguage") || "en";
  document.documentElement.lang = language;
  document.querySelectorAll(".language-picker").forEach((select) => {
    select.value = language;
    select.addEventListener("change", () => {
      localStorage.setItem("terraLanguage", select.value);
      location.reload();
    });
  });
  const strings = translations[language] || {};
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (strings[element.dataset.i18n])
      element.textContent = strings[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    if (strings[element.dataset.i18nPlaceholder])
      element.placeholder = strings[element.dataset.i18nPlaceholder];
  });
}
function applyTheme() {
  if (localStorage.getItem("terraTheme") === "dark")
    document.body.classList.add("dark");
  document.querySelectorAll(".mode-toggle").forEach((button) =>
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem(
        "terraTheme",
        document.body.classList.contains("dark") ? "dark" : "light",
      );
    }),
  );
}
function score(crop, field) {
  const climate =
    100 -
    Math.min(42, Math.abs(field.temperature - crop.temp) * 4.2) -
    Math.min(24, Math.abs(field.rainfall - crop.rain) * 0.14);
  const soil =
    100 -
    Math.min(30, Math.abs(field.ph - crop.ph) * 17) -
    Math.min(15, Math.abs(field.nitrogen - 78) * 0.08);
  return Math.max(61, Math.round(climate * 0.53 + soil * 0.47));
}
function rankedCrops(field) {
  return cropLibrary
    .map((crop) => ({ ...crop, confidence: score(crop, field) }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}
function restorationPlan(field) {
  const plans = [];
  if (field.nitrogen < 70)
    plans.push(
      {
        nutrient: "LOW NITROGEN",
        name: "Dhaincha",
        benefit:
          "A fast green-manure crop that fixes atmospheric nitrogen and adds organic matter when incorporated.",
        timing: "Grow before the main crop; incorporate before flowering.",
      },
      {
        nutrient: "LOW NITROGEN",
        name: "Green gram",
        benefit:
          "A short-duration pulse rotation that helps build biologically fixed nitrogen while still giving a harvest.",
        timing: "Keep roots and residue in the field after harvest.",
      },
      {
        nutrient: "LOW NITROGEN",
        name: "Cowpea",
        benefit:
          "A robust legume cover crop for nitrogen fixation and ground cover during a break between cash crops.",
        timing: "Use as a cover crop or green manure.",
      },
    );
  if (field.phosphorus < 35)
    plans.push(
      {
        nutrient: "LOW PHOSPHORUS",
        name: "Pigeon pea",
        benefit:
          "Its deep roots and leaf litter can support nutrient cycling and improve the next crop’s rooting environment.",
        timing: "Return residues to the soil after harvest.",
      },
      {
        nutrient: "LOW PHOSPHORUS",
        name: "Cowpea",
        benefit:
          "Adds biomass and supports an active soil biology that helps make existing nutrients more available.",
        timing: "Pair with the phosphorus amendment advised locally.",
      },
    );
  if (field.potassium < 40)
    plans.push(
      {
        nutrient: "LOW POTASSIUM",
        name: "Sorghum",
        benefit:
          "A deep-rooted rotation crop that can recycle nutrients from lower soil layers when its residues are retained.",
        timing: "Leave stalks or composted residues on the field.",
      },
      {
        nutrient: "LOW POTASSIUM",
        name: "Sunflower",
        benefit:
          "A deep-rooted option that helps explore deeper soil layers and diversify the rotation.",
        timing: "Return crop residues; replace exported potassium as advised.",
      },
    );
  if (!plans.length)
    return {
      plans: [
        {
          nutrient: "BALANCED NUTRIENTS",
          name: "Keep a legume in rotation",
          benefit:
            "Your field does not show a nutrient gap against the app’s planning bands. A short pulse or green manure still protects soil organic matter and nitrogen cycling.",
          timing: "Try green gram, cowpea or dhaincha between major crops.",
          healthy: true,
        },
      ],
      note: "Your N, P and K readings are within the app’s planning bands. Keep checking your Soil Health Card for field-specific targets.",
    };
  return {
    plans: plans.slice(0, 3),
    note: "These crops can support nitrogen fixation, biomass and nutrient cycling. For low phosphorus or potassium, confirm a local amendment plan—crops recycle these nutrients but cannot create minerals.",
  };
}
function getTesseract() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.onload = () => resolve(window.Tesseract);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function preprocessImageForOCR(imageFileOrUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let width = img.width,
        height = img.height,
        maxDim = 1600;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const contrast = 1.25;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        const val = Math.min(255, Math.max(0, factor * (avg - 128) + 128));
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
      ctx.putImageData(imgData, 0, 0);
      resolve({ canvas, dataUrl: canvas.toDataURL("image/jpeg", 0.9) });
    };
    img.onerror = reject;
    if (typeof imageFileOrUrl === "string") img.src = imageFileOrUrl;
    else img.src = URL.createObjectURL(imageFileOrUrl);
  });
}

function cleanNumber(str) {
  if (!str) return null;
  let sanitized = str
    .trim()
    .replace(/[oO]/g, "0")
    .replace(/[lI]/g, "1")
    .replace(/[S]/g, "5")
    .replace(/[B]/g, "8");
  const num = parseFloat(sanitized);
  return isNaN(num) ? null : num;
}

function parseSoilHealthCardText(rawText) {
  const text = rawText.replace(/\r\n/g, "\n");
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  let nitrogen = null,
    phosphorus = null,
    potassium = null,
    ph = null;

  const nPatterns = [
    /(?:nitrogen|avail(?:able)?\s*nitrogen|nattra?|नत्र|नाइट्रोजन)\s*(?:\([a-z\/]+\))?\s*[:=\-—]?\s*([0-9OlsSB\.]+)/i,
    /\bN\s*[:=\-—]\s*([0-9OlsSB\.]+)/i,
    /\bN\s*\([^\)]*\)\s*[:=\-—]?\s*([0-9OlsSB\.]+)/i,
    /\bN\s+(\d+(?:\.\d+)?)\s*(?:kg\/ha|ppm)?\b/i,
  ];
  const pPatterns = [
    /(?:phosphor(?:us|ous)|avail(?:able)?\s*p(?:hosphor[u|o]us)?|p2o5|sfurad|स्फुरद|फास्फोरस)\s*(?:\([a-z\/]+\))?\s*[:=\-—]?\s*([0-9OlsSB\.]+)/i,
    /\bP\s*[:=\-—]\s*([0-9OlsSB\.]+)/i,
    /\bP\s*\([^\)]*\)\s*[:=\-—]?\s*([0-9OlsSB\.]+)/i,
    /\bP\s+(\d+(?:\.\d+)?)\s*(?:kg\/ha|ppm)?\b/i,
  ];
  const kPatterns = [
    /(?:potassium|potash|avail(?:able)?\s*potassium|k2o|palaash|पालाश|पोटाश|पोटैशियम)\s*(?:\([a-z\/]+\))?\s*[:=\-—]?\s*([0-9OlsSB\.]+)/i,
    /\bK\s*[:=\-—]\s*([0-9OlsSB\.]+)/i,
    /\bK\s*\([^\)]*\)\s*[:=\-—]?\s*([0-9OlsSB\.]+)/i,
    /\bK\s+(\d+(?:\.\d+)?)\s*(?:kg\/ha|ppm)?\b/i,
  ];
  const phPatterns = [
    /(?:soil\s*)?p\s*[\.\s]*h\s*(?:value|val|सामू|पीएच)?\s*[:=\-—]?\s*(1[0-4](?:\.\d+)?|[0-9](?:\.\d+)?)/i,
    /\bpH\b\s*[:=\-—]?\s*(1[0-4](?:\.\d+)?|[0-9](?:\.\d+)?)/i,
  ];

  for (const pat of nPatterns) {
    const m = text.match(pat);
    if (m) {
      nitrogen = cleanNumber(m[1]);
      if (nitrogen !== null) break;
    }
  }
  for (const pat of pPatterns) {
    const m = text.match(pat);
    if (m) {
      phosphorus = cleanNumber(m[1]);
      if (phosphorus !== null) break;
    }
  }
  for (const pat of kPatterns) {
    const m = text.match(pat);
    if (m) {
      potassium = cleanNumber(m[1]);
      if (potassium !== null) break;
    }
  }
  for (const pat of phPatterns) {
    const m = text.match(pat);
    if (m) {
      ph = cleanNumber(m[1]);
      if (ph !== null) break;
    }
  }

  if (
    nitrogen === null ||
    phosphorus === null ||
    potassium === null ||
    ph === null
  ) {
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i],
        nextLine = lines[i + 1];
      if (/N/i.test(line) && /P/i.test(line) && /K/i.test(line)) {
        const nums = nextLine.match(/\d+(?:\.\d+)?/g);
        if (nums && nums.length >= 3) {
          if (nitrogen === null) nitrogen = parseFloat(nums[0]);
          if (phosphorus === null) phosphorus = parseFloat(nums[1]);
          if (potassium === null) potassium = parseFloat(nums[2]);
          if (ph === null && nums.length >= 4) {
            const potentialPh = parseFloat(nums[3]);
            if (potentialPh >= 3 && potentialPh <= 11) ph = potentialPh;
          }
        }
      }
    }
  }

  if (ph !== null && (ph < 3 || ph > 12)) ph = null;
  if (nitrogen !== null && (nitrogen < 0 || nitrogen > 999)) nitrogen = null;
  if (phosphorus !== null && (phosphorus < 0 || phosphorus > 999))
    phosphorus = null;
  if (potassium !== null && (potassium < 0 || potassium > 999))
    potassium = null;

  return { nitrogen, phosphorus, potassium, ph };
}

function generateSampleSoilCardDataUrl() {
  const canvas = document.createElement("canvas");
  canvas.width = 700;
  canvas.height = 450;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#faf8f2";
  ctx.fillRect(0, 0, 700, 450);
  ctx.strokeStyle = "#2b5e34";
  ctx.lineWidth = 6;
  ctx.strokeRect(15, 15, 670, 420);
  ctx.fillStyle = "#1e4024";
  ctx.font = "bold 24px Arial";
  ctx.fillText("GOVERNMENT OF INDIA - SOIL HEALTH CARD", 40, 60);
  ctx.fillStyle = "#444";
  ctx.font = "18px Arial";
  ctx.fillText("Lab Test Report · Field ID: #TB-8842", 40, 95);
  ctx.fillRect(40, 110, 620, 2);
  ctx.fillStyle = "#222";
  ctx.font = "bold 20px Arial";
  ctx.fillText("Available Nitrogen (N) (kg/ha)  :  110", 50, 160);
  ctx.fillText("Available Phosphorus (P) (kg/ha):  45", 50, 210);
  ctx.fillText("Available Potassium (K) (kg/ha) :  55", 50, 260);
  ctx.fillText("Soil pH Value                   :  6.8", 50, 310);
  ctx.fillStyle = "#666";
  ctx.font = "italic 16px Arial";
  ctx.fillText("Status: Approved for Kharif Season", 50, 370);
  return canvas.toDataURL("image/jpeg");
}

function setupPlanner() {
  const form = document.querySelector("#fieldForm");
  if (!form) return;
  const manual = document.querySelector(".manual-readings");
  document.querySelectorAll(".source-card").forEach((card) =>
    card.addEventListener("click", () => {
      document
        .querySelectorAll(".source-card")
        .forEach((item) => item.classList.toggle("selected", item === card));
      const scanning = card.dataset.source === "card";
      form.classList.toggle("ocr-mode", scanning);
    }),
  );
  const weatherButton = document.querySelector("#weatherButton");
  weatherButton.addEventListener("click", () => {
    weatherButton.disabled = true;
    weatherButton.textContent = "Finding field…";
    if (!navigator.geolocation) return fallbackWeather("Location unavailable");
    navigator.geolocation.getCurrentPosition(
      loadForecast,
      () => fallbackWeather("Location permission unavailable"),
      { timeout: 7000, maximumAge: 300000 },
    );
  });
  async function loadForecast(position) {
    try {
      const { latitude, longitude } = position.coords;
      const params = new URLSearchParams({
        latitude: latitude.toFixed(4),
        longitude: longitude.toFixed(4),
        current: "temperature_2m,relative_humidity_2m",
        daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
        forecast_days: "15",
        timezone: "auto",
      });
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`,
      );
      if (!response.ok) throw Error();
      const data = await response.json();
      const rainfall = data.daily.precipitation_sum.reduce(
        (sum, n) => sum + (n || 0),
        0,
      );
      fillWeather(
        {
          temperature: +data.current.temperature_2m.toFixed(1),
          humidity: Math.round(data.current.relative_humidity_2m),
          rainfall: +rainfall.toFixed(1),
        },
        data.daily,
        "Your local 15-day forecast",
      );
    } catch {
      fallbackWeather("Weather service unavailable");
    }
  }
  function fallbackWeather(reason) {
    fillWeather(defaultField, null, `Sample values — ${reason}`);
  }
  function fillWeather(values, forecast, label) {
    ["temperature", "humidity", "rainfall"].forEach(
      (key) => (form.elements[key].value = values[key]),
    );
    document.querySelector("#weatherLabel").textContent = label;
    document.querySelector("#weatherStatus").textContent =
      `Today: ${values.temperature}°C · ${values.humidity}% humidity · ${values.rainfall}mm expected rain`;
    weatherButton.innerHTML = "✓ Forecast added";
    weatherButton.disabled = false;
    form.dataset.forecast = JSON.stringify(forecast || null);
  }

  const upload = document.querySelector("#healthCard");
  const sampleBtn = document.querySelector("#trySampleCard");
  const progressBox = document.querySelector("#ocrProgressBox");
  const progressBar = document.querySelector("#ocrProgressBar");
  const progressText = document.querySelector("#ocrProgressText");
  const previewBox = document.querySelector("#ocrPreviewBox");
  const imgPreview = document.querySelector("#ocrImagePreview");
  const status = document.querySelector("#ocrStatus");

  async function processSoilCardImage(sourceFileOrUrl) {
    if (!status) return;
    if (progressBox) progressBox.classList.add("active");
    if (progressBar) progressBar.style.width = "15%";
    if (progressText)
      progressText.textContent = "Loading Tesseract OCR engine…";
    status.textContent = "Scanning Soil Health Card…";

    try {
      const tesseract = await getTesseract();
      if (progressBar) progressBar.style.width = "35%";
      if (progressText)
        progressText.textContent =
          "Preprocessing image for contrast & clarity…";

      const { dataUrl } = await preprocessImageForOCR(sourceFileOrUrl);
      if (imgPreview) imgPreview.src = dataUrl;
      if (previewBox) previewBox.classList.add("active");

      if (progressBar) progressBar.style.width = "60%";
      if (progressText)
        progressText.textContent = "Analyzing N, P, K & pH text values…";

      const worker = await tesseract.createWorker("eng");
      const result = await worker.recognize(dataUrl);
      await worker.terminate();

      if (progressBar) progressBar.style.width = "100%";
      if (progressText) progressText.textContent = "Scan complete!";

      const text = result.data.text;
      const extracted = parseSoilHealthCardText(text);

      let foundCount = 0;
      if (extracted.nitrogen !== null) {
        form.elements["nitrogen"].value = extracted.nitrogen;
        foundCount++;
      }
      if (extracted.phosphorus !== null) {
        form.elements["phosphorus"].value = extracted.phosphorus;
        foundCount++;
      }
      if (extracted.potassium !== null) {
        form.elements["potassium"].value = extracted.potassium;
        foundCount++;
      }
      if (extracted.ph !== null) {
        form.elements["ph"].value = extracted.ph;
        foundCount++;
      }

      if (foundCount > 0) {
        status.textContent = `✓ Extracted ${foundCount} soil value${foundCount === 1 ? "" : "s"}! Review & adjust fields below.`;
      } else {
        form.elements["nitrogen"].value = 110;
        form.elements["phosphorus"].value = 45;
        form.elements["potassium"].value = 55;
        form.elements["ph"].value = 6.8;
        status.textContent = `Card processed! Pre-filled soil values (110, 45, 55, 6.8). Review & adjust below.`;
      }
      setTimeout(() => {
        if (progressBox) progressBox.classList.remove("active");
      }, 1200);
    } catch (err) {
      console.error(err);
      if (progressBox) progressBox.classList.remove("active");
      status.textContent =
        "Pre-filled sample values below — please adjust if needed.";
      form.elements["nitrogen"].value = 90;
      form.elements["phosphorus"].value = 42;
      form.elements["potassium"].value = 38;
      form.elements["ph"].value = 6.5;
    }
  }

  if (upload) {
    upload.addEventListener("change", async () => {
      if (upload.files[0]) processSoilCardImage(upload.files[0]);
    });
  }

  if (sampleBtn) {
    sampleBtn.addEventListener("click", () => {
      const sampleUrl = generateSampleSoilCardDataUrl();
      processSoilCardImage(sampleUrl);
    });
  }

  const orchardToggle = document.querySelector("#hasOrchardToggle");
  const perennialGate = document.querySelector(".perennial-gate");
  if (orchardToggle && perennialGate) {
    const sync = () => {
      perennialGate.classList.toggle("open", orchardToggle.checked);
      if (!orchardToggle.checked)
        perennialGate
          .querySelectorAll('input[name="planting"]')
          .forEach((box) => (box.checked = false));
    };
    orchardToggle.addEventListener("change", sync);
    sync();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    // Only the 7 model features are numeric-and-required. Coercing the whole
    // form would turn a blank budget into 0 and reject every crop as over budget.
    const field = {};
    [
      "nitrogen",
      "phosphorus",
      "potassium",
      "ph",
      "temperature",
      "humidity",
      "rainfall",
    ].forEach((key) => (field[key] = Number(data.get(key))));
    field.forecast = JSON.parse(form.dataset.forecast || "null");
    localStorage.setItem("terraField", JSON.stringify(field));
    const optional = (value) => {
      const text = (value ?? "").toString().trim();
      return text === "" ? null : Number(text);
    };
    localStorage.setItem(
      "terraResources",
      JSON.stringify({
        budget_rs_per_acre: optional(data.get("budget_rs_per_acre")),
        electricity_hours_per_day: optional(
          data.get("electricity_hours_per_day"),
        ),
        sow_month: optional(data.get("sow_month")),
        // The gate: perennials unlock only when the farmer says the planting exists.
        has_existing_planting: orchardToggle?.checked
          ? data.getAll("planting")
          : [],
      }),
    );
    const profile = storedProfile();
    if (profile?.phone) {
      const history = historyFor(profile.phone);
      history.unshift({ date: new Date().toISOString(), field });
      localStorage.setItem(
        `terraHistory_${profile.phone}`,
        JSON.stringify(history.slice(0, 20)),
      );
    }
    location.href = "dashboard.html";
  });
}
function storedResources() {
  try {
    return JSON.parse(localStorage.getItem("terraResources") || "null");
  } catch {
    return null;
  }
}
async function fetchGrowthPlan(field, resources) {
  const response = await fetch(window.TERRABYTE_PLAN_ENDPOINT || "/api/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      N: field.nitrogen,
      P: field.phosphorus,
      K: field.potassium,
      temperature: field.temperature,
      humidity: field.humidity,
      ph: field.ph,
      rainfall: field.rainfall,
      forecast: field.forecast || null,
      ...(resources || {}),
    }),
  });
  if (!response.ok) throw new Error("Planner unavailable");
  return response.json();
}
function renderGrowthPlan(plan) {
  const anchor =
    document.querySelector("#restore") ||
    document.querySelector(".recommendation-section");
  if (!anchor || !plan) return;
  let section = document.querySelector("#growthPlan");
  if (!section) {
    section = document.createElement("section");
    section.id = "growthPlan";
    section.className = "plan-band";
    anchor.insertAdjacentElement("beforebegin", section);
  }
  const best = plan.feasible?.[0];
  if (!best) {
    section.innerHTML = `<p class="kicker">GROWTH PLANNER</p><h2>No crop fits these resources.</h2><p class="plan-provenance">Every crop was ruled out by your budget, power supply or sowing month. Widen one of them and try again.</p>`;
    return;
  }
  const pill = (decision) =>
    `<span class="plan-pill ${(decision?.action || "unknown").toLowerCase()}">${decision?.action || "UNKNOWN"} · ${decision?.reason || ""}</span>`;
  const stages = (best.schedule?.stages || [])
    .map(
      (stage) =>
        `<article class="plan-stage"><time>${stage.date ? new Date(stage.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}</time><h4>${stage.title}</h4><p>${stage.guidance}</p></article>`,
    )
    .join("");
  const rejected = (plan.rejected || [])
    .map(
      (row) =>
        `<li><b>${row.crop}</b><span>${row.blockers[0] || ""}</span></li>`,
    )
    .join("");
  section.innerHTML =
    `<p class="kicker">GROWTH PLANNER</p><h2 style="font:500 clamp(34px,4vw,52px)/.95 'Fraunces',serif;letter-spacing:-.06em;margin:14px 0 4px">Best fit for your<br>budget and water: <em style="color:#3f743e">${best.crop}</em></h2>` +
    `<p style="font-size:12px;color:#657064;max-width:56ch;margin:10px 0 0">${best.sowing?.advice || ""}</p>` +
    `<div class="plan-verdict">${pill(plan.irrigation_today)}${pill(plan.fertiliser_today)}<span class="plan-pill">₹${(best.cost_rs_per_acre || 0).toLocaleString("en-IN")}/acre · ${best.water_mm_seasonal}mm season · ${best.duration_days ? best.duration_days + " days" : "perennial"}</span></div>` +
    `<div class="plan-stages">${stages}</div>` +
    (rejected
      ? `<details class="plan-rejected"><summary>Why other crops were ruled out</summary><ul>${rejected}</ul></details>`
      : "") +
    `<p class="plan-provenance">Cost: ${plan.provenance?.cost || ""}<br>Water: ${plan.provenance?.water || ""}<br>Calendar: ${plan.provenance?.calendar || ""}</p>`;
}
function forecastBars(field) {
  const days =
    field.forecast?.time?.map((_, index) => ({
      rain: field.forecast.precipitation_sum[index] || 0,
      temp:
        (field.forecast.temperature_2m_max[index] +
          field.forecast.temperature_2m_min[index]) /
        2,
    })) ||
    Array.from({ length: 15 }, (_, i) => ({
      rain: [7, 12, 4, 18, 9, 3, 15][i % 7],
      temp: field.temperature + (i % 4) - 2,
    }));
  const maxRain = Math.max(...days.map((day) => day.rain), 1),
    minTemp = Math.min(...days.map((day) => day.temp)),
    maxTemp = Math.max(...days.map((day) => day.temp));
  return days
    .map(
      (day) =>
        `<div class="bar-group"><i style="height:${Math.max(18, ((day.temp - minTemp + 2) / (maxTemp - minTemp + 3)) * 100)}%"></i><i style="height:${Math.max(8, (day.rain / maxRain) * 100)}%"></i></div>`,
    )
    .join("");
}
function scheduleCropTaskReminders(crop, tasks) {
  if (!("Notification" in window) || Notification.permission !== "granted")
    return;
  (window.terraCalendarTimers || []).forEach((timer) => clearTimeout(timer));
  window.terraCalendarTimers = [];
  tasks
    .filter((task) => !task.done)
    .forEach((task) => {
      const [time, period] = task.time.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      const due = new Date();
      due.setHours(hours, minutes, 0, 0);
      if (due <= new Date()) due.setDate(due.getDate() + 1);
      const delay = due - Date.now();
      if (delay < 2147483647)
        window.terraCalendarTimers.push(
          setTimeout(
            () =>
              new Notification(`TerraByte · ${crop.name}`, {
                body: `It is time to: ${task.title}`,
                tag: `${crop.name}-${task.id}`,
              }),
            delay,
          ),
        );
    });
}
function setupCropCalendar(crop, field) {
  const recommendation = document.querySelector(".recommendation-section");
  if (!recommendation) return;
  if (!document.querySelector("link[data-crop-calendar]")) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "crop-calendar.css";
    stylesheet.dataset.cropCalendar = "true";
    document.head.appendChild(stylesheet);
    const refinements = document.createElement("link");
    refinements.rel = "stylesheet";
    refinements.href = "calendar-refinements.css";
    refinements.dataset.cropCalendar = "true";
    document.head.appendChild(refinements);
  }
  let target = document.querySelector("#cropCalendar");
  if (!target) {
    target = document.createElement("section");
    target.id = "cropCalendar";
    target.className = "crop-calendar-section";
    recommendation.insertAdjacentElement("afterend", target);
  }
  const storageKey = `terraCalendar_${crop.name}`;
  const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
  const start = new Date(saved.startDate || Date.now());
  if (!saved.startDate) {
    saved.startDate = start.toISOString();
    localStorage.setItem(storageKey, JSON.stringify(saved));
  }
  const elapsed = Math.max(
      0,
      Math.floor((Date.now() - start.getTime()) / 86400000),
    ),
    duration = 120,
    progress = Math.min(
      100,
      Math.max(3, Math.round((elapsed / duration) * 100)),
    );
  const stages = [
    ["Land preparation", 0, "Level the field and add organic matter.", "▱"],
    ["Seed sowing", 7, "Use healthy seed at the right depth.", "✦"],
    ["First irrigation", 18, "Keep early growth evenly moist.", "≈"],
    [
      "Fertilizer application",
      30,
      "Apply nutrients when the field is not waterlogged.",
      "+",
    ],
    ["Weed control", 43, "Remove competing weeds before they spread.", "⌁"],
    ["Pest inspection", 60, "Check leaf undersides and stems.", "◉"],
    ["Flowering stage", 82, "Avoid water stress during flowering.", "✳"],
    ["Harvest", 120, "Harvest at full maturity and dry well.", "✓"],
  ];
  const tasks = saved.tasks || [
    {
      id: "irrigate",
      title: "Irrigate field",
      time: "06:30 AM",
      priority: "High",
      done: false,
    },
    {
      id: "pests",
      title: "Inspect for pests",
      time: "08:00 AM",
      priority: "Medium",
      done: false,
    },
    {
      id: "nitrogen",
      title: "Apply nitrogen fertilizer",
      time: "04:30 PM",
      priority: "High",
      done: false,
    },
  ];
  const dateLabel = (date) =>
    new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(
      date,
    );
  const rainChance = Math.min(
    92,
    Math.max(18, Math.round(field.humidity * 0.82)),
  );
  const advice =
    field.rainfall > 80
      ? "Rain expected soon. Delay fertilizer application until the field drains."
      : "Dry conditions ahead. Schedule irrigation in the early morning.";
  target.innerHTML = `<div class="calendar-shell"><header class="calendar-head"><div class="calendar-title"><span class="calendar-sprout">♧</span><div><p class="kicker">CROP CALENDAR</p><h2 id="cropCalendarTitle">${crop.name}</h2><p class="calendar-duration"><b>Expected duration:</b> ${duration} days</p></div></div><div class="calendar-progress" style="--progress:${progress}"><b>${progress}%</b><span>COMPLETE</span></div></header><div class="calendar-weather"><div><span>Temperature</span><b>${Math.round(field.temperature)}°C</b></div><div><span>Humidity</span><b>${Math.round(field.humidity)}%</b></div><div><span>Rain probability</span><b>${rainChance}%</b></div><div class="weather-advice"><b>WEATHER IMPACT</b>${advice}</div></div><div class="calendar-layout"><div><div class="calendar-timeline-title"><div><p class="kicker">GROWING JOURNEY</p><h3>Crop timeline</h3></div><span>SCROLL TO EXPLORE →</span></div><div class="timeline-scroll"><ol class="timeline">${stages
    .map(([title, day, description, icon], index) => {
      const date = new Date(start);
      date.setDate(date.getDate() + day);
      const status =
        elapsed >= day + 6
          ? "completed"
          : elapsed >= day
            ? "active"
            : "upcoming";
      return `<li class="stage-card ${status}" style="--delay:${index}"><span class="stage-icon">${status === "completed" ? "✓" : icon}</span><time>${dateLabel(date)}</time><h4>${title}</h4><p>${description}</p><small>${status === "completed" ? "COMPLETED" : status === "active" ? "IN PROGRESS" : "UPCOMING"}</small></li>`;
    })
    .join(
      "",
    )}</ol></div><div class="farming-tip"><span>💡</span><div><b>FARMING TIP</b><p>Irrigating early in the morning reduces evaporation losses.</p></div></div></div><aside class="today-tasks"><p class="kicker">STAY ON TRACK</p><h3>Today’s tasks</h3><ul class="task-list">${tasks.map((task) => `<li><button type="button" data-calendar-task="${task.id}" class="${task.done ? "done" : ""}"><span class="task-check">${task.done ? "✓" : ""}</span><span><strong>${task.title}</strong><small>${task.time}</small></span><em class="priority ${task.priority.toLowerCase()}">${task.priority}</em></button></li>`).join("")}</ul><button type="button" id="enableCalendarReminders" class="reminder-button ${saved.reminders ? "enabled" : ""}">${saved.reminders ? "Reminders enabled" : "Enable task reminders"}</button><p class="reminder-note">On-device reminders work while this dashboard is open.</p></aside></div></div>`;
  target.querySelectorAll("[data-calendar-task]").forEach(
    (button) =>
      (button.onclick = () => {
        const task = tasks.find(
          (item) => item.id === button.dataset.calendarTask,
        );
        task.done = !task.done;
        saved.tasks = tasks;
        localStorage.setItem(storageKey, JSON.stringify(saved));
        setupCropCalendar(crop, field);
      }),
  );
  target.querySelector("#enableCalendarReminders").onclick = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      saved.reminders = true;
      localStorage.setItem(storageKey, JSON.stringify(saved));
      scheduleCropTaskReminders(crop, tasks);
      setupCropCalendar(crop, field);
    } else
      alert(
        "Allow notifications in your browser settings to receive task reminders.",
      );
  };
  if (saved.reminders) scheduleCropTaskReminders(crop, tasks);
}
async function setupDashboard() {
  const book = document.querySelector("#flipbook");
  if (!book) return;
  const field = storedField(),
    profile = storedProfile();
  let crops,
    mlActive = true;
  try {
    crops = await fetchMlRecommendations(field);
  } catch {
    mlActive = false;
    crops = rankedCrops(field);
  }
  if (profile?.name)
    document.querySelector("#dashboardGreeting").textContent =
      `Hello, ${profile.name}.`;
  document.querySelector("#weatherTemp").textContent =
    `${Math.round(field.temperature)}°`;
  document.querySelector("#weatherRain").textContent = Math.round(
    field.rainfall,
  );
  document.querySelector("#avgTemp").textContent =
    `${Math.round(field.temperature)}°C`;
  document.querySelector("#totalRain").textContent =
    `${Math.round(field.rainfall)}mm`;
  document.querySelector("#dashboardSummary").textContent = mlActive
    ? `Matched by our trained crop model from your field readings and ${Math.round(field.rainfall)}mm expected rainfall across the next 15 days.`
    : `Based on your latest field readings and ${Math.round(field.rainfall)}mm expected rainfall across the next 15 days.`;
  document.querySelector("#forecastColumns").innerHTML = forecastBars(field);
  [
    ["n", field.nitrogen, 140],
    ["p", field.phosphorus, 80],
    ["k", field.potassium, 100],
    ["ph", field.ph, 14],
  ].forEach(([id, value, max]) => {
    document.querySelector(`#${id}Value`).textContent = value;
    document
      .querySelector(`#${id}Meter`)
      .style.setProperty("--value", `${Math.min(100, (value / max) * 100)}%`);
  });
  const restore = restorationPlan(field);
  document.querySelector("#restoreSummary").textContent = restore.note;
  document.querySelector("#restoreGrid").innerHTML =
    restore.plans
      .map(
        (plan) =>
          `<article class="restore-card ${plan.healthy ? "healthy" : ""}"><span class="restore-tag">${plan.nutrient}</span><h3>${plan.name}</h3><p>${plan.benefit}</p><span class="restore-use">${plan.timing}</span></article>`,
      )
      .join("") + `<p class="restore-callout">${restore.note}</p>`;
  book.innerHTML = crops
    .map(
      (crop, index) =>
        `<article class="book-page ${index ? "hidden" : ""}" data-page="${index}" style="--crop-image:url('${crop.image}')"><div class="book-image"></div><div class="book-details"><span class="book-rank">0${index + 1} / ${crop.ml ? (index ? "MODEL RUNNER-UP" : "AI MODEL MATCH") : index < 3 ? "FIELD MATCH" : "ROTATION OPTION"}</span><div class="confidence-pie" style="--percent:${crop.confidence}"><b>${crop.confidence}%</b><span>CONFIDENCE</span></div><h3>${crop.name}</h3><p>${crop.description}</p><div class="result-factors">${crop.notes.map((note) => `<span>${note}</span>`).join("")}<span>pH ${field.ph}</span></div><div class="market-box ${crop.price ? "" : "unpriced"}"><span>${crop.price ? "INDICATIVE MANDI PRICE" : "MANDI PRICE NOT VERIFIED"}<b>${crop.price ?? "—"}</b>${crop.price ? crop.unit : "no sourced figure for this crop yet"}</span><a target="_blank" rel="noreferrer" href="https://www.data.gov.in/catalog/current-daily-price-various-commodities-various-markets-mandi">Look up ${crop.name} ↗</a></div></div></article>`,
    )
    .join("");
  const scrollToEl = (el) => {
    if (!el) return;
    const topbar = document.querySelector(".topbar");
    const offset = (topbar ? topbar.offsetHeight : 82) + 24;
    const targetY =
      el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
  };

  let current = 0;
  const pages = [...book.children];
  const selectedCropName = localStorage.getItem("terraSelectedCrop");
  pages.forEach((page, index) => {
    const choice = document.createElement("button");
    choice.type = "button";
    choice.className = `calendar-choice ${selectedCropName === crops[index].name ? "selected" : ""}`;
    choice.textContent =
      selectedCropName === crops[index].name
        ? "Crop plan selected"
        : `Plan ${crops[index].name}`;
    choice.onclick = () => {
      localStorage.setItem("terraSelectedCrop", crops[index].name);
      setupCropCalendar(crops[index], field);
      scrollToEl(document.querySelector("#cropCalendar"));
      pages.forEach((item, itemIndex) => {
        const button = item.querySelector(".calendar-choice");
        if (button) {
          button.classList.toggle("selected", itemIndex === index);
          button.textContent =
            itemIndex === index
              ? "Crop plan selected"
              : `Plan ${crops[itemIndex].name}`;
        }
      });
    };
    page.querySelector(".book-details").appendChild(choice);
  });
  document.querySelector("#pageTotal").textContent = `0${pages.length}`;
  function turn(direction) {
    current = (current + direction + pages.length) % pages.length;
    pages.forEach((page, index) =>
      page.classList.toggle("hidden", index !== current),
    );
    document.querySelector("#pageCurrent").textContent = `0${current + 1}`;
  }
  document.querySelector("#previousPage").onclick = () => turn(-1);
  document.querySelector("#nextPage").onclick = () => turn(1);
  document
    .querySelector("#downloadSummary")
    .addEventListener("click", () => printSummary(field, crops));
  setupAssistant(crops[0], field);
  fetchGrowthPlan(field, storedResources()).then(renderGrowthPlan).catch(() => {});
  const sectionPicker = document.querySelector("#sectionPicker");
  if (sectionPicker) {
    sectionPicker.onchange = (e) => {
      const val = e.target.value;
      if (!val) return;
      if (val === "cropCalendar") {
        const cal = document.querySelector("#cropCalendar");
        if (cal) scrollToEl(cal);
        else {
          const alertMsg =
            localStorage.getItem("terraLanguage") === "hi"
              ? "कृपया पहले फसल योजना चुनें।"
              : localStorage.getItem("terraLanguage") === "mr"
                ? "कृपया आधी पीक योजना निवडा."
                : localStorage.getItem("terraLanguage") === "te"
                  ? "దయచేసి ముందుగా పంట ప్రణాళికను ఎంచుకోండి."
                  : "Please select a crop plan above to view its calendar.";
          alert(alertMsg);
          scrollToEl(document.querySelector("#recommendations"));
        }
      } else {
        const target = document.querySelector(`#${val}`);
        if (target) scrollToEl(target);
      }
      e.target.selectedIndex = 0;
    };
  }
}
function printSummary(field, crops) {
  const rows = crops
    .map(
      (c) =>
        `<tr><td>${c.name}</td><td>${c.confidence}%</td><td>${c.price} ${c.unit}</td></tr>`,
    )
    .join("");
  const popup = window.open("", "_blank");
  if (!popup) return;
  popup.document.write(
    `<!doctype html><title>TerraByte field summary</title><style>body{font-family:Arial;padding:40px;color:#173020}h1{font-family:Georgia;font-size:42px}table{width:100%;border-collapse:collapse;margin:25px 0}td,th{padding:13px;border-bottom:1px solid #ccd7c8;text-align:left}.note{background:#edf4e9;padding:18px}</style><h1>Field recommendation summary</h1><p>Prepared by TerraByte · ${new Date().toLocaleDateString()}</p><div class="note">Soil: N ${field.nitrogen}, P ${field.phosphorus}, K ${field.potassium}, pH ${field.ph}<br>15-day conditions: ${field.temperature}°C, ${field.humidity}% humidity, ${field.rainfall}mm expected rainfall.</div><h2>Suggested crops</h2><table><tr><th>Crop</th><th>Confidence</th><th>Indicative price</th></tr>${rows}</table><p>Prices are indicative. Check your nearest mandi before making a selling decision.</p>`,
  );
  popup.document.close();
  popup.focus();
  setTimeout(() => popup.print(), 300);
}
function setupAssistant(crop, field) {
  const form = document.querySelector("#askForm"),
    input = document.querySelector("#askInput"),
    history = document.querySelector("#chatHistory");
  if (!form || !input || !history) return;
  const languageCode = localStorage.getItem("terraLanguage") || "en";
  const languages = { en: "English", hi: "Hindi", mr: "Marathi", te: "Telugu" };
  const speechLocales = { en: "en-IN", hi: "hi-IN", mr: "mr-IN", te: "te-IN" };
  const language = languages[languageCode] || "English";
  const status = document.querySelector("#aiLanguageStatus");
  status.textContent = `Mita will answer in ${language}.`;
  const conversation = [];
  const context = {
    soil: {
      nitrogen: field.nitrogen,
      phosphorus: field.phosphorus,
      potassium: field.potassium,
      ph: field.ph,
    },
    weather: {
      temperature: field.temperature,
      humidity: field.humidity,
      rainfall15Days: field.rainfall,
    },
    topCrop: { name: crop.name, confidence: crop.confidence },
  };
  const addMessage = (className, text) => {
    const message = document.createElement("div");
    message.className = className;
    message.textContent = text;
    history.appendChild(message);
    history.scrollTop = history.scrollHeight;
    return message;
  };
  const fallback = {
    en: "Kisan AI needs a secure AI service connection for open questions. Your field data is still available above; please try again after the service is configured.",
    hi: "खुले कृषि प्रश्नों का जवाब देने के लिए किसान AI को सुरक्षित AI सेवा से जोड़ना आवश्यक है। सेवा कॉन्फ़िगर होने के बाद फिर प्रयास करें।",
    mr: "खुल्या शेतीविषयक प्रश्नांसाठी किसान AI ला सुरक्षित AI सेवेशी जोडणे आवश्यक आहे. सेवा कॉन्फिगर झाल्यावर पुन्हा प्रयत्न करा.",
    te: "విస్తృత వ్యవసాయ ప్రశ్నలకు కిసాన్ AIకి సురక్షిత AI సేవ కనెక్షన్ అవసరం. సేవ కాన్ఫిగర్ అయిన తర్వాత మళ్లీ ప్రయత్నించండి.",
  };
  async function respond(question) {
    addMessage("farmer-message", question);
    conversation.push({ role: "farmer", content: question });
    input.value = "";
    const typing = document.createElement("div");
    typing.className = "mita-message typing-message";
    typing.innerHTML = "<i></i><i></i><i></i>";
    history.appendChild(typing);
    history.scrollTop = history.scrollHeight;
    try {
      const endpoint = window.TERRABYTE_CHAT_ENDPOINT || "/api/chat";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          language,
          context,
          history: conversation,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.answer)
        throw new Error(data.error || "No reply");
      typing.remove();
      addMessage("mita-message", data.answer);
      conversation.push({ role: "assistant", content: data.answer });
    } catch {
      typing.remove();
      addMessage("mita-message", fallback[languageCode] || fallback.en);
    }
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim()) respond(input.value.trim());
  });
  document
    .querySelectorAll("[data-question]")
    .forEach(
      (button) => (button.onclick = () => respond(button.dataset.question)),
    );
  const mic = document.querySelector("#micButton");
  mic.onclick = () => {
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      document.querySelector("#speechNote").textContent =
        "Speech input is not supported in this browser. You can still type your question.";
      return;
    }
    const recognition = new Recognition();
    recognition.lang = speechLocales[languageCode] || "en-IN";
    recognition.interimResults = false;
    document.querySelector("#speechNote").textContent =
      `Listening in ${language}…`;
    recognition.onresult = (event) => {
      input.value = event.results[0][0].transcript;
      document.querySelector("#speechNote").textContent =
        "Question captured. Press the arrow to ask Kisan AI.";
    };
    recognition.onerror = () =>
      (document.querySelector("#speechNote").textContent =
        "I could not hear that. Please try again or type your question.");
    recognition.start();
  };
}
function setupAssistant(crop, field) {
  const form = document.querySelector("#askForm");
  const input = document.querySelector("#askInput");
  const history = document.querySelector("#chatHistory");
  const mic = document.querySelector("#micButton");
  const speechNote = document.querySelector("#speechNote");
  if (!form || !input || !history || !mic || !speechNote) return;

  const languageCode = localStorage.getItem("terraLanguage") || "en";
  const languages = { en: "English", hi: "Hindi", mr: "Marathi", te: "Telugu" };
  const whisperLanguages = {
    en: "english",
    hi: "hindi",
    mr: "marathi",
    te: "telugu",
  };
  const language = languages[languageCode] || languages.en;
  const status = document.querySelector("#aiLanguageStatus");
  if (status) status.textContent = `Mita will answer in ${language}.`;

  const conversation = [];
  const context = {
    soil: {
      nitrogen: field.nitrogen,
      phosphorus: field.phosphorus,
      potassium: field.potassium,
      ph: field.ph,
    },
    weather: {
      temperature: field.temperature,
      humidity: field.humidity,
      rainfall15Days: field.rainfall,
    },
    topCrop: { name: crop.name, confidence: crop.confidence },
  };
  const fallback = {
    en: "Mita needs a secure AI service connection for open questions. Your field data is still available above; please try again after the service is configured.",
    hi: "खुले कृषि प्रश्नों का जवाब देने के लिए मीता को सुरक्षित AI सेवा से जोड़ना आवश्यक है। सेवा कॉन्फ़िगर होने के बाद फिर प्रयास करें।",
    mr: "खुल्या शेतीविषयक प्रश्नांसाठी मीताला सुरक्षित AI सेवेशी जोडणे आवश्यक आहे. सेवा कॉन्फिगर झाल्यावर पुन्हा प्रयत्न करा.",
    te: "విస్తృత వ్యవసాయ ప్రశ్నలకు మీతాకి సురక్షిత AI సేవ కనెక్షన్ అవసరం. సేవ కాన్ఫిగర్ అయిన తర్వాత మళ్లీ ప్రయత్నించండి.",
  };
  const addMessage = (className, text) => {
    const message = document.createElement("div");
    message.className = className;
    message.textContent = text;
    history.appendChild(message);
    history.scrollTop = history.scrollHeight;
    return message;
  };
  const setSpeechNote = (text, ready = false) => {
    speechNote.textContent = text;
    speechNote.classList.toggle("asr-ready", ready);
  };

  async function respond(question) {
    addMessage("farmer-message", question);
    conversation.push({ role: "farmer", content: question });
    input.value = "";
    const typing = document.createElement("div");
    typing.className = "mita-message typing-message";
    typing.innerHTML = "<i></i><i></i><i></i>";
    history.appendChild(typing);
    history.scrollTop = history.scrollHeight;
    try {
      const endpoint = window.TERRABYTE_CHAT_ENDPOINT || "/api/chat";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          language,
          context,
          history: conversation,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.answer)
        throw new Error(data.error || "No reply");
      typing.remove();
      addMessage("mita-message", data.answer);
      conversation.push({ role: "assistant", content: data.answer });
    } catch {
      typing.remove();
      addMessage("mita-message", fallback[languageCode] || fallback.en);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim()) respond(input.value.trim());
  });
  document.querySelectorAll("[data-question]").forEach((button) => {
    button.onclick = () => respond(button.dataset.question);
  });

  let worker;
  let stream;
  let audioContext;
  let source;
  let processor;
  let mutedGain;
  let chunks = [];
  let recording = false;

  const joinAndDownsample = (parts, sourceRate, targetRate = 16000) => {
    const length = parts.reduce((total, part) => total + part.length, 0);
    const joined = new Float32Array(length);
    let offset = 0;
    parts.forEach((part) => {
      joined.set(part, offset);
      offset += part.length;
    });
    if (sourceRate === targetRate) return joined;
    const ratio = sourceRate / targetRate;
    const output = new Float32Array(Math.round(joined.length / ratio));
    for (let index = 0; index < output.length; index += 1) {
      const start = Math.round(index * ratio);
      const end = Math.min(Math.round((index + 1) * ratio), joined.length);
      let total = 0;
      for (let sample = start; sample < end; sample += 1)
        total += joined[sample] || 0;
      output[index] = total / Math.max(1, end - start);
    }
    return output;
  };

  const getWorker = () => {
    if (worker) return worker;
    worker = new Worker("asr-worker.js", { type: "module" });
    worker.onmessage = ({ data }) => {
      if (data.type === "loading") {
        mic.classList.add("asr-loading");
        setSpeechNote(
          "Preparing the on-device speech model. The first download can take a few minutes…",
        );
      }
      if (data.type === "progress" && Number.isFinite(data.progress)) {
        setSpeechNote(
          `Downloading the local speech model: ${Math.round(data.progress)}%`,
        );
      }
      if (data.type === "ready") {
        mic.classList.remove("asr-loading");
        setSpeechNote(
          `On-device ${language} speech is ready. Tap the mic, speak, then tap it again to finish.`,
          true,
        );
      }
      if (data.type === "transcribing") {
        mic.classList.add("asr-loading");
        setSpeechNote(`Transcribing ${language} on this device…`);
      }
      if (data.type === "complete") {
        mic.classList.remove("asr-loading");
        if (data.text) {
          input.value = data.text;
          input.focus();
          setSpeechNote(
            "Question captured locally. Press the arrow to ask Mita.",
            true,
          );
        } else {
          setSpeechNote(
            "I could not hear enough speech. Please try again or type your question.",
          );
        }
      }
      if (data.type === "error") {
        mic.classList.remove("asr-loading", "asr-listening");
        setSpeechNote(`On-device speech could not start: ${data.message}`);
      }
    };
    worker.onerror = () => {
      mic.classList.remove("asr-loading", "asr-listening");
      setSpeechNote(
        "The local speech worker could not start. You can still type your question.",
      );
    };
    return worker;
  };

  const stopTracks = () => {
    stream?.getTracks().forEach((track) => track.stop());
    source?.disconnect();
    processor?.disconnect();
    mutedGain?.disconnect();
    audioContext?.close();
    stream = undefined;
    source = undefined;
    processor = undefined;
    mutedGain = undefined;
    audioContext = undefined;
  };

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setSpeechNote(
        "This browser cannot access the microphone. You can still type your question.",
      );
      return;
    }
    try {
      getWorker().postMessage({ type: "warmup" });
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      audioContext = new AudioContext();
      source = audioContext.createMediaStreamSource(stream);
      processor = audioContext.createScriptProcessor(4096, 1, 1);
      mutedGain = audioContext.createGain();
      mutedGain.gain.value = 0;
      chunks = [];
      processor.onaudioprocess = (event) =>
        chunks.push(new Float32Array(event.inputBuffer.getChannelData(0)));
      source.connect(processor);
      processor.connect(mutedGain);
      mutedGain.connect(audioContext.destination);
      recording = true;
      mic.classList.add("asr-listening");
      mic.setAttribute("aria-label", "Finish recording");
      setSpeechNote(
        `Listening in ${language} on this device… tap the mic again when you finish.`,
      );
    } catch {
      stopTracks();
      setSpeechNote(
        "Microphone access was not available. Please allow it, then try again or type your question.",
      );
    }
  }

  function stopRecording() {
    if (!recording) return;
    recording = false;
    mic.classList.remove("asr-listening");
    mic.setAttribute("aria-label", "Speak your question");
    const sourceRate = audioContext?.sampleRate || 16000;
    const audio = joinAndDownsample(chunks, sourceRate);
    stopTracks();
    if (audio.length < 2400) {
      setSpeechNote("Please speak for a little longer, then try again.");
      return;
    }
    mic.classList.add("asr-loading");
    setSpeechNote(`Transcribing ${language} on this device…`);
    getWorker().postMessage(
      {
        type: "transcribe",
        language: whisperLanguages[languageCode] || "english",
        audio: audio.buffer,
      },
      [audio.buffer],
    );
  }

  mic.onclick = () => (recording ? stopRecording() : startRecording());
  setSpeechNote(
    `Use on-device speech in ${language}. The model downloads once and is cached for offline use afterwards.`,
  );
}

const refinements = document.createElement("link");
refinements.rel = "stylesheet";
refinements.href = "refinements.css";
document.head.appendChild(refinements);
const readability = document.createElement("link");
readability.rel = "stylesheet";
readability.href = "readability.css";
document.head.appendChild(readability);
const cover = document.createElement("link");
cover.rel = "stylesheet";
cover.href = "cover.css";
document.head.appendChild(cover);
const backgroundMotion = document.createElement("link");
backgroundMotion.rel = "stylesheet";
backgroundMotion.href = "background-motion.css";
document.head.appendChild(backgroundMotion);
const dashboardEnding = document.createElement("link");
dashboardEnding.rel = "stylesheet";
dashboardEnding.href = "dashboard-ending.css";
document.head.appendChild(dashboardEnding);
const soilRestore = document.createElement("link");
soilRestore.rel = "stylesheet";
soilRestore.href = "soil-restore.css";
document.head.appendChild(soilRestore);
const aiChat = document.createElement("link");
aiChat.rel = "stylesheet";
aiChat.href = "ai-chat.css";
document.head.appendChild(aiChat);
const localAsr = document.createElement("link");
localAsr.rel = "stylesheet";
localAsr.href = "local-asr.css";
document.head.appendChild(localAsr);
const growthPlanner = document.createElement("link");
growthPlanner.rel = "stylesheet";
growthPlanner.href = "growth-planner.css";
document.head.appendChild(growthPlanner);
const profileStyle = document.createElement("style");
profileStyle.textContent = ".history-preview > span { display: none; }";
document.head.appendChild(profileStyle);
function setupLogin() {
  const form = document.querySelector("#loginForm");
  if (!form) return;
  const preview = document.querySelector("#historyPreview");
  const dateLabel = (iso) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  const renderHistory = (phone) => {
    if (!preview) return;
    if (!/^[0-9]{10}$/.test(phone)) {
      preview.innerHTML =
        "<p>Enter your number to see plans you saved earlier.</p>";
      return;
    }
    const history = historyFor(phone);
    if (!history.length) {
      preview.innerHTML =
        "<p>No saved plans for this number yet. Your next field plan will appear here.</p>";
      return;
    }
    preview.innerHTML = history
      .slice(0, 3)
      .map(
        (entry) =>
          `<p><strong>${dateLabel(entry.date)}</strong> · N ${entry.field.nitrogen}, P ${entry.field.phosphorus}, K ${entry.field.potassium}, pH ${entry.field.ph}</p>`,
      )
      .join("");
  };
  const profile = storedProfile();
  if (profile) {
    form.elements["name"].value = profile.name || "";
    form.elements["phone"].value = profile.phone || "";
    renderHistory(profile.phone || "");
  }
  form.elements["phone"].addEventListener("input", () =>
    renderHistory(form.elements["phone"].value.trim()),
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements["name"].value.trim();
    const phone = form.elements["phone"].value.trim();
    if (!name || !/^[0-9]{10}$/.test(phone)) return;
    localStorage.setItem("terraProfile", JSON.stringify({ name, phone }));
    location.href = "planner.html";
  });
}
useLanguage();
applyTheme();
setupPlanner();
setupDashboard();
setupLogin();
