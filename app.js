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

const i18n = {
  en: {
    titleHome: "TerraByte — Farming, made clearer",
    titlePlanner: "Build a field plan — TerraByte",
    titleDashboard: "Dashboard — TerraByte",
    titleLogin: "Welcome back — TerraByte",
    plan: "Plan a field",
    dashboard: "Dashboard",
    ask: "Ask Mita",
    login: "Log in",
    myProfile: "My profile",
    home: "Home",
    languageLabel: "🌐 Language",
    chooseLanguage: "Choose language",
    jumpToSection: "Jump to section",
    jumpToSectionOption: "Jump to section…",
    sectionHero: "Field Plan Profile",
    sectionRecommendations: "Field Plan Recommendations",
    sectionWeather: "15-Day Weather Outlook",
    sectionSoil: "Soil Snapshot",
    sectionRestore: "Soil Restore Plan",
    sectionCalendar: "Crop Calendar",
    rooted: "ROOTED IN YOUR FIELD. READY FOR WHAT’S NEXT.",
    coverCaption: "Field intelligence that keeps<br>its hands in the soil.",
    start: "Start a field plan",
    seeDashboard: "See your dashboard",
    landingBottom1: "A decision companion<br>for every growing season.",
    landingBottom2: "Weather-aware<br>market-aware<br>farmer-first",
    fieldProfile: "FIELD PROFILE",
    plannerTitle: "Let’s hear what<br>your <em>field says.</em>",
    humanNote:
      "A few honest readings. A clearer next step. We’ll make the numbers feel useful.",
    plannerIntro:
      "Use your own readings, scan a Soil Health Card, or let the weather do some of the work.",
    soilSource: "Choose soil source",
    conditions: "Set growing conditions",
    recommendation: "Get recommendations",
    newPlan: "NEW FIELD PLAN",
    knowField: "Know your field",
    saved: "Saved on this device",
    soilReadings: "Soil readings",
    soilHint: "Choose how you want to bring in your field data.",
    manual: "Enter manually",
    manualHint: "I have my N, P, K & pH values",
    scanCard: "Scan Soil Health Card",
    scanHint: "Read N, P, K & pH from a photo",
    nitrogen: "Nitrogen",
    nitrogenUnit: "N · kg/ha",
    phosphorus: "Phosphorus",
    phosphorusUnit: "P · kg/ha",
    potassium: "Potassium",
    potassiumUnit: "K · kg/ha",
    soilPh: "Soil pH",
    phRange: "0–14",
    dropCard: "Drop your Soil Health Card photo",
    ocrHint:
      "A photo or PDF scan — we’ll automatically read N, P, K and pH.",
    browse: "Browse file",
    sampleCard: "Try a sample Soil Health Card",
    scanningCardImage: "Scanning card image…",
    soilCardPreview: "Soil Card Preview",
    extractedBadge:
      "✓ Extracted soil values! Check & adjust your values above if needed.",
    weatherIntake: "Weather intake",
    weatherHint: "Use a 15-day local forecast or add your own conditions.",
    useLocation: "Use my location",
    weatherAwait: "Waiting for a location",
    weatherAwaitHint: "We’ll add today plus the next 14 days.",
    temperatureLabel: "Temperature",
    celsiusToday: "°C today",
    humidityLabel: "Humidity",
    percentToday: "% today",
    rainfallLabel: "Rainfall",
    rainfallUnit: "mm · 15 days",
    seeRecommendations: "See my recommendations",
    privacy:
      "Your readings are saved only in this browser. Recommendations are guidance, not a replacement for local agricultural advice.",
    seasonPlan: "MONSOON SEASON PLAN",
    helloFarmer: "Hello, farmer.",
    helloName: "Hello, {name}.",
    fieldReady: "Your field is ready.",
    dashboardSummary:
      "Based on your latest field readings and a 15-day weather outlook.",
    dashboardSummaryMl:
      "Matched by our trained crop model from your field readings and {rainfall}mm expected rainfall across the next 15 days.",
    dashboardSummaryFallback:
      "Based on your latest field readings and {rainfall}mm expected rainfall across the next 15 days.",
    viewCropRecommendations: "View Crop Recommendations",
    editFieldPlan: "Edit Field Plan",
    temperature: "temperature",
    rainfall: "mm expected rain",
    matches: "crop matches",
    fieldReading: "FIELD READING",
    recommendationTitle: "A small book<br>for your next crop.",
    previousRecommendation: "Previous recommendation",
    nextRecommendation: "Next recommendation",
    turnPage: "Use arrows to turn the page",
    downloadPdf: "Download PDF summary",
    whyItWorks: "WHY THIS WORKS",
    weatherTitle: "The next 15 days<br>are on your side.",
    weatherCopy:
      "Forecast data helps us weigh heat, humidity and rainfall—not just today, but through the first critical weeks of growth.",
    averageWarmth: "average warmth",
    expectedRain: "expected rain",
    forecast: "15-day forecast",
    today: "Today",
    plus7: "+7 days",
    plus14: "+14 days",
    soilSnapshot: "SOIL SNAPSHOT",
    inputFactors: "The input factors<br>behind the match.",
    restoreKicker: "SOIL RESTORE PLAN",
    restoreTitle: "Give the soil<br>something back.",
    restoreIntro:
      "We’ll read your nutrient levels and suggest a restorative next crop.",
    restoreDisclaimer:
      "These are soil-building rotations—not a replacement for local nutrient advice or required amendments.",
    backToFieldPlan: "Back to Field Plan",
    editFieldReadings: "Edit Field Readings",
    askMitaSoil: "Ask Mita About Soil",
    fieldAdvisor: "YOUR FARM ADVISOR",
    askTitle: "Ask Mita anything<br>about your farm.",
    aiLanguageReady: "Ready to answer in your selected language.",
    aiLanguageStatus: "Mita will answer in {language}.",
    mitaGreeting:
      "Hello! I’m Mita. Ask me about crops, soil, weather, pests, irrigation or your next season.",
    questionWhy: "Why was this crop suggested?",
    questionWhen: "When should I sow?",
    questionImprove: "How can I improve my soil?",
    askPlaceholder: "Ask any farm question…",
    speechHint: "Speak or type in English, Hindi, Marathi or Telugu.",
    speakQuestion: "Speak your question",
    sendQuestion: "Send question",
    finishRecording: "Finish recording",
    farmerProfile: "YOUR FARMER PROFILE",
    loginTitle: "Welcome<br><em>to your field.</em>",
    loginPhoto: "Every season<br>has a story.",
    loginCopy:
      "Enter your name and phone number. We’ll use them only in this browser to bring back your saved field plans.",
    yourName: "Your name",
    namePlaceholder: "e.g. Meera Patel",
    phoneNumber: "Phone number",
    phonePlaceholder: "10-digit mobile number",
    continueToField: "Continue to my field",
    historyEnterNumber: "Enter your number to see plans you saved earlier.",
    historyNoPlans:
      "No saved plans for this number yet. Your next field plan will appear here.",
    findingField: "Finding field…",
    locationUnavailable: "Location unavailable",
    locationPermissionUnavailable: "Location permission unavailable",
    weatherServiceUnavailable: "Weather service unavailable",
    localForecast: "Your local 15-day forecast",
    sampleValuesReason: "Sample values — {reason}",
    weatherStatusSummary:
      "Today: {temperature}°C · {humidity}% humidity · {rainfall}mm expected rain",
    forecastAdded: "✓ Forecast added",
    loadingOcrEngine: "Loading Tesseract OCR engine…",
    scanningSoilCard: "Scanning Soil Health Card…",
    preprocessingImage: "Preprocessing image for contrast & clarity…",
    analyzingValues: "Analyzing N, P, K & pH text values…",
    scanComplete: "Scan complete!",
    extractedValues:
      "✓ Extracted {count} soil values! Review & adjust fields below.",
    cardProcessedPrefill:
      "Card processed! Pre-filled soil values (110, 45, 55, 6.8). Review & adjust below.",
    prefilledSampleValues:
      "Pre-filled sample values below — please adjust if needed.",
    lowNitrogen: "LOW NITROGEN",
    lowPhosphorus: "LOW PHOSPHORUS",
    lowPotassium: "LOW POTASSIUM",
    balancedNutrients: "BALANCED NUTRIENTS",
    dhaincha: "Dhaincha",
    greenGram: "Green gram",
    cowpea: "Cowpea",
    pigeonPea: "Pigeon pea",
    sorghum: "Sorghum",
    sunflower: "Sunflower",
    keepLegumeRotation: "Keep a legume in rotation",
    dhainchaBenefit:
      "A fast green-manure crop that fixes atmospheric nitrogen and adds organic matter when incorporated.",
    dhainchaTiming: "Grow before the main crop; incorporate before flowering.",
    greenGramBenefit:
      "A short-duration pulse rotation that helps build biologically fixed nitrogen while still giving a harvest.",
    greenGramTiming: "Keep roots and residue in the field after harvest.",
    cowpeaNitrogenBenefit:
      "A robust legume cover crop for nitrogen fixation and ground cover during a break between cash crops.",
    cowpeaNitrogenTiming: "Use as a cover crop or green manure.",
    pigeonPeaPhosphorusBenefit:
      "Its deep roots and leaf litter can support nutrient cycling and improve the next crop’s rooting environment.",
    pigeonPeaPhosphorusTiming: "Return residues to the soil after harvest.",
    cowpeaPhosphorusBenefit:
      "Adds biomass and supports an active soil biology that helps make existing nutrients more available.",
    cowpeaPhosphorusTiming:
      "Pair with the phosphorus amendment advised locally.",
    sorghumBenefit:
      "A deep-rooted rotation crop that can recycle nutrients from lower soil layers when its residues are retained.",
    sorghumTiming: "Leave stalks or composted residues on the field.",
    sunflowerBenefit:
      "A deep-rooted option that helps explore deeper soil layers and diversify the rotation.",
    sunflowerTiming:
      "Return crop residues; replace exported potassium as advised.",
    balancedBenefit:
      "Your field does not show a nutrient gap against the app’s planning bands. A short pulse or green manure still protects soil organic matter and nitrogen cycling.",
    balancedTiming: "Try green gram, cowpea or dhaincha between major crops.",
    balancedNote:
      "Your N, P and K readings are within the app’s planning bands. Keep checking your Soil Health Card for field-specific targets.",
    restoreNote:
      "These crops can support nitrogen fixation, biomass and nutrient cycling. For low phosphorus or potassium, confirm a local amendment plan—crops recycle these nutrients but cannot create minerals.",
    cropCalendar: "CROP CALENDAR",
    expectedDuration: "Expected duration:",
    complete: "COMPLETE",
    rainProbability: "Rain probability",
    weatherImpact: "WEATHER IMPACT",
    rainAdvice:
      "Rain expected soon. Delay fertilizer application until the field drains.",
    dryAdvice: "Dry conditions ahead. Schedule irrigation in the early morning.",
    growingJourney: "GROWING JOURNEY",
    cropTimeline: "Crop timeline",
    scrollToExplore: "SCROLL TO EXPLORE →",
    completed: "COMPLETED",
    inProgress: "IN PROGRESS",
    upcoming: "UPCOMING",
    farmingTip: "FARMING TIP",
    farmingTipText:
      "Irrigating early in the morning reduces evaporation losses.",
    stayOnTrack: "STAY ON TRACK",
    todaysTasks: "Today’s tasks",
    remindersEnabled: "Reminders enabled",
    enableTaskReminders: "Enable task reminders",
    reminderNote: "On-device reminders work while this dashboard is open.",
    notificationUnsupported: "This browser does not support notifications.",
    notificationDenied:
      "Allow notifications in your browser settings to receive task reminders.",
    selectCropPlanAlert:
      "Please select a crop plan above to view its calendar.",
    cropPlanSelected: "Crop plan selected",
    planCrop: "Plan {crop}",
    notificationBody: "It is time to: {task}",
    landPreparation: "Land preparation",
    landPreparationDescription: "Level the field and add organic matter.",
    seedSowing: "Seed sowing",
    seedSowingDescription: "Use healthy seed at the right depth.",
    firstIrrigation: "First irrigation",
    firstIrrigationDescription: "Keep early growth evenly moist.",
    fertilizerApplication: "Fertilizer application",
    fertilizerApplicationDescription:
      "Apply nutrients when the field is not waterlogged.",
    weedControl: "Weed control",
    weedControlDescription: "Remove competing weeds before they spread.",
    pestInspection: "Pest inspection",
    pestInspectionDescription: "Check leaf undersides and stems.",
    floweringStage: "Flowering stage",
    floweringStageDescription: "Avoid water stress during flowering.",
    harvest: "Harvest",
    harvestDescription: "Harvest at full maturity and dry well.",
    irrigateField: "Irrigate field",
    inspectPests: "Inspect for pests",
    applyNitrogen: "Apply nitrogen fertilizer",
    high: "High",
    medium: "Medium",
    low: "Low",
    confidence: "CONFIDENCE",
    modelRunnerUp: "MODEL RUNNER-UP",
    aiModelMatch: "AI MODEL MATCH",
    fieldMatch: "FIELD MATCH",
    rotationOption: "ROTATION OPTION",
    indicativeMandiPrice: "INDICATIVE MANDI PRICE",
    checkLivePrice: "Check live price",
    perQuintal: "per quintal",
    modelPick: "Model pick",
    suggestedByModel: "Suggested for your readings by the trained crop model.",
    cropGenericDescription:
      "This crop fits your soil and weather readings and is worth considering for the next season.",
    assistantFallback:
      "Mita needs a secure AI service connection for open questions. Your field data is still available above; please try again after the service is configured.",
    speechUnsupported:
      "Speech input is not supported in this browser. You can still type your question.",
    listeningIn: "Listening in {language}…",
    capturedAsk: "Question captured. Press the arrow to ask Mita.",
    couldNotHear: "I could not hear that. Please try again or type your question.",
    preparingSpeech:
      "Preparing the on-device speech model. The first download can take a few minutes…",
    downloadingSpeech: "Downloading the local speech model: {progress}%",
    speechReady:
      "On-device {language} speech is ready. Tap the mic, speak, then tap it again to finish.",
    transcribing: "Transcribing {language} on this device…",
    capturedLocally: "Question captured locally. Press the arrow to ask Mita.",
    notEnoughSpeech:
      "I could not hear enough speech. Please try again or type your question.",
    speechError: "On-device speech could not start: {message}",
    workerError:
      "The local speech worker could not start. You can still type your question.",
    micUnavailable:
      "This browser cannot access the microphone. You can still type your question.",
    listeningDevice:
      "Listening in {language} on this device… tap the mic again when you finish.",
    micPermission:
      "Microphone access was not available. Please allow it, then try again or type your question.",
    speakLonger: "Please speak for a little longer, then try again.",
    useSpeech:
      "Use on-device speech in {language}. The model downloads once and is cached for offline use afterwards.",
    fieldSummaryTitle: "TerraByte field summary",
    fieldRecommendationSummary: "Field recommendation summary",
    preparedBy: "Prepared by TerraByte · {date}",
    printNote:
      "Soil: N {nitrogen}, P {phosphorus}, K {potassium}, pH {ph}<br>15-day conditions: {temperature}°C, {humidity}% humidity, {rainfall}mm expected rainfall.",
    suggestedCrops: "Suggested crops",
    crop: "Crop",
    indicativePrice: "Indicative price",
    printDisclaimer:
      "Prices are indicative. Check your nearest mandi before making a selling decision.",
  },
  hi: {
    titleHome: "TerraByte — खेती को आसान बनाया",
    titlePlanner: "खेत की योजना बनाएं — TerraByte",
    titleDashboard: "डैशबोर्ड — TerraByte",
    titleLogin: "वापसी पर स्वागत है — TerraByte",
    plan: "खेत की योजना",
    dashboard: "डैशबोर्ड",
    ask: "मीता से पूछें",
    login: "लॉग इन",
    myProfile: "मेरी प्रोफ़ाइल",
    home: "होम",
    languageLabel: "🌐 भाषा",
    chooseLanguage: "भाषा चुनें",
    jumpToSection: "सेक्शन पर जाएं",
    jumpToSectionOption: "सेक्शन चुनें…",
    sectionHero: "खेत योजना प्रोफ़ाइल",
    sectionRecommendations: "खेत योजना सुझाव",
    sectionWeather: "15-दिन मौसम पूर्वानुमान",
    sectionSoil: "मिट्टी की झलक",
    sectionRestore: "मिट्टी सुधार योजना",
    sectionCalendar: "फसल कैलेंडर",
    rooted: "आपके खेत से जुड़ा। अगले कदम के लिए तैयार।",
    coverCaption: "खेत की समझ<br>जिसके हाथ मिट्टी में हैं।",
    start: "खेत की योजना शुरू करें",
    seeDashboard: "अपना डैशबोर्ड देखें",
    landingBottom1: "हर मौसम के लिए<br>एक निर्णय साथी।",
    landingBottom2: "मौसम-सचेत<br>बाज़ार-सचेत<br>किसान-प्रथम",
    fieldProfile: "खेत प्रोफ़ाइल",
    plannerTitle: "आइए सुनें कि<br>आपका <em>खेत क्या कहता है।</em>",
    humanNote:
      "कुछ सच्ची रीडिंग। अगला कदम साफ। हम आंकड़ों को काम का बना देंगे।",
    plannerIntro:
      "अपनी रीडिंग डालें, Soil Health Card स्कैन करें, या मौसम को कुछ काम करने दें।",
    soilSource: "मिट्टी का स्रोत चुनें",
    conditions: "बढ़वार की स्थितियां सेट करें",
    recommendation: "सुझाव पाएं",
    newPlan: "नई खेत योजना",
    knowField: "अपने खेत को जानें",
    saved: "इस डिवाइस पर सेव",
    soilReadings: "मिट्टी की रीडिंग",
    soilHint: "चुनें कि खेत का डेटा कैसे लाना है।",
    manual: "खुद भरें",
    manualHint: "मेरे पास N, P, K और pH मान हैं",
    scanCard: "Soil Health Card स्कैन करें",
    scanHint: "फोटो से N, P, K और pH पढ़ें",
    nitrogen: "नाइट्रोजन",
    phosphorus: "फॉस्फोरस",
    potassium: "पोटैशियम",
    soilPh: "मिट्टी pH",
    dropCard: "अपना Soil Health Card फोटो डालें",
    ocrHint: "फोटो या PDF स्कैन — हम N, P, K और pH अपने-आप पढ़ेंगे।",
    browse: "फ़ाइल चुनें",
    sampleCard: "नमूना Soil Health Card आज़माएं",
    weatherIntake: "मौसम जानकारी",
    weatherHint: "15-दिन का स्थानीय पूर्वानुमान लें या अपनी स्थितियां जोड़ें।",
    useLocation: "मेरी लोकेशन उपयोग करें",
    weatherAwait: "लोकेशन का इंतज़ार",
    weatherAwaitHint: "हम आज और अगले 14 दिन जोड़ेंगे।",
    temperatureLabel: "तापमान",
    humidityLabel: "नमी",
    rainfallLabel: "वर्षा",
    seeRecommendations: "मेरे सुझाव देखें",
    privacy:
      "आपकी रीडिंग केवल इस ब्राउज़र में सेव होती हैं। सुझाव मार्गदर्शन हैं, स्थानीय कृषि सलाह का विकल्प नहीं।",
    seasonPlan: "मानसून सीज़न योजना",
    helloFarmer: "नमस्ते, किसान।",
    helloName: "नमस्ते, {name}।",
    fieldReady: "आपका खेत तैयार है।",
    dashboardSummary:
      "आपकी नई खेत रीडिंग और 15-दिन मौसम पूर्वानुमान के आधार पर।",
    dashboardSummaryMl:
      "आपकी खेत रीडिंग और अगले 15 दिनों में {rainfall}mm अपेक्षित बारिश के आधार पर हमारे प्रशिक्षित फसल मॉडल ने मिलान किया।",
    dashboardSummaryFallback:
      "आपकी नई खेत रीडिंग और अगले 15 दिनों में {rainfall}mm अपेक्षित बारिश के आधार पर।",
    viewCropRecommendations: "फसल सुझाव देखें",
    editFieldPlan: "खेत योजना बदलें",
    temperature: "तापमान",
    rainfall: "mm अपेक्षित वर्षा",
    matches: "फसल मिलान",
    fieldReading: "खेत रीडिंग",
    recommendationTitle: "आपकी अगली फसल के लिए<br>एक छोटी किताब।",
    turnPage: "पन्ना पलटने के लिए तीरों का उपयोग करें",
    downloadPdf: "PDF सारांश डाउनलोड करें",
    whyItWorks: "यह क्यों काम करता है",
    weatherTitle: "अगले 15 दिन<br>आपके साथ हैं।",
    weatherCopy:
      "पूर्वानुमान हमें ताप, नमी और वर्षा को सिर्फ आज नहीं, बल्कि शुरुआती महत्वपूर्ण हफ्तों तक समझने में मदद करता है।",
    averageWarmth: "औसत गर्माहट",
    expectedRain: "अपेक्षित वर्षा",
    forecast: "15-दिन पूर्वानुमान",
    today: "आज",
    plus7: "+7 दिन",
    plus14: "+14 दिन",
    soilSnapshot: "मिट्टी की झलक",
    inputFactors: "मिलान के पीछे<br>इनपुट कारक।",
    restoreKicker: "मिट्टी सुधार योजना",
    restoreTitle: "मिट्टी को<br>कुछ वापस दें।",
    restoreIntro:
      "हम आपके पोषक स्तर पढ़कर सुधार करने वाली अगली फसल सुझाएंगे।",
    restoreDisclaimer:
      "ये मिट्टी सुधारने वाली फसल चक्र योजनाएं हैं—स्थानीय पोषण सलाह या जरूरी संशोधन का विकल्प नहीं।",
    backToFieldPlan: "खेत योजना पर वापस",
    editFieldReadings: "खेत रीडिंग बदलें",
    askMitaSoil: "मिट्टी के बारे में मीता से पूछें",
    fieldAdvisor: "आपकी कृषि सलाहकार",
    askTitle: "अपने खेत के बारे में<br>मीता से कुछ भी पूछें।",
    aiLanguageReady: "आपकी चुनी भाषा में जवाब देने के लिए तैयार।",
    aiLanguageStatus: "मीता {language} में जवाब देगी।",
    mitaGreeting:
      "नमस्ते! मैं मीता हूं। फसल, मिट्टी, मौसम, कीट, सिंचाई या अगले सीज़न के बारे में पूछें।",
    questionWhy: "यह फसल क्यों सुझाई गई?",
    questionWhen: "मुझे कब बुवाई करनी चाहिए?",
    questionImprove: "मैं मिट्टी कैसे सुधार सकता हूं?",
    askPlaceholder: "कोई भी खेती का सवाल पूछें…",
    speechHint: "अंग्रेज़ी, हिन्दी, मराठी या तेलुगु में बोलें या टाइप करें।",
    speakQuestion: "अपना सवाल बोलें",
    sendQuestion: "सवाल भेजें",
    farmerProfile: "आपकी किसान प्रोफ़ाइल",
    loginTitle: "स्वागत है<br><em>आपके खेत में।</em>",
    loginPhoto: "हर मौसम की<br>एक कहानी होती है।",
    loginCopy:
      "अपना नाम और फोन नंबर डालें। सेव की गई खेत योजनाएं वापस लाने के लिए हम इन्हें केवल इस ब्राउज़र में उपयोग करेंगे।",
    yourName: "आपका नाम",
    namePlaceholder: "जैसे मीरा पटेल",
    phoneNumber: "फोन नंबर",
    phonePlaceholder: "10-अंकों का मोबाइल नंबर",
    continueToField: "मेरे खेत पर जाएं",
    historyEnterNumber: "पहले सेव की गई योजनाएं देखने के लिए नंबर डालें।",
    historyNoPlans:
      "इस नंबर के लिए अभी कोई सेव योजना नहीं है। आपकी अगली खेत योजना यहां दिखेगी।",
    findingField: "खेत खोजा जा रहा है…",
    localForecast: "आपका स्थानीय 15-दिन पूर्वानुमान",
    weatherStatusSummary:
      "आज: {temperature}°C · {humidity}% नमी · {rainfall}mm अपेक्षित वर्षा",
    forecastAdded: "✓ पूर्वानुमान जोड़ दिया गया",
    loadingOcrEngine: "Tesseract OCR इंजन लोड हो रहा है…",
    scanningSoilCard: "Soil Health Card स्कैन हो रहा है…",
    preprocessingImage: "कॉन्ट्रास्ट और साफ़ी के लिए इमेज तैयार हो रही है…",
    analyzingValues: "N, P, K और pH टेक्स्ट मान पढ़े जा रहे हैं…",
    scanComplete: "स्कैन पूरा!",
    extractedValues: "✓ {count} मिट्टी मान मिल गए! नीचे जांचें और बदलें।",
    prefilledSampleValues: "नीचे नमूना मान भर दिए गए हैं — जरूरत हो तो बदलें।",
    lowNitrogen: "नाइट्रोजन कम",
    lowPhosphorus: "फॉस्फोरस कम",
    lowPotassium: "पोटैशियम कम",
    balancedNutrients: "पोषक तत्व संतुलित",
    cropCalendar: "फसल कैलेंडर",
    expectedDuration: "अपेक्षित अवधि:",
    complete: "पूरा",
    rainProbability: "बारिश की संभावना",
    weatherImpact: "मौसम प्रभाव",
    rainAdvice: "जल्द बारिश हो सकती है। खेत सूखने तक उर्वरक डालना रोकें।",
    dryAdvice: "सूखा मौसम आगे है। सुबह जल्दी सिंचाई तय करें।",
    growingJourney: "बढ़वार यात्रा",
    cropTimeline: "फसल समयरेखा",
    completed: "पूरा",
    inProgress: "चल रहा है",
    upcoming: "आने वाला",
    farmingTip: "खेती टिप",
    farmingTipText: "सुबह जल्दी सिंचाई करने से वाष्पीकरण का नुकसान कम होता है।",
    stayOnTrack: "ट्रैक पर रहें",
    todaysTasks: "आज के काम",
    remindersEnabled: "रिमाइंडर चालू",
    enableTaskReminders: "काम के रिमाइंडर चालू करें",
    reminderNote: "डैशबोर्ड खुला रहने पर ऑन-डिवाइस रिमाइंडर काम करेंगे।",
    cropPlanSelected: "फसल योजना चुनी गई",
    planCrop: "{crop} की योजना",
    landPreparation: "खेत की तैयारी",
    seedSowing: "बीज बुवाई",
    firstIrrigation: "पहली सिंचाई",
    fertilizerApplication: "उर्वरक डालना",
    weedControl: "खरपतवार नियंत्रण",
    pestInspection: "कीट जांच",
    floweringStage: "फूल अवस्था",
    harvest: "कटाई",
    irrigateField: "खेत की सिंचाई करें",
    inspectPests: "कीटों की जांच करें",
    applyNitrogen: "नाइट्रोजन उर्वरक डालें",
    high: "उच्च",
    medium: "मध्यम",
    confidence: "भरोसा",
    aiModelMatch: "AI मॉडल मिलान",
    modelRunnerUp: "मॉडल रनर-अप",
    fieldMatch: "खेत मिलान",
    indicativeMandiPrice: "अनुमानित मंडी मूल्य",
    checkLivePrice: "लाइव मूल्य देखें",
    perQuintal: "प्रति क्विंटल",
    cropGenericDescription:
      "आपकी मिट्टी और मौसम रीडिंग के आधार पर यह फसल अगले सीज़न के लिए विचार करने योग्य है।",
    assistantFallback:
      "खुले सवालों के लिए मीता को सुरक्षित AI सेवा कनेक्शन चाहिए। आपका खेत डेटा ऊपर उपलब्ध है; सेवा सेट होने के बाद फिर कोशिश करें।",
    useSpeech:
      "{language} में ऑन-डिवाइस स्पीच उपयोग करें। मॉडल एक बार डाउनलोड होकर ऑफलाइन कैश हो जाता है।",
  },
  mr: {
    titleHome: "TerraByte — शेती अधिक स्पष्ट",
    titlePlanner: "शेत योजना तयार करा — TerraByte",
    titleDashboard: "डॅशबोर्ड — TerraByte",
    titleLogin: "पुन्हा स्वागत — TerraByte",
    plan: "शेत योजना",
    dashboard: "डॅशबोर्ड",
    ask: "मिताला विचारा",
    login: "लॉग इन",
    myProfile: "माझी प्रोफाइल",
    home: "होम",
    languageLabel: "🌐 भाषा",
    chooseLanguage: "भाषा निवडा",
    jumpToSectionOption: "विभाग निवडा…",
    sectionHero: "शेत योजना प्रोफाइल",
    sectionRecommendations: "शेत योजना शिफारसी",
    sectionWeather: "15-दिवस हवामान अंदाज",
    sectionSoil: "मातीची झलक",
    sectionRestore: "माती सुधार योजना",
    sectionCalendar: "पीक कॅलेंडर",
    rooted: "तुमच्या शेताशी जोडलेले. पुढच्या पावलासाठी तयार.",
    coverCaption: "मातीशी जोडलेली<br>शेत बुद्धिमत्ता.",
    start: "शेत योजना सुरू करा",
    seeDashboard: "तुमचा डॅशबोर्ड पाहा",
    landingBottom1: "प्रत्येक हंगामासाठी<br>निर्णय साथी.",
    landingBottom2: "हवामान-जाणते<br>बाजार-जाणते<br>शेतकरी-प्रथम",
    fieldProfile: "शेत प्रोफाइल",
    plannerTitle: "चला ऐकूया<br>तुमचे <em>शेत काय सांगते.</em>",
    humanNote:
      "काही खरी मोजमापे. पुढचे पाऊल स्पष्ट. आकडे उपयोगी वाटतील असे करूया.",
    plannerIntro:
      "तुमची मोजमापे वापरा, Soil Health Card स्कॅन करा, किंवा हवामानाला थोडे काम करू द्या.",
    soilSource: "मातीचा स्रोत निवडा",
    conditions: "वाढीच्या अटी सेट करा",
    recommendation: "शिफारसी मिळवा",
    newPlan: "नवी शेत योजना",
    knowField: "तुमचे शेत जाणून घ्या",
    saved: "या डिव्हाइसवर सेव्ह",
    soilReadings: "मातीची मोजमापे",
    soilHint: "शेताचा डेटा कसा आणायचा ते निवडा.",
    manual: "स्वतः भरा",
    manualHint: "माझ्याकडे N, P, K आणि pH मूल्ये आहेत",
    scanCard: "Soil Health Card स्कॅन करा",
    scanHint: "फोटोमधून N, P, K आणि pH वाचा",
    nitrogen: "नायट्रोजन",
    phosphorus: "फॉस्फरस",
    potassium: "पोटॅशियम",
    soilPh: "माती pH",
    dropCard: "तुमचा Soil Health Card फोटो टाका",
    browse: "फाइल निवडा",
    sampleCard: "नमुना Soil Health Card वापरून पाहा",
    weatherIntake: "हवामान माहिती",
    weatherHint: "15-दिवस स्थानिक अंदाज वापरा किंवा तुमच्या अटी जोडा.",
    useLocation: "माझे स्थान वापरा",
    weatherAwait: "स्थानाची प्रतीक्षा",
    weatherAwaitHint: "आम्ही आज आणि पुढचे 14 दिवस जोडू.",
    temperatureLabel: "तापमान",
    humidityLabel: "आर्द्रता",
    rainfallLabel: "पाऊस",
    seeRecommendations: "माझ्या शिफारसी पाहा",
    privacy:
      "तुमची मोजमापे फक्त या ब्राउझरमध्ये सेव्ह होतात. शिफारसी मार्गदर्शन आहेत, स्थानिक कृषी सल्ल्याचा पर्याय नाहीत.",
    seasonPlan: "मान्सून हंगाम योजना",
    helloFarmer: "नमस्कार, शेतकरी.",
    helloName: "नमस्कार, {name}.",
    fieldReady: "तुमचे शेत तयार आहे.",
    dashboardSummary:
      "तुमच्या अलीकडील शेत मोजमापांवर आणि 15-दिवस हवामान अंदाजावर आधारित.",
    dashboardSummaryMl:
      "तुमच्या शेत मोजमापांवर आणि पुढील 15 दिवसांत {rainfall}mm अपेक्षित पावसावर आमच्या प्रशिक्षित पीक मॉडेलने जुळवले.",
    dashboardSummaryFallback:
      "तुमच्या अलीकडील शेत मोजमापांवर आणि पुढील 15 दिवसांत {rainfall}mm अपेक्षित पावसावर आधारित.",
    viewCropRecommendations: "पीक शिफारसी पाहा",
    editFieldPlan: "शेत योजना बदला",
    temperature: "तापमान",
    rainfall: "mm अपेक्षित पाऊस",
    matches: "पीक जुळणी",
    fieldReading: "शेत मोजमाप",
    recommendationTitle: "तुमच्या पुढच्या पिकासाठी<br>एक छोटी वही.",
    turnPage: "पान उलटण्यासाठी बाण वापरा",
    downloadPdf: "PDF सारांश डाउनलोड करा",
    whyItWorks: "हे का चालते",
    weatherTitle: "पुढचे 15 दिवस<br>तुमच्या बाजूने आहेत.",
    averageWarmth: "सरासरी उब",
    expectedRain: "अपेक्षित पाऊस",
    forecast: "15-दिवस अंदाज",
    today: "आज",
    plus7: "+7 दिवस",
    plus14: "+14 दिवस",
    soilSnapshot: "मातीची झलक",
    inputFactors: "जुळणीमागील<br>इनपुट घटक.",
    restoreKicker: "माती सुधार योजना",
    restoreTitle: "मातीला<br>काही परत द्या.",
    backToFieldPlan: "शेत योजनेकडे परत",
    editFieldReadings: "शेत मोजमाप बदला",
    askMitaSoil: "मातीबद्दल मिताला विचारा",
    fieldAdvisor: "तुमची शेती सल्लागार",
    askTitle: "तुमच्या शेताबद्दल<br>मिताला काहीही विचारा.",
    aiLanguageReady: "निवडलेल्या भाषेत उत्तर देण्यासाठी तयार.",
    aiLanguageStatus: "मिता {language} मध्ये उत्तर देईल.",
    mitaGreeting:
      "नमस्कार! मी मिता. पिके, माती, हवामान, कीड, सिंचन किंवा पुढच्या हंगामाबद्दल विचारा.",
    questionWhy: "हे पीक का सुचवले?",
    questionWhen: "मी पेरणी कधी करावी?",
    questionImprove: "मी माती कशी सुधारू?",
    askPlaceholder: "कोणताही शेती प्रश्न विचारा…",
    speechHint: "इंग्रजी, हिन्दी, मराठी किंवा तेलुगुमध्ये बोला किंवा टाइप करा.",
    speakQuestion: "तुमचा प्रश्न बोला",
    sendQuestion: "प्रश्न पाठवा",
    farmerProfile: "तुमची शेतकरी प्रोफाइल",
    loginTitle: "स्वागत<br><em>तुमच्या शेतात.</em>",
    loginPhoto: "प्रत्येक हंगामाची<br>एक गोष्ट असते.",
    yourName: "तुमचे नाव",
    phoneNumber: "फोन नंबर",
    continueToField: "माझ्या शेताकडे जा",
    historyEnterNumber: "पूर्वी सेव्ह केलेल्या योजना पाहण्यासाठी नंबर द्या.",
    cropCalendar: "पीक कॅलेंडर",
    expectedDuration: "अपेक्षित कालावधी:",
    complete: "पूर्ण",
    rainProbability: "पावसाची शक्यता",
    weatherImpact: "हवामान परिणाम",
    growingJourney: "वाढीचा प्रवास",
    cropTimeline: "पीक वेळापत्रक",
    completed: "पूर्ण",
    inProgress: "चालू",
    upcoming: "येणारे",
    stayOnTrack: "मार्गावर राहा",
    todaysTasks: "आजची कामे",
    cropPlanSelected: "पीक योजना निवडली",
    planCrop: "{crop} योजना",
    high: "उच्च",
    medium: "मध्यम",
    confidence: "विश्वास",
    indicativeMandiPrice: "सूचक मंडी भाव",
    checkLivePrice: "लाइव्ह भाव पाहा",
    perQuintal: "प्रति क्विंटल",
    cropGenericDescription:
      "तुमच्या माती आणि हवामान मोजमापांवरून हे पीक पुढच्या हंगामासाठी विचार करण्यासारखे आहे.",
    assistantFallback:
      "खुल्या प्रश्नांसाठी मिताला सुरक्षित AI सेवा कनेक्शन लागते. तुमचा शेत डेटा वर उपलब्ध आहे; सेवा सेट झाल्यावर पुन्हा प्रयत्न करा.",
  },
  te: {
    titleHome: "TerraByte — వ్యవసాయం మరింత స్పష్టం",
    titlePlanner: "పొలం ప్లాన్ తయారు చేయండి — TerraByte",
    titleDashboard: "డ్యాష్‌బోర్డ్ — TerraByte",
    titleLogin: "మళ్లీ స్వాగతం — TerraByte",
    plan: "పొలం ప్లాన్",
    dashboard: "డ్యాష్‌బోర్డ్",
    ask: "మీతాను అడగండి",
    login: "లాగిన్",
    myProfile: "నా ప్రొఫైల్",
    home: "హోమ్",
    languageLabel: "🌐 భాష",
    chooseLanguage: "భాషను ఎంచుకోండి",
    jumpToSectionOption: "విభాగం ఎంచుకోండి…",
    sectionHero: "పొలం ప్లాన్ ప్రొఫైల్",
    sectionRecommendations: "పొలం ప్లాన్ సూచనలు",
    sectionWeather: "15-రోజుల వాతావరణం",
    sectionSoil: "మట్టి స్నాప్‌షాట్",
    sectionRestore: "మట్టి పునరుద్ధరణ ప్లాన్",
    sectionCalendar: "పంట క్యాలెండర్",
    rooted: "మీ పొలానికి దగ్గరగా. తదుపరి దశకు సిద్ధంగా.",
    coverCaption: "మట్టిని తాకే<br>పొలం తెలివి.",
    start: "పొలం ప్లాన్ ప్రారంభించండి",
    seeDashboard: "మీ డ్యాష్‌బోర్డ్ చూడండి",
    landingBottom1: "ప్రతి పంటకాలానికి<br>ఒక నిర్ణయ సహచరి.",
    landingBottom2: "వాతావరణం-తెలిసిన<br>మార్కెట్-తెలిసిన<br>రైతు-ముందు",
    fieldProfile: "పొలం ప్రొఫైల్",
    plannerTitle: "మీ <em>పొలం ఏమంటుందో</em><br>విందాం.",
    plannerIntro:
      "మీ రీడింగులు వాడండి, Soil Health Card స్కాన్ చేయండి, లేదా వాతావరణాన్ని కొంత పని చేయనివ్వండి.",
    soilSource: "మట్టి మూలాన్ని ఎంచుకోండి",
    conditions: "పెరుగుదల పరిస్థితులు సెట్ చేయండి",
    recommendation: "సూచనలు పొందండి",
    newPlan: "కొత్త పొలం ప్లాన్",
    knowField: "మీ పొలాన్ని తెలుసుకోండి",
    saved: "ఈ డివైస్‌లో సేవ్ అయింది",
    soilReadings: "మట్టి రీడింగులు",
    soilHint: "మీ పొలం డేటాను ఎలా తీసుకురావాలో ఎంచుకోండి.",
    manual: "చేతితో నమోదు చేయండి",
    manualHint: "నా దగ్గర N, P, K మరియు pH విలువలు ఉన్నాయి",
    scanCard: "Soil Health Card స్కాన్ చేయండి",
    scanHint: "ఫోటో నుంచి N, P, K మరియు pH చదవండి",
    nitrogen: "నైట్రోజన్",
    phosphorus: "ఫాస్ఫరస్",
    potassium: "పోటాషియం",
    soilPh: "మట్టి pH",
    browse: "ఫైల్ ఎంచుకోండి",
    sampleCard: "నమూనా Soil Health Card ప్రయత్నించండి",
    weatherIntake: "వాతావరణ సమాచారం",
    weatherHint:
      "15-రోజుల స్థానిక అంచనాను వాడండి లేదా మీ పరిస్థితులు చేర్చండి.",
    useLocation: "నా స్థానం వాడండి",
    weatherAwait: "స్థానం కోసం వేచి ఉంది",
    weatherAwaitHint: "ఈ రోజు మరియు వచ్చే 14 రోజులు జోడిస్తాం.",
    temperatureLabel: "ఉష్ణోగ్రత",
    humidityLabel: "ఆర్ద్రత",
    rainfallLabel: "వర్షపాతం",
    seeRecommendations: "నా సూచనలు చూడండి",
    privacy:
      "మీ రీడింగులు ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ అవుతాయి. సూచనలు మార్గదర్శకాలు మాత్రమే; స్థానిక వ్యవసాయ సలహాకు ప్రత్యామ్నాయం కాదు.",
    seasonPlan: "మాన్సూన్ సీజన్ ప్లాన్",
    helloFarmer: "నమస్తే, రైతు.",
    helloName: "నమస్తే, {name}.",
    fieldReady: "మీ పొలం సిద్ధంగా ఉంది.",
    dashboardSummary:
      "మీ తాజా పొలం రీడింగులు మరియు 15-రోజుల వాతావరణ అంచనాపై ఆధారంగా.",
    dashboardSummaryMl:
      "మీ పొలం రీడింగులు మరియు వచ్చే 15 రోజుల్లో {rainfall}mm అంచనా వర్షంతో మా శిక్షణ పొందిన పంట మోడల్ సరిపోల్చింది.",
    dashboardSummaryFallback:
      "మీ తాజా పొలం రీడింగులు మరియు వచ్చే 15 రోజుల్లో {rainfall}mm అంచనా వర్షంపై ఆధారంగా.",
    viewCropRecommendations: "పంట సూచనలు చూడండి",
    editFieldPlan: "పొలం ప్లాన్ మార్చండి",
    temperature: "ఉష్ణోగ్రత",
    rainfall: "mm అంచనా వర్షం",
    matches: "పంట సరిపోలికలు",
    fieldReading: "పొలం రీడింగ్",
    recommendationTitle: "మీ తదుపరి పంట కోసం<br>ఒక చిన్న పుస్తకం.",
    turnPage: "పేజీ తిప్పడానికి బాణాలు వాడండి",
    downloadPdf: "PDF సారాంశం డౌన్‌లోడ్ చేయండి",
    whyItWorks: "ఇది ఎందుకు పనిచేస్తుంది",
    weatherTitle: "తదుపరి 15 రోజులు<br>మీకు అనుకూలంగా ఉన్నాయి.",
    averageWarmth: "సగటు వేడి",
    expectedRain: "అంచనా వర్షం",
    forecast: "15-రోజుల అంచనా",
    today: "ఈ రోజు",
    plus7: "+7 రోజులు",
    plus14: "+14 రోజులు",
    soilSnapshot: "మట్టి స్నాప్‌షాట్",
    inputFactors: "సరిపోలిక వెనుక<br>ఇన్‌పుట్ అంశాలు.",
    restoreKicker: "మట్టి పునరుద్ధరణ ప్లాన్",
    restoreTitle: "మట్టికి<br>ఏదో తిరిగి ఇవ్వండి.",
    backToFieldPlan: "పొలం ప్లాన్‌కు తిరిగి",
    editFieldReadings: "పొలం రీడింగులు మార్చండి",
    askMitaSoil: "మట్టి గురించి మీతాను అడగండి",
    fieldAdvisor: "మీ వ్యవసాయ సలహాదారు",
    askTitle: "మీ పొలం గురించి<br>మీతాను ఏదైనా అడగండి.",
    aiLanguageReady: "మీరు ఎంచుకున్న భాషలో సమాధానం ఇవ్వడానికి సిద్ధం.",
    aiLanguageStatus: "మీता {language} లో సమాధానం ఇస్తుంది.",
    mitaGreeting:
      "నమస్తే! నేను మీతా. పంటలు, మట్టి, వాతావరణం, పురుగులు, నీరుపారుదల లేదా తదుపరి సీజన్ గురించి అడగండి.",
    questionWhy: "ఈ పంట ఎందుకు సూచించారు?",
    questionWhen: "నేను ఎప్పుడు విత్తాలి?",
    questionImprove: "నా మట్టిని ఎలా మెరుగుపరచాలి?",
    askPlaceholder: "ఏదైనా వ్యవసాయ ప్రశ్న అడగండి…",
    speechHint: "ఇంగ్లీష్, हिन्दी, మరాఠీ లేదా తెలుగులో మాట్లాడండి లేదా టైప్ చేయండి.",
    speakQuestion: "మీ ప్రశ్నను మాట్లాడండి",
    sendQuestion: "ప్రశ్న పంపండి",
    farmerProfile: "మీ రైతు ప్రొఫైల్",
    loginTitle: "స్వాగతం<br><em>మీ పొలానికి.</em>",
    loginPhoto: "ప్రతి సీజన్‌కు<br>ఒక కథ ఉంటుంది.",
    yourName: "మీ పేరు",
    phoneNumber: "ఫోన్ నంబర్",
    continueToField: "నా పొలానికి కొనసాగండి",
    historyEnterNumber: "ముందు సేవ్ చేసిన ప్లాన్‌లు చూడటానికి మీ నంబర్ ఇవ్వండి.",
    cropCalendar: "పంట క్యాలెండర్",
    expectedDuration: "అంచనా వ్యవధి:",
    complete: "పూర్తి",
    rainProbability: "వర్షం అవకాశం",
    weatherImpact: "వాతావరణ ప్రభావం",
    growingJourney: "పెరుగుదల ప్రయాణం",
    cropTimeline: "పంట కాలక్రమం",
    completed: "పూర్తి",
    inProgress: "జరుగుతోంది",
    upcoming: "రాబోతోంది",
    stayOnTrack: "పాటుపడుతూ ఉండండి",
    todaysTasks: "ఈ రోజు పనులు",
    cropPlanSelected: "పంట ప్లాన్ ఎంచుకున్నారు",
    planCrop: "{crop} ప్లాన్ చేయండి",
    high: "అధిక",
    medium: "మధ్యస్థ",
    confidence: "నమ్మకం",
    indicativeMandiPrice: "సూచనాత్మక మండీ ధర",
    checkLivePrice: "లైవ్ ధర చూడండి",
    perQuintal: "క్వింటాల్‌కు",
    cropGenericDescription:
      "మీ మట్టి మరియు వాతావరణ రీడింగుల ఆధారంగా ఈ పంటను తదుపరి సీజన్‌కు పరిగణించవచ్చు.",
    assistantFallback:
      "తెరచిన ప్రశ్నలకు మీతాకు సురక్షిత AI సేవ కనెక్షన్ అవసరం. మీ పొలం డేటా పై ఉంది; సేవ సిద్ధమైన తర్వాత మళ్లీ ప్రయత్నించండి.",
  },
};

Object.keys(i18n).forEach((language) => {
  translations[language] = { ...(translations[language] || {}), ...i18n[language] };
});

const languageLabels = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
  te: "తెలుగు",
};
const languageLocales = { en: "en-IN", hi: "hi-IN", mr: "mr-IN", te: "te-IN" };
const cropNameTranslations = {
  Groundnut: { hi: "मूंगफली", mr: "भुईमूग", te: "వేరుశెనగ" },
  Millet: { hi: "बाजरा", mr: "बाजरी", te: "సజ్జ" },
  Coffee: { hi: "कॉफी", mr: "कॉफी", te: "కాఫీ" },
  Wheat: { hi: "गेहूं", mr: "गहू", te: "గోధుమ" },
  Maize: { hi: "मक्का", mr: "मका", te: "మొక్కజొన్న" },
  Rice: { hi: "धान", mr: "तांदूळ", te: "వరి" },
  Barley: { hi: "जौ", mr: "जव", te: "బార్లీ" },
  Jute: { hi: "जूट", mr: "ज्यूट", te: "జూట్" },
  Cotton: { hi: "कपास", mr: "कापूस", te: "పత్తి" },
  Sugarcane: { hi: "गन्ना", mr: "ऊस", te: "చెరకు" },
  Chickpea: { hi: "चना", mr: "हरभरा", te: "సెనగ" },
  "Kidney beans": { hi: "राजमा", mr: "राजमा", te: "రాజ్మా" },
  "Pigeon pea": { hi: "अरहर", mr: "तूर", te: "కంది" },
  "Moth beans": { hi: "मोठ", mr: "मटकी", te: "మాత్ బీన్స్" },
  "Mung bean": { hi: "मूंग", mr: "मूग", te: "పెసర" },
  "Black gram": { hi: "उड़द", mr: "उडीद", te: "మినుములు" },
  Lentil: { hi: "मसूर", mr: "मसूर", te: "మసూర్ పప్పు" },
  Pomegranate: { hi: "अनार", mr: "डाळिंब", te: "దానిమ్మ" },
  Banana: { hi: "केला", mr: "केळी", te: "అరటి" },
  Mango: { hi: "आम", mr: "आंबा", te: "మామిడి" },
  Grapes: { hi: "अंगूर", mr: "द्राक्षे", te: "ద్రాక్ష" },
  Watermelon: { hi: "तरबूज", mr: "कलिंगड", te: "పుచ్చకాయ" },
  Muskmelon: { hi: "खरबूजा", mr: "खरबूज", te: "కర్బూజ" },
  Apple: { hi: "सेब", mr: "सफरचंद", te: "ఆపిల్" },
  Orange: { hi: "संतरा", mr: "संत्रे", te: "నారింజ" },
  Papaya: { hi: "पपीता", mr: "पपई", te: "బొప్పాయి" },
  Coconut: { hi: "नारियल", mr: "नारळ", te: "కొబ్బరి" },
  Soybean: { hi: "सोयाबीन", mr: "सोयाबीन", te: "సోయాబీన్" },
};
const shortTextTranslations = {
  "Soil builder": { hi: "मिट्टी सुधारक", mr: "माती सुधारक", te: "మట్టి మెరుగుపరచేది" },
  "Warm season": { hi: "गर्म मौसम", mr: "उबदार हंगाम", te: "వెచ్చని కాలం" },
  Resilient: { hi: "लचीला", mr: "तगडे", te: "తట్టుకునేది" },
  "Low water": { hi: "कम पानी", mr: "कमी पाणी", te: "తక్కువ నీరు" },
  "High value": { hi: "उच्च मूल्य", mr: "उच्च मूल्य", te: "అధిక విలువ" },
  Perennial: { hi: "बहुवर्षीय", mr: "बहुवर्षीय", te: "బహువర్ష" },
  "Rabi season": { hi: "रबी मौसम", mr: "रबी हंगाम", te: "రబీ కాలం" },
  "Market staple": { hi: "बाज़ार की मुख्य फसल", mr: "बाजारातील मुख्य पीक", te: "మార్కెట్ ప్రధాన పంట" },
  Versatile: { hi: "बहुउपयोगी", mr: "बहुउपयोगी", te: "బహుళ ఉపయోగం" },
  "Fast growing": { hi: "तेज़ बढ़वार", mr: "जलद वाढ", te: "వేగంగా పెరుగుతుంది" },
  "Moisture-loving": { hi: "नमी पसंद", mr: "ओलावा आवडणारे", te: "తేమ ఇష్టం" },
  "Cool season": { hi: "ठंडा मौसम", mr: "थंड हंगाम", te: "చల్లని కాలం" },
  Pulse: { hi: "दलहन", mr: "कडधान्य", te: "పప్పుధాన్యం" },
  "Cash crop": { hi: "नकदी फसल", mr: "नगदी पीक", te: "నగదు పంట" },
  "Long duration": { hi: "लंबी अवधि", mr: "लांब कालावधी", te: "దీర్ఘకాలం" },
  High: { hi: "उच्च", mr: "उच्च", te: "అధిక" },
  Medium: { hi: "मध्यम", mr: "मध्यम", te: "మధ్యస్థ" },
  Low: { hi: "कम", mr: "कमी", te: "తక్కువ" },
};
function currentLanguage() {
  const stored = localStorage.getItem("terraLanguage") || "en";
  return translations[stored] ? stored : "en";
}
function t(key, replacements = {}) {
  const language = currentLanguage();
  const template = translations[language]?.[key] ?? translations.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    replacements[name] === undefined ? "" : replacements[name],
  );
}
function trText(text) {
  const language = currentLanguage();
  if (language === "en") return text;
  return (
    cropNameTranslations[text]?.[language] ||
    shortTextTranslations[text]?.[language] ||
    text
  );
}
function cropDescription(text) {
  return currentLanguage() === "en" ? text : t("cropGenericDescription");
}
function currentLocale() {
  return languageLocales[currentLanguage()] || languageLocales.en;
}

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
    price: "₹5,335",
    notes: ["Fibre crop", "Rain-fed"],
    description:
      "Steady warmth and generous rain favour this hardy fibre crop.",
  },
  cotton: {
    name: "Cotton",
    image: "randy-fath-dDc0vuVH_LU-unsplash.jpg",
    price: "₹7,120",
    notes: ["Cash crop", "Warm season"],
    description:
      "A warm-season cash crop that rewards well-drained soil and patient management.",
  },
  sugarcane: {
    name: "Sugarcane",
    image: "benjamin-davies-Zm2n2O7Fph4-unsplash.jpg",
    price: "₹355",
    notes: ["Long duration", "Water-loving"],
    description:
      "A long-duration crop for fields with reliable water through the season.",
  },
  chickpea: {
    name: "Chickpea",
    image: "dibakar-roy-Oc1XKN01C7Y-unsplash.jpg.jpeg",
    price: "₹5,440",
    notes: ["Rabi pulse", "Soil builder"],
    description:
      "A rabi pulse that fixes nitrogen while giving a dependable harvest.",
  },
  kidneybeans: {
    name: "Kidney beans",
    image: "gabriel-jimenez-jin4W1HqgL4-unsplash.jpg",
    price: "₹8,500",
    notes: ["Pulse", "Cool season"],
    description:
      "A cool-season pulse that suits mild temperatures and balanced soil.",
  },
  pigeonpeas: {
    name: "Pigeon pea",
    image: "penden-wangchuk-K32tIswSJTc-unsplash.jpg.jpeg",
    price: "₹7,550",
    notes: ["Deep rooted", "Soil builder"],
    description:
      "Deep roots and nitrogen fixation make this pulse a strong rotation anchor.",
  },
  mothbeans: {
    name: "Moth beans",
    image: "dibakar-roy-Oc1XKN01C7Y-unsplash.jpg.jpeg",
    price: "₹7,000",
    notes: ["Drought hardy", "Pulse"],
    description: "One of the most drought-hardy pulses for hot, dry fields.",
  },
  mungbean: {
    name: "Mung bean",
    image: "gabriel-jimenez-jin4W1HqgL4-unsplash.jpg",
    price: "₹8,680",
    notes: ["Short duration", "Soil builder"],
    description:
      "A short-duration pulse that builds soil nitrogen between main crops.",
  },
  blackgram: {
    name: "Black gram",
    image: "dibakar-roy-Oc1XKN01C7Y-unsplash.jpg.jpeg",
    price: "₹7,400",
    notes: ["Pulse", "Low input"],
    description:
      "A low-input pulse that tolerates warm weather and enriches the soil.",
  },
  lentil: {
    name: "Lentil",
    image: "dibakar-roy-Oc1XKN01C7Y-unsplash.jpg.jpeg",
    price: "₹6,700",
    notes: ["Rabi pulse", "Cool season"],
    description:
      "A cool-season pulse for the rabi window with steady market demand.",
  },
  pomegranate: {
    name: "Pomegranate",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: "₹9,000",
    notes: ["Orchard", "High value"],
    description:
      "A high-value orchard crop that tolerates dry spells once established.",
  },
  banana: {
    name: "Banana",
    image: "rod-long-J-ygvQbilXU-unsplash.jpg.jpeg",
    price: "₹2,000",
    notes: ["Year-round", "Moisture-loving"],
    description:
      "Thrives in warm, humid conditions with dependable irrigation.",
  },
  mango: {
    name: "Mango",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: "₹4,500",
    notes: ["Orchard", "Perennial"],
    description:
      "A perennial orchard investment suited to warm seasons and deep soil.",
  },
  grapes: {
    name: "Grapes",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: "₹6,000",
    notes: ["Orchard", "High value"],
    description:
      "A high-value vine crop for well-drained soil and managed irrigation.",
  },
  watermelon: {
    name: "Watermelon",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: "₹1,600",
    notes: ["Summer crop", "Fast return"],
    description: "A fast summer crop that likes warmth and light, sandy soil.",
  },
  muskmelon: {
    name: "Muskmelon",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: "₹2,800",
    notes: ["Summer crop", "Fast return"],
    description: "A quick warm-season melon for light soils and steady sun.",
  },
  apple: {
    name: "Apple",
    image: "frances-gunn-QcBAZ7VREHQ-unsplash.jpg",
    price: "₹8,000",
    notes: ["Temperate", "Orchard"],
    description:
      "A temperate orchard crop for cool climates and chilling winters.",
  },
  orange: {
    name: "Orange",
    image: "megan-thomas-xMh_ww8HN_Q-unsplash.jpg",
    price: "₹4,200",
    notes: ["Citrus", "Orchard"],
    description:
      "A citrus orchard option for mild winters and well-drained soil.",
  },
  papaya: {
    name: "Papaya",
    image: "rod-long-J-ygvQbilXU-unsplash.jpg.jpeg",
    price: "₹2,200",
    notes: ["Fast fruiting", "Warm season"],
    description:
      "A fast-fruiting crop for warm, humid fields with good drainage.",
  },
  coconut: {
    name: "Coconut",
    image: "fauzan-saari-lT7n6V9OGgQ-unsplash.jpg.jpeg",
    price: "₹2,750",
    notes: ["Coastal", "Perennial"],
    description: "A long-lived palm for humid, coastal-style conditions.",
  },
  soybean: {
    name: "Soybean",
    image: "benjamin-davies-Zm2n2O7Fph4-unsplash.jpg",
    price: "₹4,890",
    notes: ["Kharif", "Soil builder"],
    description:
      "A kharif oilseed-pulse that fixes nitrogen while feeding strong demand.",
  },
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
      price: info.price || "—",
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
  const language = currentLanguage();
  document.documentElement.lang = language;
  document.body?.setAttribute("lang", language);
  document.querySelectorAll(".language-picker").forEach((select) => {
    Object.entries(languageLabels).forEach(([code, label]) => {
      let option = select.querySelector(`option[value="${code}"]`);
      if (!option) {
        option = document.createElement("option");
        option.value = code;
        select.appendChild(option);
      }
      option.textContent = label;
    });
    select.value = language;
    select.setAttribute("aria-label", t("chooseLanguage"));
    if (select.dataset.ready) return;
    select.dataset.ready = "true";
    select.addEventListener("change", () => {
      localStorage.setItem("terraLanguage", select.value);
      location.reload();
    });
  });
  applyTranslations();
  localStorage.removeItem("terraTheme");
}
function applyTranslations(root = document) {
  const strings = translations[currentLanguage()] || {};
  root.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = strings[element.dataset.i18nHtml];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (element.dataset.i18nHtml) return;
    if (strings[element.dataset.i18n])
      element.textContent = strings[element.dataset.i18n];
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    if (strings[element.dataset.i18nPlaceholder])
      element.placeholder = strings[element.dataset.i18nPlaceholder];
  });
  root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    if (strings[element.dataset.i18nAriaLabel])
      element.setAttribute("aria-label", strings[element.dataset.i18nAriaLabel]);
  });
  root.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    if (strings[element.dataset.i18nAlt])
      element.setAttribute("alt", strings[element.dataset.i18nAlt]);
  });
  root.querySelectorAll("[data-i18n-data-question]").forEach((element) => {
    if (strings[element.dataset.i18nDataQuestion])
      element.dataset.question = strings[element.dataset.i18nDataQuestion];
  });
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

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const field = Object.fromEntries(new FormData(form));
    Object.keys(field).forEach((key) => (field[key] = Number(field[key])));
    field.forecast = JSON.parse(form.dataset.forecast || "null");
    localStorage.setItem("terraField", JSON.stringify(field));
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
        `<article class="book-page ${index ? "hidden" : ""}" data-page="${index}" style="--crop-image:url('${crop.image}')"><div class="book-image"></div><div class="book-details"><span class="book-rank">0${index + 1} / ${crop.ml ? (index ? "MODEL RUNNER-UP" : "AI MODEL MATCH") : index < 3 ? "FIELD MATCH" : "ROTATION OPTION"}</span><div class="confidence-pie" style="--percent:${crop.confidence}"><b>${crop.confidence}%</b><span>CONFIDENCE</span></div><h3>${crop.name}</h3><p>${crop.description}</p><div class="result-factors">${crop.notes.map((note) => `<span>${note}</span>`).join("")}<span>pH ${field.ph}</span></div><div class="market-box"><span>INDICATIVE MANDI PRICE<b>${crop.price}</b>${crop.unit}</span><a target="_blank" rel="noreferrer" href="https://www.data.gov.in/catalog/current-daily-price-various-commodities-various-markets-mandi">Check live price ↗</a></div></div></article>`,
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
