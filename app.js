const translations = {
  en: {},
  hi: {
    nitrogenUnit: "N · किग्रा/हेक्टेयर",
    phosphorusUnit: "P · किग्रा/हेक्टेयर",
    potassiumUnit: "K · किग्रा/हेक्टेयर",
    phRange: "0–14",
    scanningCardImage: "कार्ड की इमेज स्कैन हो रही है…",
    soilCardPreview: "मिट्टी कार्ड का प्रीव्यू",
    extractedBadge: "✓ मिट्टी के मान निकाले गए! यदि आवश्यक हो तो ऊपर अपने मानों की जांच करें और बदलें।",
    celsiusToday: "°C आज",
    percentToday: "% आज",
    rainfallUnit: "मिमी · 15 दिन",
    previousRecommendation: "पिछला सुझाव",
    nextRecommendation: "अगला सुझाव",
    finishRecording: "रिकॉर्डिंग समाप्त करें",
    locationUnavailable: "स्थान अनुपलब्ध",
    locationPermissionUnavailable: "स्थान की अनुमति अनुपलब्ध",
    weatherServiceUnavailable: "मौसम सेवा अनुपलब्ध",
    sampleValuesReason: "नमूना मान — {reason}",
    cardProcessedPrefill: "कार्ड प्रोसेस हो गया! मिट्टी के मान पहले से भरे गए (110, 45, 55, 6.8)। नीचे जांचें और बदलें।",
    dhaincha: "ढैंचा",
    greenGram: "मूंग",
    cowpea: "लोबिया",
    pigeonPea: "अरहर",
    sorghum: "ज्वार",
    sunflower: "सूरजमुखी",
    keepLegumeRotation: "फसल चक्र में फलीदार फसल रखें",
    dhainchaBenefit: "एक तेज़ हरी खाद वाली फसल जो वायुमंडलीय नाइट्रोजन को स्थिर करती है और मिट्टी में मिलाने पर कार्बनिक पदार्थ जोड़ती है।",
    dhainchaTiming: "मुख्य फसल से पहले उगाएं; फूल आने से पहले मिट्टी में मिलाएं।",
    greenGramBenefit: "कम अवधि की दलहनी फसल जो जैविक रूप से स्थिर नाइट्रोजन बनाने में मदद करती है और उपज भी देती है।",
    greenGramTiming: "कटाई के बाद जड़ों और अवशेषों को खेत में रहने दें।",
    cowpeaNitrogenBenefit: "नकदी फसलों के बीच अंतराल में नाइट्रोजन स्थिरीकरण और जमीन को ढकने के लिए एक मजबूत फलीदार फसल।",
    cowpeaNitrogenTiming: "कवर क्रॉप या हरी खाद के रूप में उपयोग करें।",
    pigeonPeaPhosphorusBenefit: "इसकी गहरी जड़ें और पत्तियों का कूड़ा पोषक चक्र का समर्थन कर सकता है और अगली फसल के लिए जड़ के माहौल में सुधार कर सकता है।",
    pigeonPeaPhosphorusTiming: "कटाई के बाद अवशेषों को मिट्टी में लौटा दें।",
    cowpeaPhosphorusBenefit: "बायोमास जोड़ता है और सक्रिय मिट्टी जीव विज्ञान का समर्थन करता है जो मौजूदा पोषक तत्वों को अधिक उपलब्ध कराने में मदद करता है।",
    cowpeaPhosphorusTiming: "स्थानीय रूप से अनुशंसित फॉस्फोरस संशोधन के साथ प्रयोग करें।",
    sorghumBenefit: "एक गहरी जड़ वाली फसल जो मिट्टी की निचली परतों से पोषक तत्वों को रीसायकल कर सकती है जब इसके अवशेषों को बनाए रखा जाता है।",
    sorghumTiming: "खेत में डंठल या खाद वाले अवशेष छोड़ दें।",
    sunflowerBenefit: "एक गहरी जड़ वाला विकल्प जो गहरी मिट्टी की परतों का पता लगाने और फसल चक्र में विविधता लाने में मदद करता है।",
    sunflowerTiming: "फसल के अवशेष वापस करें; बताए अनुसार पोटाशियम का उपयोग करें।",
    balancedBenefit: "आपका खेत ऐप के अनुसार पोषक तत्वों की कमी नहीं दिखाता है। एक छोटी दलहन या हरी खाद अभी भी मिट्टी के कार्बनिक पदार्थ और नाइट्रोजन चक्र की रक्षा करती है।",
    balancedTiming: "मुख्य फसलों के बीच मूंग, लोबिया या ढैंचा आज़माएं।",
    balancedNote: "आपके N, P और K मान ऐप के अनुसार सही हैं। खेत-विशिष्ट लक्ष्यों के लिए अपना मृदा स्वास्थ्य कार्ड जांचते रहें।",
    restoreNote: "ये फसलें नाइट्रोजन स्थिरीकरण, बायोमास और पोषक चक्र का समर्थन कर सकती हैं। कम फॉस्फोरस या पोटेशियम के लिए, स्थानीय सलाह की पुष्टि करें—फसलें इन पोषक तत्वों को रीसायकल करती हैं लेकिन खनिज नहीं बना सकतीं।",
    scrollToExplore: "एक्सप्लोर करने के लिए स्क्रॉल करें →",
    notificationUnsupported: "यह ब्राउज़र सूचनाओं का समर्थन नहीं करता है।",
    notificationDenied: "टास्क रिमाइंडर प्राप्त करने के लिए अपने ब्राउज़र की सेटिंग में सूचनाओं की अनुमति दें।",
    selectCropPlanAlert: "कैलेंडर देखने के लिए कृपया ऊपर एक फसल योजना चुनें।",
    notificationBody: "इसका समय आ गया है: {task}",
    landPreparationDescription: "खेत को समतल करें और कार्बनिक पदार्थ डालें।",
    seedSowingDescription: "सही गहराई पर स्वस्थ बीज का प्रयोग करें।",
    firstIrrigationDescription: "शुरुआती बढ़वार में नमी बनाए रखें।",
    fertilizerApplicationDescription: "खेत में पानी भरा न होने पर पोषक तत्व डालें।",
    weedControlDescription: "फैलने से पहले प्रतिस्पर्धा करने वाले खरपतवारों को हटा दें।",
    pestInspectionDescription: "पत्तियों के निचले हिस्से और तनों की जांच करें।",
    floweringStageDescription: "फूल आने के दौरान पानी की कमी से बचें।",
    harvestDescription: "पूरी तरह पकने पर काटें और अच्छी तरह सुखा लें।",
    low: "कम",
    rotationOption: "रोटेशन विकल्प",
    modelPick: "मॉडल की पसंद",
    suggestedByModel: "प्रशिक्षित फसल मॉडल द्वारा आपकी रीडिंग के लिए सुझाव।",
    speechUnsupported: "इस ब्राउज़र में स्पीच इनपुट समर्थित नहीं है। आप अभी भी अपना प्रश्न टाइप कर सकते हैं।",
    listeningIn: "{language} में सुन रहा है…",
    capturedAsk: "प्रश्न रिकॉर्ड किया गया। मीता से पूछने के लिए तीर दबाएं।",
    couldNotHear: "मैं वह सुन नहीं सका। कृपया फिर से प्रयास करें या अपना प्रश्न टाइप करें।",
    preparingSpeech: "ऑन-डिवाइस स्पीच मॉडल तैयार किया जा रहा है। पहले डाउनलोड में कुछ मिनट लग सकते हैं…",
    downloadingSpeech: "स्थानीय स्पीच मॉडल डाउनलोड हो रहा है: {progress}%",
    speechReady: "ऑन-डिवाइस {language} स्पीच तैयार है। माइक पर टैप करें, बोलें, और समाप्त करने के लिए फिर से टैप करें।",
    transcribing: "इस डिवाइस पर {language} ट्रांसक्राइब किया जा रहा है…",
    capturedLocally: "प्रश्न स्थानीय रूप से रिकॉर्ड किया गया। मीता से पूछने के लिए तीर दबाएं।",
    notEnoughSpeech: "मुझे पर्याप्त आवाज़ नहीं सुनाई दी। कृपया फिर से प्रयास करें या अपना प्रश्न टाइप करें।",
    speechError: "ऑन-डिवाइस स्पीच शुरू नहीं हो सका: {message}",
    workerError: "स्थानीय स्पीच वर्कर शुरू नहीं हो सका। आप अभी भी अपना प्रश्न टाइप कर सकते हैं।",
    micUnavailable: "यह ब्राउज़र माइक्रोफ़ोन का उपयोग नहीं कर सकता। आप अभी भी अपना प्रश्न टाइप कर सकते हैं।",
    listeningDevice: "इस डिवाइस पर {language} में सुन रहा है… समाप्त करने के लिए माइक पर फिर से टैप करें।",
    micPermission: "माइक्रोफ़ोन अनुमति उपलब्ध नहीं थी। कृपया अनुमति दें, और फिर से प्रयास करें या अपना प्रश्न टाइप करें।",
    speakLonger: "कृपया थोड़ा और बोलें, फिर प्रयास करें।",
    fieldSummaryTitle: "TerraByte खेत सारांश",
    fieldRecommendationSummary: "खेत सुझाव सारांश",
    preparedBy: "TerraByte द्वारा तैयार · {date}",
    printNote: "मिट्टी: N {nitrogen}, P {phosphorus}, K {potassium}, pH {ph}<br>15-दिन की स्थिति: {temperature}°C, {humidity}% नमी, {rainfall}mm अनुमानित बारिश।",
    suggestedCrops: "सुझाई गई फसलें",
    crop: "फसल",
    indicativePrice: "अनुमानित मूल्य",
    printDisclaimer: "कीमतें अनुमानित हैं। बेचने का निर्णय लेने से पहले अपनी निकटतम मंडी की जाँच करें।",
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
    jumpToSection: "विभागाकडे जा",
    nitrogenUnit: "N · किलो/हेक्टर",
    phosphorusUnit: "P · किलो/हेक्टर",
    potassiumUnit: "K · किलो/हेक्टर",
    phRange: "0–14",
    ocrHint: "स्पष्ट JPG किंवा PNG—आम्ही N, P, K आणि pH वाचू.",
    scanningCardImage: "कार्ड इमेज स्कॅन होत आहे…",
    soilCardPreview: "माती कार्ड प्रिव्ह्यू",
    extractedBadge: "✓ मातीची मूल्ये काढली! आवश्यक असल्यास तुमची मूल्ये तपासा आणि बदला.",
    celsiusToday: "°C आज",
    percentToday: "% आज",
    rainfallUnit: "मिमी · 15 दिवस",
    previousRecommendation: "मागील शिफारस",
    nextRecommendation: "पुढील शिफारस",
    weatherCopy: "हवामानाचा अंदाज आम्हाला केवळ आजच नाही, तर पिकाच्या सुरुवातीच्या महत्त्वाच्या आठवड्यांमध्ये उष्णता, आर्द्रता आणि पाऊस समजण्यास मदत करतो.",
    restoreIntro: "आम्ही तुमची पोषक पातळी वाचू आणि पुढील सुधारणा पीक सुचवू.",
    restoreDisclaimer: "या माती सुधारणा पीक पद्धती आहेत—स्थानिक पोषक सल्ल्याचा किंवा आवश्यक बदलांचा पर्याय नाही.",
    finishRecording: "रेकॉर्डिंग संपवा",
    loginCopy: "तुमचे नाव आणि फोन नंबर प्रविष्ट करा. जतन केलेल्या पीक योजना परत आणण्यासाठी आम्ही ते फक्त या ब्राउझरमध्ये वापरू.",
    namePlaceholder: "उदा. मीरा पटेल",
    phonePlaceholder: "10-अंकी मोबाइल नंबर",
    historyNoPlans: "या नंबरसाठी अद्याप कोणतीही जतन केलेली योजना नाही. तुमची पुढील पीक योजना येथे दिसेल.",
    findingField: "शेत शोधत आहे…",
    locationUnavailable: "स्थान अनुपलब्ध",
    locationPermissionUnavailable: "स्थान परवानगी अनुपलब्ध",
    weatherServiceUnavailable: "हवामान सेवा अनुपलब्ध",
    localForecast: "तुमचा स्थानिक 15-दिवसांचा अंदाज",
    sampleValuesReason: "नमुना मूल्ये — {reason}",
    weatherStatusSummary: "आज: {temperature}°C · {humidity}% आर्द्रता · {rainfall}mm अपेक्षित पाऊस",
    forecastAdded: "✓ अंदाज जोडला",
    loadingOcrEngine: "Tesseract OCR इंजिन लोड करत आहे…",
    scanningSoilCard: "Soil Health Card स्कॅन करत आहे…",
    preprocessingImage: "प्रतिमा स्पष्ट करण्यासाठी तयार करत आहे…",
    analyzingValues: "N, P, K आणि pH मजकूर मूल्ये वाचत आहे…",
    scanComplete: "स्कॅन पूर्ण!",
    extractedValues: "✓ {count} मातीची मूल्ये काढली! खाली मूल्ये तपासा आणि बदला.",
    cardProcessedPrefill: "कार्ड प्रोसेस केले! मातीची मूल्ये भरली (110, 45, 55, 6.8). खाली तपासा आणि बदला.",
    prefilledSampleValues: "खाली नमुना मूल्ये भरली आहेत — आवश्यक असल्यास बदला.",
    lowNitrogen: "नायट्रोजन कमी",
    lowPhosphorus: "फॉस्फरस कमी",
    lowPotassium: "पोटॅशियम कमी",
    balancedNutrients: "पोषक घटक संतुलित",
    dhaincha: "धैंचा",
    greenGram: "मूग",
    cowpea: "चवळी",
    pigeonPea: "तूर",
    sorghum: "ज्वारी",
    sunflower: "सूर्यफूल",
    keepLegumeRotation: "पीक पद्धतीत कडधान्य ठेवा",
    dhainchaBenefit: "एक जलद वाढणारे हिरवळीचे खत जे वातावरणातील नायट्रोजन स्थिर करते आणि जमिनीत मिसळल्यावर सेंद्रिय पदार्थ जोडते.",
    dhainchaTiming: "मुख्य पिकाच्या आधी वाढवा; फुलोऱ्याच्या आधी जमिनीत मिसळा.",
    greenGramBenefit: "कमी कालावधीचे कडधान्य जे जैविक दृष्ट्या नायट्रोजन स्थिर करण्यास मदत करते आणि पीकही देते.",
    greenGramTiming: "काढणीनंतर मुळे आणि अवशेष शेतातच राहू द्या.",
    cowpeaNitrogenBenefit: "नायट्रोजन स्थिरीकरण आणि जमिनीला आच्छादन देण्यासाठी एक मजबूत कडधान्य पीक.",
    cowpeaNitrogenTiming: "आच्छादन पीक किंवा हिरवळीचे खत म्हणून वापरा.",
    pigeonPeaPhosphorusBenefit: "याची खोल मुळे आणि पानांचा पालापाचोळा पोषक घटकांचे चक्र सुधारू शकतो आणि पुढील पिकासाठी मुळांचे वातावरण सुधारू शकतो.",
    pigeonPeaPhosphorusTiming: "काढणीनंतर अवशेष जमिनीत परत करा.",
    cowpeaPhosphorusBenefit: "बायोमास जोडते आणि सक्रिय मातीतील जैविक प्रक्रिया सुधारते, ज्यामुळे उपलब्ध पोषक घटक पिकाला मिळण्यास मदत होते.",
    cowpeaPhosphorusTiming: "स्थानिक स्तरावर सुचवलेल्या फॉस्फरस खतासोबत वापरा.",
    sorghumBenefit: "खोल मुळे असलेले पीक जे मातीच्या खालच्या थरांमधून पोषक घटक परत आणू शकते जेव्हा त्याचे अवशेष जमिनीत राखले जातात.",
    sorghumTiming: "शेतात खोड किंवा कंपोस्ट केलेले अवशेष ठेवा.",
    sunflowerBenefit: "एक खोल मुळे असलेला पर्याय जो मातीच्या खालच्या थरांचा शोध घेण्यास आणि पीक पद्धतीत विविधता आणण्यास मदत करतो.",
    sunflowerTiming: "पिकाचे अवशेष परत करा; सांगितल्याप्रमाणे पोटॅशियम खत वापरा.",
    balancedBenefit: "तुमचे शेत ॲपच्या अंदाजानुसार पोषक घटकांची कमतरता दर्शवत नाही. एक लहान कडधान्य किंवा हिरवळीचे खत मातीतील सेंद्रिय पदार्थ आणि नायट्रोजन चक्राचे संरक्षण करते.",
    balancedTiming: "मुख्य पिकांच्या मध्ये मूग, चवळी किंवा धैंचा वापरून पहा.",
    balancedNote: "तुमची N, P आणि K मूल्ये ॲपच्या नियोजनाच्या मर्यादेत आहेत. शेताशी संबंधित अधिक माहितीसाठी तुमचे मृदा आरोग्य कार्ड तपासा.",
    restoreNote: "ही पिके नायट्रोजन स्थिरीकरण, बायोमास आणि पोषक घटकांचे चक्र सुधारण्यास मदत करू शकतात. फॉस्फरस किंवा पोटॅशियमच्या कमतरतेसाठी, स्थानिक सल्ल्याची पुष्टी करा—पिके हे पोषक घटक परत मिळवू शकतात परंतु खनिजे निर्माण करू शकत नाहीत.",
    rainAdvice: "लवकरच पावसाची अपेक्षा आहे. शेतातील पाणी निघेपर्यंत खत देणे पुढे ढकला.",
    dryAdvice: "पुढे कोरडे हवामान आहे. पहाटे सिंचनाचे नियोजन करा.",
    scrollToExplore: "पाहण्यासाठी स्क्रोल करा →",
    farmingTip: "शेती टीप",
    farmingTipText: "पहाटे सिंचन केल्याने बाष्पीभवनाचे नुकसान कमी होते.",
    remindersEnabled: "रिमाइंडर चालू केले",
    enableTaskReminders: "कामाचे रिमाइंडर चालू करा",
    reminderNote: "हा डॅशबोर्ड खुला असताना ऑन-डिव्हाइस रिमाइंडर काम करतात.",
    notificationUnsupported: "हा ब्राउझर सूचनांना समर्थन देत नाही.",
    notificationDenied: "टास्क रिमाइंडर प्राप्त करण्यासाठी तुमच्या ब्राउझर सेटिंग्जमध्ये सूचनांना परवानगी द्या.",
    selectCropPlanAlert: "कॅलेंडर पाहण्यासाठी कृपया वर पीक योजना निवडा.",
    notificationBody: "याची वेळ झाली आहे: {task}",
    landPreparation: "जमिनीची तयारी",
    landPreparationDescription: "शेत समतल करा आणि सेंद्रिय खत घाला.",
    seedSowing: "बीज पेरणी",
    seedSowingDescription: "योग्य खोलीवर निरोगी बियाणे वापरा.",
    firstIrrigation: "पहिले सिंचन",
    firstIrrigationDescription: "सुरुवातीच्या वाढीच्या वेळी ओलावा टिकवून ठेवा.",
    fertilizerApplication: "खत देणे",
    fertilizerApplicationDescription: "शेतात पाणी साचले नसताना खत द्या.",
    weedControl: "तण नियंत्रण",
    weedControlDescription: "तण पसरण्यापूर्वी ते काढून टाका.",
    pestInspection: "कीड तपासणी",
    pestInspectionDescription: "पानांची खालची बाजू आणि देठ तपासा.",
    floweringStage: "फुलोऱ्याची अवस्था",
    floweringStageDescription: "फुलोऱ्याच्या वेळी पाण्याचा ताण टाळा.",
    harvest: "काढणी",
    harvestDescription: "पूर्ण परिपक्व झाल्यावर काढणी करा आणि चांगले वाळवा.",
    irrigateField: "शेताला पाणी द्या",
    inspectPests: "किडींसाठी तपासा",
    applyNitrogen: "नायट्रोजन खत द्या",
    low: "कमी",
    modelRunnerUp: "मॉडेल रनर-अप",
    aiModelMatch: "AI मॉडेल जुळणी",
    fieldMatch: "शेत जुळणी",
    rotationOption: "रोटेशन पर्याय",
    modelPick: "मॉडेलची निवड",
    suggestedByModel: "प्रशिक्षित पीक मॉडेलद्वारे तुमच्या मोजमापांसाठी सुचवले.",
    speechUnsupported: "या ब्राउझरमध्ये स्पीच इनपुट समर्थित नाही. तुम्ही अद्याप तुमचा प्रश्न टाइप करू शकता.",
    listeningIn: "{language} मध्ये ऐकत आहे…",
    capturedAsk: "प्रश्न रेकॉर्ड केला. मिताला विचारण्यासाठी बाण दाबा.",
    couldNotHear: "मी ते ऐकू शकलो नाही. कृपया पुन्हा प्रयत्न करा किंवा तुमचा प्रश्न टाइप करा.",
    preparingSpeech: "ऑन-डिव्हाइस स्पीच मॉडेल तयार करत आहे. पहिल्या डाउनलोडला काही मिनिटे लागू शकतात…",
    downloadingSpeech: "स्थानिक स्पीच मॉडेल डाउनलोड करत आहे: {progress}%",
    speechReady: "ऑन-डिव्हाइस {language} स्पीच तयार आहे. माइकवर टॅप करा, बोला आणि पूर्ण करण्यासाठी पुन्हा टॅप करा.",
    transcribing: "या डिव्हाइसवर {language} ट्रान्सक्राइब करत आहे…",
    capturedLocally: "प्रश्न स्थानिक पातळीवर रेकॉर्ड केला. मिताला विचारण्यासाठी बाण दाबा.",
    notEnoughSpeech: "मला पुरेसा आवाज ऐकू आला नाही. कृपया पुन्हा प्रयत्न करा किंवा तुमचा प्रश्न टाइप करा.",
    speechError: "ऑन-डिव्हाइस स्पीच सुरू होऊ शकले नाही: {message}",
    workerError: "स्थानिक स्पीच वर्कर सुरू होऊ शकला नाही. तुम्ही अद्याप तुमचा प्रश्न टाइप करू शकता.",
    micUnavailable: "हा ब्राउझर मायक्रोफोनमध्ये प्रवेश करू शकत नाही. तुम्ही अद्याप तुमचा प्रश्न टाइप करू शकता.",
    listeningDevice: "या डिव्हाइसवर {language} मध्ये ऐकत आहे… पूर्ण केल्यावर माइक पुन्हा टॅप करा.",
    micPermission: "मायक्रोफोन परवानगी उपलब्ध नव्हती. कृपया परवानगी द्या, आणि पुन्हा प्रयत्न करा किंवा तुमचा प्रश्न टाइप करा.",
    speakLonger: "कृपया थोडे जास्त वेळ बोला, नंतर पुन्हा प्रयत्न करा.",
    useSpeech: "{language} मध्ये ऑन-डिव्हाइस स्पीच वापरा. मॉडेल एकदा डाउनलोड केले जाते आणि ऑफलाइन वापरासाठी कॅशे केले जाते.",
    fieldSummaryTitle: "TerraByte शेत सारांश",
    fieldRecommendationSummary: "शेत शिफारस सारांश",
    preparedBy: "TerraByte द्वारे तयार केले · {date}",
    printNote: "माती: N {nitrogen}, P {phosphorus}, K {potassium}, pH {ph}<br>15-दिवसांची परिस्थिती: {temperature}°C, {humidity}% आर्द्रता, {rainfall}mm अपेक्षित पाऊस.",
    suggestedCrops: "सुचवलेली पिके",
    crop: "पीक",
    indicativePrice: "अंदाजित किंमत",
    printDisclaimer: "किमती अंदाजित आहेत. विक्रीचा निर्णय घेण्यापूर्वी तुमच्या जवळच्या मंडीमध्ये तपासा.",
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
    jumpToSection: "విభాగానికి వెళ్ళండి",
    humanNote: "కొన్ని నిజమైన రీడింగులు. స్పష్టమైన తదుపరి దశ. మేము గణాంకాలను ఉపయోగకరంగా చేస్తాము.",
    nitrogenUnit: "N · కిలో/హెక్టార్",
    phosphorusUnit: "P · కిలో/హెక్టార్",
    potassiumUnit: "K · కిలో/హెక్టార్",
    phRange: "0–14",
    dropCard: "మీ సాయిల్ హెల్త్ కార్డ్ ఫోటోను ఇక్కడ వేయండి",
    ocrHint: "స్పష్టమైన JPG లేదా PNG—మేము N, P, K మరియు pHలను చదువుతాము.",
    scanningCardImage: "కార్డ్ ఇమేజ్ స్కాన్ అవుతోంది…",
    soilCardPreview: "మట్టి కార్డ్ ప్రివ్యూ",
    extractedBadge: "✓ మట్టి విలువలు సేకరించబడ్డాయి! అవసరమైతే మీ విలువలను సరిచూసుకోండి.",
    celsiusToday: "°C ఈ రోజు",
    percentToday: "% ఈ రోజు",
    rainfallUnit: "మి.మీ · 15 రోజులు",
    previousRecommendation: "గత సూచన",
    nextRecommendation: "తదుపరి సూచన",
    weatherCopy: "వాతావరణ సూచన ఈ రోజు మాత్రమే కాదు, పంట పెరిగే ప్రారంభ దశలలో ఉష్ణోగ్రత, తేమ మరియు వర్షపాతాన్ని అంచనా వేయడానికి సహాయపడుతుంది.",
    restoreIntro: "మేము మీ పోషకాల స్థాయిని విశ్లేషించి, మట్టిని బాగుచేసే తదుపరి పంటను సూచిస్తాము.",
    restoreDisclaimer: "ఇవి మట్టిని మెరుగుపరిచే పంటల విధానాలు—స్థానిక పోషకాల సలహాకు ప్రత్యామ్నాయం కాదు.",
    finishRecording: "రికార్డింగ్ ముగించండి",
    loginCopy: "మీ పేరు మరియు ఫోన్ నంబర్‌ను నమోదు చేయండి. మీ సేవ్ చేసిన పొలం ప్లాన్‌లను తిరిగి తీసుకురావడానికి మేము వీటిని ఈ బ్రౌజర్‌లో మాత్రమే ఉపయోగిస్తాము.",
    namePlaceholder: "ఉదా. మీరా పటేల్",
    phonePlaceholder: "10-అంకెల మొబైల్ నంబర్",
    historyNoPlans: "ఈ నంబర్‌కు ఇంకా సేవ్ చేసిన ప్లాన్‌లు లేవు. మీ తదుపరి పొలం ప్లాన్ ఇక్కడ కనిపిస్తుంది.",
    findingField: "పొలాన్ని వెతుకుతోంది…",
    locationUnavailable: "స్థానం అందుబాటులో లేదు",
    locationPermissionUnavailable: "స్థానం అనుమతి అందుబాటులో లేదు",
    weatherServiceUnavailable: "వాతావరణ సేవ అందుబాటులో లేదు",
    localForecast: "మీ స్థానిక 15-రోజుల అంచనా",
    sampleValuesReason: "నమూనా విలువలు — {reason}",
    weatherStatusSummary: "ఈ రోజు: {temperature}°C · {humidity}% తేమ · {rainfall}mm అంచనా వర్షపాతం",
    forecastAdded: "✓ వాతావరణ అంచనా జోడించబడింది",
    loadingOcrEngine: "Tesseract OCR ఇంజిన్ లోడ్ అవుతోంది…",
    scanningSoilCard: "Soil Health Card స్కాన్ అవుతోంది…",
    preprocessingImage: "స్పష్టత కోసం ఇమేజ్ ప్రిపేర్ అవుతోంది…",
    analyzingValues: "N, P, K మరియు pH టెక్స్ట్ విలువలను విశ్లేషిస్తోంది…",
    scanComplete: "స్కాన్ పూర్తయింది!",
    extractedValues: "✓ {count} మట్టి విలువలు సేకరించబడ్డాయి! క్రింద సమీక్షించి మార్చుకోండి.",
    cardProcessedPrefill: "కార్డ్ ప్రాసెస్ చేయబడింది! మట్టి విలువలు నింపబడ్డాయి (110, 45, 55, 6.8). క్రింద సరిచూసుకోండి.",
    prefilledSampleValues: "క్రింద నమూనా విలువలు నింపబడ్డాయి — అవసరమైతే మార్చండి.",
    lowNitrogen: "నైట్రోజన్ తక్కువ",
    lowPhosphorus: "ఫాస్పరస్ తక్కువ",
    lowPotassium: "పొటాషియం తక్కువ",
    balancedNutrients: "పోషకాలు సమతుల్యంగా ఉన్నాయి",
    dhaincha: "జనుము",
    greenGram: "పెసర",
    cowpea: "అలసంద",
    pigeonPea: "కంది",
    sorghum: "జొన్న",
    sunflower: "పొద్దుతిరుగుడు",
    keepLegumeRotation: "పంట మార్పిడిలో పప్పుధాన్యం ఉంచండి",
    dhainchaBenefit: "వాతావరణంలోని నైట్రోజన్‌ను స్థిరీకరించి, మట్టిలో కలిపినప్పుడు సేంద్రియ పదార్థాలను చేర్చే వేగంగా పెరిగే పచ్చిరొట్ట ఎరువు.",
    dhainchaTiming: "ప్రధాన పంటకు ముందు పెంచండి; పూతకు ముందు మట్టిలో కలపండి.",
    greenGramBenefit: "జైవికంగా నైట్రోజన్‌ను స్థిరీకరించడానికి సహాయపడే తక్కువ కాల వ్యవధి గల పప్పుధాన్యం పంట.",
    greenGramTiming: "కోత తర్వాత వేర్లు మరియు అవశేషాలను పొలంలోనే ఉంచండి.",
    cowpeaNitrogenBenefit: "ప్రధాన పంటల మధ్య విరామంలో నైట్రోజన్ స్థిరీకరణ మరియు నేలను కప్పడానికి ఒక బలమైన పంట.",
    cowpeaNitrogenTiming: "నేలను కప్పే పంటగా లేదా పచ్చిరొట్ట ఎరువుగా వాడండి.",
    pigeonPeaPhosphorusBenefit: "దీని లోతైన వేర్లు మరియు రాలిన ఆకులు పోషకాల చక్రాన్ని మెరుగుపరిచి, తదుపరి పంటకు అనుకూలమైన వాతావరణాన్ని అందిస్తాయి.",
    pigeonPeaPhosphorusTiming: "కోత తర్వాత అవశేషాలను మట్టిలో కలపండి.",
    cowpeaPhosphorusBenefit: "మట్టిలో సూక్ష్మజీవుల చర్యను మెరుగుపరిచి, పోషకాలను మొక్కలకు సులభంగా అందేలా చేస్తుంది.",
    cowpeaPhosphorusTiming: "స్థానికంగా సూచించిన ఫాస్పరస్ ఎరువులతో కలిపి వాడండి.",
    sorghumBenefit: "లోతైన వేర్లు కలిగిన పంట. దీని అవశేషాలను ఉంచినప్పుడు మట్టి లోపలి పొరల నుండి పోషకాలను తిరిగి తీసుకువస్తుంది.",
    sorghumTiming: "కాండాలను లేదా కంపోస్ట్ చేసిన అవశేషాలను పొలంలో వదిలివేయండి.",
    sunflowerBenefit: "మట్టిలోని లోతైన పొరలను వాడుకునే పంట. ఇది పంట మార్పిడికి మంచి ఎంపిక.",
    sunflowerTiming: "పంట అవశేషాలను మట్టిలో కలపండి; సూచించిన విధంగా పొటాషియం వాడండి.",
    balancedBenefit: "యాప్ అంచనాల ప్రకారం మీ పొలంలో పోషకాల కొరత లేదు. అయినా కూడా, చిన్న పప్పుధాన్యం లేదా పచ్చిరొట్ట ఎరువు మట్టిలోని సేంద్రియ పదార్థాలను మరియు నైట్రోజన్ చక్రాన్ని కాపాడుతుంది.",
    balancedTiming: "ప్రధాన పంటల మధ్య పెసర, అలసంద లేదా జనుమును ప్రయత్నించండి.",
    balancedNote: "మీ N, P మరియు K విలువలు యాప్ ప్రణాళిక పరిధిలో ఉన్నాయి. పొలం-నిర్దిష్ట లక్ష్యాల కోసం మీ సాయిల్ హెల్త్ కార్డ్‌ని గమనిస్తూ ఉండండి.",
    restoreNote: "ఈ పంటలు నైట్రోజన్ స్థిరీకరణ మరియు పోషకాల చక్రాన్ని మెరుగుపరుస్తాయి. ఫాస్పరస్ లేదా పొటాషియం తక్కువగా ఉంటే, స్థానిక సలహా తీసుకోండి—పంటలు ఈ పోషకాలను తిరిగి తీసుకురాగలవు కానీ కొత్తగా ఉత్పత్తి చేయలేవు.",
    rainAdvice: "త్వరలో వర్షం కురిసే అవకాశం ఉంది. పొలం నుండి నీరు పోయే వరకు ఎరువులు వేయడం ఆపండి.",
    dryAdvice: "పొడి వాతావరణం రాబోతోంది. ఉదయం పూట నీరు పెట్టడానికి ప్రణాళిక చేసుకోండి.",
    scrollToExplore: "అన్వేషించడానికి స్క్రోల్ చేయండి →",
    farmingTip: "వ్యవసాయ చిట్కా",
    farmingTipText: "ఉదయం పూట నీరు పెట్టడం వలన బాష్పీభవన నష్టాలు తగ్గుతాయి.",
    remindersEnabled: "రిమైండర్‌లు ఆన్ చేయబడ్డాయి",
    enableTaskReminders: "పనుల రిమైండర్‌లను ఆన్ చేయండి",
    reminderNote: "ఈ డాష్‌బోర్డ్ తెరిచి ఉన్నంత సేపు ఆన్-డివైస్ రిమైండర్‌లు పనిచేస్తాయి.",
    notificationUnsupported: "ఈ బ్రౌజర్ నోటిఫికేషన్‌లకు మద్దతు ఇవ్వదు.",
    notificationDenied: "పనుల రిమైండర్‌లను పొందడానికి మీ బ్రౌజర్ సెట్టింగ్‌లలో నోటిఫికేషన్‌లను అనుమతించండి.",
    selectCropPlanAlert: "క్యాలెండర్‌ని చూడటానికి దయచేసి పైన పంట ప్రణాళికను ఎంచుకోండి.",
    notificationBody: "దీనికి సమయం ఆసన్నమైంది: {task}",
    landPreparation: "భూమి తయారీ",
    landPreparationDescription: "పొలాన్ని చదును చేసి, సేంద్రియ ఎరువులు వేయండి.",
    seedSowing: "విత్తనాలు నాటడం",
    seedSowingDescription: "సరైన లోతులో నాణ్యమైన విత్తనాలను నాటండి.",
    firstIrrigation: "మొదటి నీటిపారుదల",
    firstIrrigationDescription: "ప్రారంభ దశలో సమానంగా తేమ ఉండేలా చూసుకోండి.",
    fertilizerApplication: "ఎరువులు వేయడం",
    fertilizerApplicationDescription: "పొలంలో నీరు నిలిచి ఉండనప్పుడు ఎరువులు వేయండి.",
    weedControl: "కలుపు నివారణ",
    weedControlDescription: "కలుపు మొక్కలు పెరగకముందే వాటిని తొలగించండి.",
    pestInspection: "తెగుళ్ళ తనిఖీ",
    pestInspectionDescription: "ఆకుల క్రింది భాగం మరియు కాండాలను తనిఖీ చేయండి.",
    floweringStage: "పూత దశ",
    floweringStageDescription: "పూత సమయంలో నీటి కొరత లేకుండా చూసుకోండి.",
    harvest: "పంట కోత",
    harvestDescription: "పంట పూర్తిగా పండిన తర్వాత కోసి బాగా ఆరబెట్టండి.",
    irrigateField: "పొలానికి నీరు పెట్టండి",
    inspectPests: "తెగుళ్ళ కోసం తనిఖీ చేయండి",
    applyNitrogen: "నైట్రోజన్ ఎరువు వేయండి",
    low: "తక్కువ",
    modelRunnerUp: "మోడల్ రన్నర్-అప్",
    aiModelMatch: "AI మోడల్ మ్యాచ్",
    fieldMatch: "ఫీల్డ్ మ్యాచ్",
    rotationOption: "రొటేషన్ ఆప్షన్",
    modelPick: "మోడల్ ఎంపిక",
    suggestedByModel: "మీ రీడింగుల ఆధారంగా మా శిక్షణ పొందిన మోడల్ సూచించినది.",
    speechUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్‌కు మద్దతు లేదు. మీరు ఇంకా మీ ప్రశ్నను టైప్ చేయవచ్చు.",
    listeningIn: "{language} లో వింటుంది…",
    capturedAsk: "ప్రశ్న రికార్డ్ చేయబడింది. మీతాను అడగడానికి బాణం నొక్కండి.",
    couldNotHear: "నాకు సరిగ్గా వినిపించలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి లేదా టైప్ చేయండి.",
    preparingSpeech: "ఆన్-డివైస్ స్పీచ్ మోడల్ సిద్ధం అవుతోంది. మొదటి డౌన్‌లోడ్‌కి కొన్ని నిమిషాలు పట్టవచ్చు…",
    downloadingSpeech: "లోకల్ స్పీచ్ మోడల్ డౌన్‌లోడ్ అవుతోంది: {progress}%",
    speechReady: "ఆన్-డివైస్ {language} స్పీచ్ సిద్ధంగా ఉంది. మైక్‌ను నొక్కండి, మాట్లాడండి, మరియు పూర్తి చేయడానికి మళ్ళీ నొక్కండి.",
    transcribing: "ఈ డివైస్‌లో {language} అనువదిస్తోంది…",
    capturedLocally: "ప్రశ్న లోకల్‌గా రికార్డ్ చేయబడింది. మీతాను అడగడానికి బాణం నొక్కండి.",
    notEnoughSpeech: "నాకు స్పష్టంగా వినిపించలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి లేదా టైప్ చేయండి.",
    speechError: "ఆన్-డివైస్ స్పీచ్ ప్రారంభం కాలేదు: {message}",
    workerError: "లోకల్ స్పీచ్ వర్కర్ ప్రారంభం కాలేదు. మీరు ఇంకా మీ ప్రశ్నను టైప్ చేయవచ్చు.",
    micUnavailable: "ఈ బ్రౌజర్ మైక్రోఫోన్‌ను యాక్సెస్ చేయలేకపోతోంది. మీరు ఇంకా మీ ప్రశ్నను టైప్ చేయవచ్చు.",
    listeningDevice: "ఈ డివైస్‌లో {language} లో వింటుంది… పూర్తయ్యాక మైక్‌ను మళ్ళీ నొక్కండి.",
    micPermission: "మైక్రోఫోన్ అనుమతి లేదు. దయచేసి అనుమతించండి, ఆపై మళ్ళీ ప్రయత్నించండి లేదా టైప్ చేయండి.",
    speakLonger: "దయచేసి ఇంకొంచెం సేపు మాట్లాడండి, ఆపై మళ్ళీ ప్రయత్నించండి.",
    useSpeech: "{language} లో ఆన్-డివైస్ స్పీచ్ వాడండి. మోడల్ ఒకసారి డౌన్‌లోడ్ అయి ఆఫ్‌లైన్ వాడకానికి సేవ్ అవుతుంది.",
    fieldSummaryTitle: "TerraByte పొలం సారాంశం",
    fieldRecommendationSummary: "పొలం సూచనల సారాంశం",
    preparedBy: "TerraByte ద్వారా సిద్ధం చేయబడింది · {date}",
    printNote: "మట్టి: N {nitrogen}, P {phosphorus}, K {potassium}, pH {ph}<br>15-రోజుల వాతావరణం: {temperature}°C, {humidity}% తేమ, {rainfall}mm అంచనా వర్షపాతం.",
    suggestedCrops: "సూచించిన పంటలు",
    crop: "పంట",
    indicativePrice: "అంచనా ధర",
    printDisclaimer: "ధరలు అంచనా మాత్రమే. అమ్మే ముందు మీ దగ్గరి మండీలో సరిచూసుకోండి.",
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
    titleDisease: "Crop disease check — TerraByte",
    disease: "Disease check",
    checkDisease: "Check crop disease",
    diseaseKicker: "CROP HEALTH",
    diseaseTitle: "Spot leaf trouble<br><em>early.</em>",
    diseaseNote: "One clear photo can save a season. Let’s look at that leaf together.",
    diseaseIntro: "Upload a photo of an affected leaf and we’ll help you work out what’s going on and what to do next.",
    diseaseNewCheck: "NEW CROP CHECK",
    diseaseHeading: "Check a crop photo",
    uploadPhoto: "Upload a photo",
    leafHint: "A close-up of one affected leaf in good daylight works best.",
    dropLeaf: "Drop a photo of the affected leaf",
    leafFormats: "A JPG or PNG straight from your phone camera is fine.",
    leafPreviewAlt: "Leaf photo preview",
    diseaseResults: "Results",
    diseaseResultsHint: "What we find in your photo will appear here.",
    checkPhoto: "Check this photo",
    removePhoto: "Remove photo",
    diseaseAnalyzing: "Checking your photo…",
    diseaseError: "Could not check the photo. Please check your internet connection and try again.",
    diseaseHealthyLabel: "looks healthy",
    diseaseAlsoPossible: "Also possible:",
    diseaseHealthyAdvice: "No disease signs found in this photo. Keep an eye on new growth and check again if you spot changes.",
    diseaseSickAdvice: "This looks like {condition}. Remove badly affected leaves, avoid overhead watering, and confirm treatment with your local agri office before spraying.",
    diseaseLowConfidence: "Not fully sure about this one — try a closer photo of a single leaf in good daylight.",
    askMitaAboutIt: "Ask Mita about it →",
    diseasePrivacy: "Your photo stays on this device for now. Results are guidance, not a replacement for local agricultural advice.",
    plan: "Plan a field",
    dashboard: "Dashboard",
    ask: "Ask KrishiSahayak",
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
    growth: "Growth planner",
    planGrowth: "Plan your season's growth",
    growthKicker: "GROWTH PLANNER",
    growthTitle: "Map the season<br>before you <em>sow.</em>",
    growthNote: "One plan for the whole crop — what to do, when to do it, and what it will cost.",
    growthIntro: "Tell us about your land, water and goal. We'll draft a stage-by-stage plan with dates, costs and labour needs.",
    growthStep1: "Describe your farm",
    growthStep2: "Pick what matters most",
    growthStep3: "Get your season plan",
    growthNewPlan: "NEW SEASON PLAN",
    growthHeading: "Plan your season",
    farmBasics: "Farm basics",
    farmBasicsHint: "Your land, your sowing window, and the hands you already have.",
    landSize: "Land size",
    acresUnit: "acres",
    sowingDate: "Sowing date",
    sowingHint: "when you plan to sow",
    ownLabour: "Family labour",
    ownLabourUnit: "days · optional",
    waterSetup: "Water setup",
    waterSetupHint: "How the field drinks — rainfall plus any irrigation you have.",
    growthRainfall: "Seasonal rainfall",
    growthRainfallUnit: "mm expected this season",
    cropChoice: "Crop to plan",
    cropChoiceHint: "or let us suggest one",
    cropAuto: "Suggest the best match",
    goalSection: "What matters most?",
    goalHint: "We'll weigh crops differently depending on your goal.",
    goalProfit: "Maximum profit",
    goalProfitHint: "Chase the best net income",
    goalSafe: "Safest bet",
    goalSafeHint: "Steady prices, MSP-backed",
    goalWater: "Save water",
    goalWaterHint: "Thrifty crops for dry fields",
    goalCapital: "Low investment",
    goalCapitalHint: "Keep upfront costs small",
    buildPlan: "Build my growth plan",
    growthPrivacy: "Estimates use indicative input costs and mandi prices. Confirm rates locally before spending — this is guidance, not a replacement for local agricultural advice.",
    sourceRainfed: "Rainfed only",
    sourceWell: "Open well",
    sourceBorewell: "Borewell",
    sourceCanal: "Canal",
    sourceDrip: "Drip system",
    addsWater: "adds up to {mm} mm",
    dripBonus: "uses {percent}% less water",
    topMatches: "Top matches for your field",
    topMatchesHint: "Tap a crop to see its full season plan below.",
    matchNet: "est. net",
    mspBadge: "MSP",
    offSeason: "off-season",
    waterTight: "water short",
    groupCereal: "Cereal",
    groupPulse: "Pulse",
    groupCash: "Cash crop",
    groupVegetable: "Vegetable",
    groupCucurbit: "Melon / cucurbit",
    groupPerennial: "Perennial / orchard",
    seasonPlanKicker: "SEASON PLAN",
    season_kharif: "Kharif · sow Jun–Aug",
    season_rabi: "Rabi · sow Oct–Dec",
    season_zaid: "Zaid · sow Jan–Mar",
    estSpend: "Estimated spend",
    estRevenue: "Expected revenue",
    estNet: "Expected net",
    breakEven: "Break-even price",
    waterCheckTitle: "Water check",
    waterCheckCopy: "This crop needs about {need} mm of water. Rainfall gives {rain} mm and your irrigation can add up to {extra} mm.",
    waterRain: "rainfall",
    waterIrrigation: "your irrigation",
    waterNeed: "crop need",
    waterOkMsg: "Water looks sufficient for this crop.",
    waterShortMsg: "Water may run short — consider a thriftier crop or extra irrigation.",
    stageWhen: "When",
    stageWork: "Stage",
    stageCost: "Est. cost",
    stageLabour: "Labour",
    daysUnit: "days",
    perennialNote: "Perennial crop: about ₹{cost} per acre to establish, first real income around year {year}, then productive for ~{span} years. Figures above are for a mature planting.",
    harvestNote: "Expected harvest: about {qtl} quintals around {date}, at an indicative price of ₹{price} per quintal.",
    labourNote: "Needs about {total} labour days; roughly {hired} hired days beyond your family labour, costing about ₹{cost}.",
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
    askMitaSoil: "Ask KrishiSahayak About Soil",
    fieldAdvisor: "YOUR FARM ADVISOR",
    askTitle: "Ask KrishiSahayak anything<br>about your farm.",
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
      "Log in with your phone number and PIN, or create a free account to save your field plans.",
    loginTab: "Log in",
    registerTab: "Create account",
    pin: "PIN",
    choosePin: "Choose a PIN",
    confirmPin: "Confirm PIN",
    newPin: "New PIN",
    registerButton: "Create my account",
    forgotPin: "Forgot PIN?",
    orDivider: "or",
    skipForNow: "Skip for now",
    phoneStepTitle: "Add your phone number so your field plans are saved to you.",
    phoneStepSave: "Save phone number",
    pinStepTitle: "Set a new PIN for logging in with your phone number.",
    pinStepSave: "Save new PIN",
    signedInAs: "Signed in as",
    changePin: "Change PIN",
    addPhone: "Add phone number",
    logout: "Log out",
    linkGoogleHint: "Link your Google account below to reset a forgotten PIN later.",
    err_forgot_pin_hint: "Sign in with Google below to reset your PIN.",
    err_bad_credentials: "Phone number, username or PIN is incorrect.",
    err_duplicate_phone: "This phone number is already registered. Try logging in.",
    err_pin_mismatch: "PINs do not match.",
    err_invalid_phone: "Enter a valid 10-digit phone number.",
    err_invalid_pin: "PIN must be exactly 4 digits.",
    err_invalid_username: "Enter your name.",
    err_google_failed: "Google sign-in failed. Please try again.",
    err_google_account: "This account signs in with Google.",
    err_google_unconfigured: "Google sign-in is not available.",
    err_google_taken: "This Google account is already linked to another profile.",
    err_not_signed_in: "Please log in again.",
    err_network: "Could not reach the server. Please try again.",
    accountDetails: "Account details",
    emailLabel: "Email",
    memberSince: "Member since",
    signInMethods: "Sign-in methods",
    notSet: "Not set",
    editProfile: "Edit profile",
    saveChanges: "Save changes",
    cancelEdit: "Cancel",
    security: "Security",
    setPin: "Set PIN",
    pinSaved: "PIN saved.",
    profileSaved: "Profile updated.",
    deleteProfile: "Delete profile",
    deleteConfirmMsg:
      "Delete your profile permanently? Saved plans on this device will also be removed.",
    savedPlans: "Saved field plans",
    addPhoneForHistory: "Add a phone number to save your field plans.",
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
    titleDisease: "फसल रोग जांच — TerraByte",
    disease: "रोग जांच",
    checkDisease: "फसल रोग जांचें",
    diseaseKicker: "फसल स्वास्थ्य",
    diseaseTitle: "पत्तों की परेशानी<br><em>जल्दी पकड़ें।</em>",
    diseaseNote: "एक साफ फोटो पूरा मौसम बचा सकती है। आइए उस पत्ते को साथ मिलकर देखें।",
    diseaseIntro: "प्रभावित पत्ते की फोटो अपलोड करें — हम समझने में मदद करेंगे कि क्या हो रहा है और आगे क्या करना है।",
    diseaseNewCheck: "नई फसल जांच",
    diseaseHeading: "फसल की फोटो जांचें",
    uploadPhoto: "फोटो अपलोड करें",
    leafHint: "अच्छी धूप में एक प्रभावित पत्ते की पास से ली गई फोटो सबसे अच्छी रहती है।",
    dropLeaf: "प्रभावित पत्ते की फोटो यहां डालें",
    leafFormats: "फोन कैमरे से ली गई JPG या PNG फोटो चलेगी।",
    leafPreviewAlt: "पत्ते की फोटो का पूर्वावलोकन",
    diseaseResults: "परिणाम",
    diseaseResultsHint: "आपकी फोटो में जो मिलेगा, वह यहां दिखेगा।",
    checkPhoto: "यह फोटो जांचें",
    removePhoto: "फोटो हटाएं",
    diseaseAnalyzing: "आपकी फोटो जांची जा रही है…",
    diseaseError: "फोटो जांच नहीं हो सकी। कृपया अपना इंटरनेट कनेक्शन देखें और फिर से कोशिश करें।",
    diseaseHealthyLabel: "स्वस्थ दिख रहा है",
    diseaseAlsoPossible: "यह भी संभव:",
    diseaseHealthyAdvice: "इस फोटो में रोग के लक्षण नहीं मिले। नई पत्तियों पर नज़र रखें और बदलाव दिखे तो फिर से जांचें।",
    diseaseSickAdvice: "यह {condition} जैसा दिखता है। ज़्यादा प्रभावित पत्ते हटाएं, ऊपर से पानी देने से बचें, और छिड़काव से पहले स्थानीय कृषि कार्यालय से उपचार की पुष्टि करें।",
    diseaseLowConfidence: "इस पर पूरा भरोसा नहीं है — अच्छी रोशनी में एक पत्ते की पास से फोटो लेकर फिर कोशिश करें।",
    askMitaAboutIt: "मीता से इस बारे में पूछें →",
    diseasePrivacy: "आपकी फोटो अभी इसी डिवाइस पर रहती है। परिणाम केवल मार्गदर्शन हैं, स्थानीय कृषि सलाह का विकल्प नहीं।",
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
    growth: "ग्रोथ प्लानर",
    planGrowth: "अपने सीज़न की योजना बनाएं",
    growthKicker: "ग्रोथ प्लानर",
    growthTitle: "बुवाई से पहले<br>पूरा <em>मौसम देखें।</em>",
    growthNote: "पूरी फसल की एक योजना — क्या करना है, कब करना है, और कितना खर्च होगा।",
    growthIntro: "अपनी ज़मीन, पानी और लक्ष्य बताइए। हम तारीखों, खर्च और मज़दूरी के साथ चरण-दर-चरण योजना बनाएंगे।",
    growthStep1: "अपना खेत बताएं",
    growthStep2: "अपनी प्राथमिकता चुनें",
    growthStep3: "सीज़न योजना पाएं",
    growthNewPlan: "नई सीज़न योजना",
    growthHeading: "अपने सीज़न की योजना",
    farmBasics: "खेत की जानकारी",
    farmBasicsHint: "आपकी ज़मीन, बुवाई का समय और घर की मज़दूरी।",
    landSize: "ज़मीन",
    acresUnit: "एकड़",
    sowingDate: "बुवाई की तारीख",
    sowingHint: "कब बोने की योजना है",
    ownLabour: "घर की मज़दूरी",
    ownLabourUnit: "दिन · वैकल्पिक",
    waterSetup: "पानी की व्यवस्था",
    waterSetupHint: "बारिश और आपकी सिंचाई मिलाकर खेत को कितना पानी मिलेगा।",
    growthRainfall: "मौसमी वर्षा",
    growthRainfallUnit: "मिमी · इस सीज़न अनुमानित",
    cropChoice: "कौन सी फसल",
    cropChoiceHint: "या हमें सुझाने दें",
    cropAuto: "सबसे अच्छा मेल सुझाएं",
    goalSection: "सबसे ज़रूरी क्या है?",
    goalHint: "आपके लक्ष्य के हिसाब से हम फसलों को अलग-अलग तौलेंगे।",
    goalProfit: "अधिकतम मुनाफ़ा",
    goalProfitHint: "सबसे अच्छी शुद्ध आय",
    goalSafe: "सबसे सुरक्षित",
    goalSafeHint: "स्थिर दाम, MSP समर्थित",
    goalWater: "पानी बचाएं",
    goalWaterHint: "सूखे खेतों के लिए कम पानी वाली फसलें",
    goalCapital: "कम लागत",
    goalCapitalHint: "शुरुआती खर्च कम रखें",
    buildPlan: "मेरी ग्रोथ योजना बनाएं",
    growthPrivacy: "अनुमान सांकेतिक लागत और मंडी भाव पर आधारित हैं। खर्च से पहले स्थानीय दरें ज़रूर जांचें — यह मार्गदर्शन है, स्थानीय कृषि सलाह का विकल्प नहीं।",
    sourceRainfed: "सिर्फ़ बारिश",
    sourceWell: "कुआं",
    sourceBorewell: "बोरवेल",
    sourceCanal: "नहर",
    sourceDrip: "ड्रिप सिंचाई",
    addsWater: "{mm} मिमी तक अतिरिक्त",
    dripBonus: "{percent}% कम पानी लगता है",
    topMatches: "आपके खेत के लिए बेहतरीन फसलें",
    topMatchesHint: "पूरी सीज़न योजना देखने के लिए फसल पर टैप करें।",
    matchNet: "अनु. शुद्ध लाभ",
    mspBadge: "MSP",
    offSeason: "मौसम से बाहर",
    waterTight: "पानी कम",
    groupCereal: "अनाज",
    groupPulse: "दलहन",
    groupCash: "नकदी फसल",
    groupVegetable: "सब्ज़ी",
    groupCucurbit: "खरबूजा वर्ग",
    groupPerennial: "बहुवर्षीय / बाग",
    seasonPlanKicker: "सीज़न योजना",
    season_kharif: "ख़रीफ़ · बुवाई जून–अग.",
    season_rabi: "रबी · बुवाई अक्टू–दिस.",
    season_zaid: "ज़ायद · बुवाई जन–मार्च",
    estSpend: "अनुमानित खर्च",
    estRevenue: "अपेक्षित आमदनी",
    estNet: "अपेक्षित शुद्ध लाभ",
    breakEven: "लागत-बराबरी भाव",
    waterCheckTitle: "पानी की जांच",
    waterCheckCopy: "इस फसल को लगभग {need} मिमी पानी चाहिए। बारिश से {rain} मिमी मिलेगा और आपकी सिंचाई {extra} मिमी तक जोड़ सकती है।",
    waterRain: "वर्षा",
    waterIrrigation: "आपकी सिंचाई",
    waterNeed: "फसल की ज़रूरत",
    waterOkMsg: "इस फसल के लिए पानी पर्याप्त दिखता है।",
    waterShortMsg: "पानी कम पड़ सकता है — कम पानी वाली फसल या अतिरिक्त सिंचाई पर विचार करें।",
    stageWhen: "कब",
    stageWork: "चरण",
    stageCost: "अनु. खर्च",
    stageLabour: "मज़दूरी",
    daysUnit: "दिन",
    perennialNote: "बहुवर्षीय फसल: लगाने में लगभग ₹{cost} प्रति एकड़, पहली असली आमदनी लगभग साल {year} में, फिर ~{span} साल तक उपज। ऊपर के आंकड़े परिपक्व बाग के लिए हैं।",
    harvestNote: "अपेक्षित उपज: लगभग {qtl} क्विंटल, {date} के आसपास, सांकेतिक भाव ₹{price} प्रति क्विंटल।",
    labourNote: "कुल लगभग {total} मज़दूरी-दिन चाहिए; घर की मज़दूरी के अलावा करीब {hired} दिन किराए पर, खर्च लगभग ₹{cost}।",
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
      "अपने फ़ोन नंबर और पिन से लॉग इन करें, या अपनी खेत योजनाएं सेव करने के लिए मुफ़्त खाता बनाएं।",
    loginTab: "लॉग इन",
    registerTab: "खाता बनाएं",
    pin: "पिन",
    choosePin: "पिन चुनें",
    confirmPin: "पिन की पुष्टि करें",
    newPin: "नया पिन",
    registerButton: "मेरा खाता बनाएं",
    forgotPin: "पिन भूल गए?",
    orDivider: "या",
    skipForNow: "अभी छोड़ें",
    phoneStepTitle: "अपना फ़ोन नंबर जोड़ें ताकि आपकी खेत योजनाएं आपसे जुड़ी रहें।",
    phoneStepSave: "फ़ोन नंबर सेव करें",
    pinStepTitle: "फ़ोन नंबर से लॉग इन करने के लिए नया पिन सेट करें।",
    pinStepSave: "नया पिन सेव करें",
    signedInAs: "साइन इन:",
    changePin: "पिन बदलें",
    addPhone: "फ़ोन नंबर जोड़ें",
    logout: "लॉग आउट",
    linkGoogleHint: "भूले हुए पिन को बाद में रीसेट करने के लिए नीचे अपना Google खाता जोड़ें।",
    err_forgot_pin_hint: "पिन रीसेट करने के लिए नीचे Google से साइन इन करें।",
    err_bad_credentials: "फ़ोन नंबर, नाम या पिन गलत है।",
    err_duplicate_phone: "यह फ़ोन नंबर पहले से पंजीकृत है। लॉग इन करके देखें।",
    err_pin_mismatch: "पिन मेल नहीं खाते।",
    err_invalid_phone: "सही 10 अंकों का फ़ोन नंबर डालें।",
    err_invalid_pin: "पिन ठीक 4 अंकों का होना चाहिए।",
    err_invalid_username: "अपना नाम डालें।",
    err_google_failed: "Google साइन-इन विफल रहा। फिर से प्रयास करें।",
    err_google_account: "यह खाता Google से साइन इन करता है।",
    err_google_unconfigured: "Google साइन-इन उपलब्ध नहीं है।",
    err_google_taken: "यह Google खाता किसी और प्रोफ़ाइल से जुड़ा है।",
    err_not_signed_in: "कृपया फिर से लॉग इन करें।",
    err_network: "सर्वर से संपर्क नहीं हो सका। फिर से प्रयास करें।",
    accountDetails: "खाता विवरण",
    emailLabel: "ईमेल",
    memberSince: "सदस्य बने",
    signInMethods: "साइन-इन तरीके",
    notSet: "सेट नहीं है",
    editProfile: "प्रोफ़ाइल संपादित करें",
    saveChanges: "बदलाव सेव करें",
    cancelEdit: "रद्द करें",
    security: "सुरक्षा",
    setPin: "पिन सेट करें",
    pinSaved: "पिन सेव हो गया।",
    profileSaved: "प्रोफ़ाइल अपडेट हो गई।",
    deleteProfile: "प्रोफ़ाइल हटाएं",
    deleteConfirmMsg:
      "प्रोफ़ाइल हमेशा के लिए हटाएं? इस डिवाइस पर सेव योजनाएं भी हट जाएंगी।",
    savedPlans: "सेव की गई खेत योजनाएं",
    addPhoneForHistory: "खेत योजनाएं सेव करने के लिए फ़ोन नंबर जोड़ें।",
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
    titleDisease: "पीक रोग तपासणी — TerraByte",
    disease: "रोग तपासणी",
    checkDisease: "पीक रोग तपासा",
    diseaseKicker: "पीक आरोग्य",
    diseaseTitle: "पानांवरील समस्या<br><em>लवकर ओळखा.</em>",
    diseaseNote: "एक स्पष्ट फोटो संपूर्ण हंगाम वाचवू शकतो. चला ते पान एकत्र पाहूया.",
    diseaseIntro: "प्रभावित पानाचा फोटो अपलोड करा — काय होत आहे आणि पुढे काय करावे हे समजण्यात आम्ही मदत करू.",
    diseaseNewCheck: "नवीन पीक तपासणी",
    diseaseHeading: "पिकाचा फोटो तपासा",
    uploadPhoto: "फोटो अपलोड करा",
    leafHint: "चांगल्या उजेडात एका प्रभावित पानाचा जवळून घेतलेला फोटो सर्वोत्तम.",
    dropLeaf: "प्रभावित पानाचा फोटो येथे टाका",
    leafFormats: "फोन कॅमेऱ्याने घेतलेला JPG किंवा PNG फोटो चालेल.",
    leafPreviewAlt: "पानाच्या फोटोचे पूर्वावलोकन",
    diseaseResults: "निकाल",
    diseaseResultsHint: "तुमच्या फोटोत जे सापडेल ते येथे दिसेल.",
    checkPhoto: "हा फोटो तपासा",
    removePhoto: "फोटो काढा",
    diseaseAnalyzing: "तुमचा फोटो तपासला जात आहे…",
    diseaseError: "फोटो तपासता आला नाही. कृपया तुमचे इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.",
    diseaseHealthyLabel: "निरोगी दिसते",
    diseaseAlsoPossible: "हेही शक्य:",
    diseaseHealthyAdvice: "या फोटोत रोगाची लक्षणे आढळली नाहीत. नव्या वाढीवर लक्ष ठेवा आणि बदल दिसल्यास पुन्हा तपासा.",
    diseaseSickAdvice: "हे {condition} सारखे दिसते. जास्त प्रभावित पाने काढा, वरून पाणी देणे टाळा आणि फवारणीपूर्वी स्थानिक कृषी कार्यालयाकडून उपचाराची खात्री करा.",
    diseaseLowConfidence: "याबद्दल पूर्ण खात्री नाही — चांगल्या उजेडात एका पानाचा जवळून फोटो घेऊन पुन्हा प्रयत्न करा.",
    askMitaAboutIt: "मिताला याबद्दल विचारा →",
    diseasePrivacy: "तुमचा फोटो सध्या याच डिव्हाइसवर राहतो. निकाल फक्त मार्गदर्शन आहेत, स्थानिक कृषी सल्ल्याचा पर्याय नाहीत.",
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
    growth: "ग्रोथ प्लॅनर",
    planGrowth: "तुमच्या हंगामाची योजना करा",
    growthKicker: "ग्रोथ प्लॅनर",
    growthTitle: "पेरणीआधी<br>संपूर्ण <em>हंगाम पाहा.</em>",
    growthNote: "संपूर्ण पिकाची एक योजना — काय करायचं, कधी करायचं आणि किती खर्च येईल.",
    growthIntro: "तुमची जमीन, पाणी आणि उद्दिष्ट सांगा. आम्ही तारखा, खर्च आणि मजुरीसह टप्प्याटप्प्याने योजना तयार करू.",
    growthStep1: "तुमचं शेत सांगा",
    growthStep2: "तुमचं प्राधान्य निवडा",
    growthStep3: "हंगाम योजना मिळवा",
    growthNewPlan: "नवीन हंगाम योजना",
    growthHeading: "तुमच्या हंगामाची योजना",
    farmBasics: "शेताची माहिती",
    farmBasicsHint: "तुमची जमीन, पेरणीची वेळ आणि घरची मजुरी.",
    landSize: "जमीन",
    acresUnit: "एकर",
    sowingDate: "पेरणीची तारीख",
    sowingHint: "कधी पेरणार",
    ownLabour: "घरची मजुरी",
    ownLabourUnit: "दिवस · ऐच्छिक",
    waterSetup: "पाण्याची व्यवस्था",
    waterSetupHint: "पाऊस आणि तुमचं सिंचन मिळून शेताला किती पाणी मिळेल.",
    growthRainfall: "हंगामी पाऊस",
    growthRainfallUnit: "मिमी · या हंगामात अपेक्षित",
    cropChoice: "कोणतं पीक",
    cropChoiceHint: "किंवा आम्हाला सुचवू द्या",
    cropAuto: "सर्वोत्तम पीक सुचवा",
    goalSection: "सर्वात महत्त्वाचं काय?",
    goalHint: "तुमच्या उद्दिष्टानुसार आम्ही पिकांचं वेगवेगळं मूल्यमापन करू.",
    goalProfit: "जास्तीत जास्त नफा",
    goalProfitHint: "सर्वोत्तम निव्वळ उत्पन्न",
    goalSafe: "सर्वात सुरक्षित",
    goalSafeHint: "स्थिर भाव, MSP आधारित",
    goalWater: "पाणी वाचवा",
    goalWaterHint: "कोरड्या शेतांसाठी कमी पाण्याची पिकं",
    goalCapital: "कमी गुंतवणूक",
    goalCapitalHint: "सुरुवातीचा खर्च कमी ठेवा",
    buildPlan: "माझी ग्रोथ योजना तयार करा",
    growthPrivacy: "अंदाज सूचक खर्च आणि मंडी भावांवर आधारित आहेत. खर्च करण्यापूर्वी स्थानिक दर तपासा — हे मार्गदर्शन आहे, स्थानिक कृषी सल्ल्याचा पर्याय नाही.",
    sourceRainfed: "फक्त पावसावर",
    sourceWell: "विहीर",
    sourceBorewell: "बोअरवेल",
    sourceCanal: "कालवा",
    sourceDrip: "ठिबक सिंचन",
    addsWater: "{mm} मिमी पर्यंत अधिक",
    dripBonus: "{percent}% कमी पाणी लागतं",
    topMatches: "तुमच्या शेतासाठी सर्वोत्तम पिकं",
    topMatchesHint: "संपूर्ण हंगाम योजना पाहण्यासाठी पिकावर टॅप करा.",
    matchNet: "अंदाजे निव्वळ नफा",
    mspBadge: "MSP",
    offSeason: "हंगामाबाहेर",
    waterTight: "पाणी अपुरं",
    groupCereal: "तृणधान्य",
    groupPulse: "कडधान्य",
    groupCash: "नगदी पीक",
    groupVegetable: "भाजीपाला",
    groupCucurbit: "वेलवर्गीय",
    groupPerennial: "बहुवर्षीय / बाग",
    seasonPlanKicker: "हंगाम योजना",
    season_kharif: "खरीप · पेरणी जून–ऑग.",
    season_rabi: "रब्बी · पेरणी ऑक्टो–डिसें.",
    season_zaid: "उन्हाळी · पेरणी जाने–मार्च",
    estSpend: "अंदाजे खर्च",
    estRevenue: "अपेक्षित उत्पन्न",
    estNet: "अपेक्षित निव्वळ नफा",
    breakEven: "ना नफा-ना तोटा भाव",
    waterCheckTitle: "पाणी तपासणी",
    waterCheckCopy: "या पिकाला सुमारे {need} मिमी पाणी लागतं. पावसातून {rain} मिमी मिळेल आणि तुमचं सिंचन {extra} मिमी पर्यंत भर घालू शकतं.",
    waterRain: "पाऊस",
    waterIrrigation: "तुमचं सिंचन",
    waterNeed: "पिकाची गरज",
    waterOkMsg: "या पिकासाठी पाणी पुरेसं दिसतं.",
    waterShortMsg: "पाणी कमी पडू शकतं — कमी पाण्याचं पीक किंवा अधिक सिंचनाचा विचार करा.",
    stageWhen: "कधी",
    stageWork: "टप्पा",
    stageCost: "अंदाजे खर्च",
    stageLabour: "मजुरी",
    daysUnit: "दिवस",
    perennialNote: "बहुवर्षीय पीक: लागवडीस सुमारे ₹{cost} प्रति एकर, पहिलं खरं उत्पन्न साधारण {year} व्या वर्षी, नंतर ~{span} वर्षं उत्पादन. वरील आकडे परिपक्व बागेसाठी आहेत.",
    harvestNote: "अपेक्षित उत्पादन: सुमारे {qtl} क्विंटल, {date} च्या सुमारास, सूचक भाव ₹{price} प्रति क्विंटल.",
    labourNote: "एकूण सुमारे {total} मजुरी-दिवस लागतील; घरच्या मजुरीशिवाय सुमारे {hired} दिवस भाड्याने, खर्च सुमारे ₹{cost}.",
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
    loginCopy:
      "तुमच्या फोन नंबर आणि पिनने लॉग इन करा, किंवा शेत योजना सेव्ह करण्यासाठी मोफत खाते तयार करा.",
    loginTab: "लॉग इन",
    registerTab: "खाते तयार करा",
    pin: "पिन",
    choosePin: "पिन निवडा",
    confirmPin: "पिनची खात्री करा",
    newPin: "नवीन पिन",
    registerButton: "माझे खाते तयार करा",
    forgotPin: "पिन विसरलात?",
    orDivider: "किंवा",
    skipForNow: "सध्या वगळा",
    phoneStepTitle: "तुमच्या शेत योजना तुमच्याशी जोडल्या जाण्यासाठी फोन नंबर जोडा.",
    phoneStepSave: "फोन नंबर सेव्ह करा",
    pinStepTitle: "फोन नंबरने लॉग इन करण्यासाठी नवीन पिन सेट करा.",
    pinStepSave: "नवीन पिन सेव्ह करा",
    signedInAs: "साइन इन:",
    changePin: "पिन बदला",
    addPhone: "फोन नंबर जोडा",
    logout: "लॉग आउट",
    linkGoogleHint: "विसरलेला पिन नंतर रीसेट करण्यासाठी खाली तुमचे Google खाते जोडा.",
    err_forgot_pin_hint: "पिन रीसेट करण्यासाठी खाली Google ने साइन इन करा.",
    err_bad_credentials: "फोन नंबर, नाव किंवा पिन चुकीचा आहे.",
    err_duplicate_phone: "हा फोन नंबर आधीच नोंदणीकृत आहे. लॉग इन करून पहा.",
    err_pin_mismatch: "पिन जुळत नाहीत.",
    err_invalid_phone: "योग्य 10 अंकी फोन नंबर द्या.",
    err_invalid_pin: "पिन नेमका 4 अंकांचा हवा.",
    err_invalid_username: "तुमचे नाव द्या.",
    err_google_failed: "Google साइन-इन अयशस्वी झाले. पुन्हा प्रयत्न करा.",
    err_google_account: "हे खाते Google ने साइन इन करते.",
    err_google_unconfigured: "Google साइन-इन उपलब्ध नाही.",
    err_google_taken: "हे Google खाते दुसऱ्या प्रोफाइलशी जोडलेले आहे.",
    err_not_signed_in: "कृपया पुन्हा लॉग इन करा.",
    err_network: "सर्व्हरशी संपर्क होऊ शकला नाही. पुन्हा प्रयत्न करा.",
    accountDetails: "खाते तपशील",
    emailLabel: "ईमेल",
    memberSince: "सदस्य झाल्याची तारीख",
    signInMethods: "साइन-इन पद्धती",
    notSet: "सेट नाही",
    editProfile: "प्रोफाइल संपादित करा",
    saveChanges: "बदल सेव्ह करा",
    cancelEdit: "रद्द करा",
    security: "सुरक्षा",
    setPin: "पिन सेट करा",
    pinSaved: "पिन सेव्ह झाला.",
    profileSaved: "प्रोफाइल अपडेट झाले.",
    deleteProfile: "प्रोफाइल हटवा",
    deleteConfirmMsg:
      "प्रोफाइल कायमचे हटवायचे? या डिव्हाइसवरील सेव्ह योजनाही हटतील.",
    savedPlans: "सेव्ह केलेल्या शेत योजना",
    addPhoneForHistory: "शेत योजना सेव्ह करण्यासाठी फोन नंबर जोडा.",
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
    titleDisease: "పంట వ్యాధి తనిఖీ — TerraByte",
    disease: "వ్యాధి తనిఖీ",
    checkDisease: "పంట వ్యాధిని తనిఖీ చేయండి",
    diseaseKicker: "పంట ఆరోగ్యం",
    diseaseTitle: "ఆకు సమస్యను<br><em>ముందుగానే గుర్తించండి.</em>",
    diseaseNote: "ఒక స్పష్టమైన ఫోటో సీజన్ మొత్తాన్ని కాపాడగలదు. ఆ ఆకును కలిసి చూద్దాం.",
    diseaseIntro: "ప్రభావిత ఆకు ఫోటోను అప్‌లోడ్ చేయండి — ఏమి జరుగుతుందో, తర్వాత ఏమి చేయాలో అర్థం చేసుకోవడంలో సహాయం చేస్తాం.",
    diseaseNewCheck: "కొత్త పంట తనిఖీ",
    diseaseHeading: "పంట ఫోటోను తనిఖీ చేయండి",
    uploadPhoto: "ఫోటో అప్‌లోడ్ చేయండి",
    leafHint: "మంచి వెలుతురులో ఒక ప్రభావిత ఆకును దగ్గరగా తీసిన ఫోటో ఉత్తమం.",
    dropLeaf: "ప్రభావిత ఆకు ఫోటోను ఇక్కడ వేయండి",
    leafFormats: "ఫోన్ కెమెరాతో తీసిన JPG లేదా PNG ఫోటో సరిపోతుంది.",
    leafPreviewAlt: "ఆకు ఫోటో ప్రివ్యూ",
    diseaseResults: "ఫలితాలు",
    diseaseResultsHint: "మీ ఫోటోలో కనిపించినది ఇక్కడ చూపిస్తాం.",
    checkPhoto: "ఈ ఫోటోను తనిఖీ చేయండి",
    removePhoto: "ఫోటోను తీసివేయండి",
    diseaseAnalyzing: "మీ ఫోటోను తనిఖీ చేస్తున్నాం…",
    diseaseError: "ఫోటోను తనిఖీ చేయలేకపోయాం. దయచేసి మీ ఇంటర్నెట్ కనెక్షన్ చూసి మళ్లీ ప్రయత్నించండి.",
    diseaseHealthyLabel: "ఆరోగ్యంగా ఉంది",
    diseaseAlsoPossible: "ఇవి కూడా కావచ్చు:",
    diseaseHealthyAdvice: "ఈ ఫోటోలో వ్యాధి లక్షణాలు కనిపించలేదు. కొత్త పెరుగుదలపై దృష్టి ఉంచండి, మార్పులు కనిపిస్తే మళ్లీ తనిఖీ చేయండి.",
    diseaseSickAdvice: "ఇది {condition} లా కనిపిస్తుంది. ఎక్కువగా దెబ్బతిన్న ఆకులను తీసివేయండి, పైనుంచి నీళ్లు పోయడం తగ్గించండి, పిచికారీకి ముందు స్థానిక వ్యవసాయ కార్యాలయంతో చికిత్సను నిర్ధారించుకోండి.",
    diseaseLowConfidence: "దీనిపై పూర్తి నమ్మకం లేదు — మంచి వెలుతురులో ఒక ఆకును దగ్గరగా తీసి మళ్లీ ప్రయత్నించండి.",
    askMitaAboutIt: "దీని గురించి మీతాను అడగండి →",
    diseasePrivacy: "మీ ఫోటో ప్రస్తుతానికి ఈ పరికరంలోనే ఉంటుంది. ఫలితాలు మార్గదర్శకం మాత్రమే, స్థానిక వ్యవసాయ సలహాకు ప్రత్యామ్నాయం కాదు.",
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
    growth: "గ్రోత్ ప్లానర్",
    planGrowth: "మీ సీజన్ ప్రణాళిక వేయండి",
    growthKicker: "గ్రోత్ ప్లానర్",
    growthTitle: "విత్తే ముందు<br>సీజన్ అంతా <em>చూడండి.</em>",
    growthNote: "పంట మొత్తానికి ఒకే ప్రణాళిక — ఏమి చేయాలి, ఎప్పుడు చేయాలి, ఎంత ఖర్చవుతుంది.",
    growthIntro: "మీ భూమి, నీరు, లక్ష్యం చెప్పండి. తేదీలు, ఖర్చులు, కూలీతో దశలవారీ ప్రణాళిక సిద్ధం చేస్తాం.",
    growthStep1: "మీ పొలం గురించి చెప్పండి",
    growthStep2: "మీ ప్రాధాన్యత ఎంచుకోండి",
    growthStep3: "సీజన్ ప్రణాళిక పొందండి",
    growthNewPlan: "కొత్త సీజన్ ప్రణాళిక",
    growthHeading: "మీ సీజన్ ప్రణాళిక",
    farmBasics: "పొలం వివరాలు",
    farmBasicsHint: "మీ భూమి, విత్తే సమయం, ఇంటి కూలీ.",
    landSize: "భూమి",
    acresUnit: "ఎకరాలు",
    sowingDate: "విత్తే తేదీ",
    sowingHint: "ఎప్పుడు విత్తాలనుకుంటున్నారు",
    ownLabour: "ఇంటి కూలీ",
    ownLabourUnit: "రోజులు · ఐచ్ఛికం",
    waterSetup: "నీటి ఏర్పాటు",
    waterSetupHint: "వర్షం, మీ నీటిపారుదల కలిపి పొలానికి ఎంత నీరు అందుతుంది.",
    growthRainfall: "సీజన్ వర్షపాతం",
    growthRainfallUnit: "మి.మీ · ఈ సీజన్‌లో అంచనా",
    cropChoice: "ఏ పంట",
    cropChoiceHint: "లేదా మమ్మల్ని సూచించనివ్వండి",
    cropAuto: "ఉత్తమ పంటను సూచించండి",
    goalSection: "మీకు ముఖ్యమైనది ఏమిటి?",
    goalHint: "మీ లక్ష్యాన్ని బట్టి పంటలను వేర్వేరుగా అంచనా వేస్తాం.",
    goalProfit: "గరిష్ఠ లాభం",
    goalProfitHint: "ఉత్తమ నికర ఆదాయం",
    goalSafe: "అత్యంత సురక్షితం",
    goalSafeHint: "స్థిర ధరలు, MSP మద్దతు",
    goalWater: "నీరు ఆదా",
    goalWaterHint: "పొడి పొలాలకు తక్కువ నీటి పంటలు",
    goalCapital: "తక్కువ పెట్టుబడి",
    goalCapitalHint: "ముందస్తు ఖర్చు తక్కువగా ఉంచండి",
    buildPlan: "నా గ్రోత్ ప్రణాళిక సిద్ధం చేయండి",
    growthPrivacy: "అంచనాలు సూచక ఖర్చులు, మండీ ధరలపై ఆధారితం. ఖర్చు చేసే ముందు స్థానిక ధరలు నిర్ధారించుకోండి — ఇది మార్గదర్శనం మాత్రమే, స్థానిక వ్యవసాయ సలహాకు ప్రత్యామ్నాయం కాదు.",
    sourceRainfed: "వర్షాధారం",
    sourceWell: "బావి",
    sourceBorewell: "బోరుబావి",
    sourceCanal: "కాలువ",
    sourceDrip: "డ్రిప్ విధానం",
    addsWater: "{mm} మి.మీ వరకు అదనం",
    dripBonus: "{percent}% తక్కువ నీరు చాలు",
    topMatches: "మీ పొలానికి ఉత్తమ పంటలు",
    topMatchesHint: "పూర్తి సీజన్ ప్రణాళిక చూడటానికి పంటపై నొక్కండి.",
    matchNet: "అంచనా నికర లాభం",
    mspBadge: "MSP",
    offSeason: "సీజన్ వెలుపల",
    waterTight: "నీరు తక్కువ",
    groupCereal: "ధాన్యం",
    groupPulse: "పప్పుధాన్యం",
    groupCash: "వాణిజ్య పంట",
    groupVegetable: "కూరగాయ",
    groupCucurbit: "తీగజాతి",
    groupPerennial: "బహువర్ష / తోట",
    seasonPlanKicker: "సీజన్ ప్రణాళిక",
    season_kharif: "ఖరీఫ్ · జూన్–ఆగ. విత్తనం",
    season_rabi: "రబీ · అక్టో–డిసెం. విత్తనం",
    season_zaid: "జైద్ · జన–మార్చి విత్తనం",
    estSpend: "అంచనా ఖర్చు",
    estRevenue: "అంచనా ఆదాయం",
    estNet: "అంచనా నికర లాభం",
    breakEven: "బ్రేక్-ఈవెన్ ధర",
    waterCheckTitle: "నీటి తనిఖీ",
    waterCheckCopy: "ఈ పంటకు సుమారు {need} మి.మీ నీరు అవసరం. వర్షం నుంచి {rain} మి.మీ వస్తుంది, మీ నీటిపారుదల {extra} మి.మీ వరకు జోడించగలదు.",
    waterRain: "వర్షం",
    waterIrrigation: "మీ నీటిపారుదల",
    waterNeed: "పంట అవసరం",
    waterOkMsg: "ఈ పంటకు నీరు సరిపోతున్నట్లు ఉంది.",
    waterShortMsg: "నీరు తక్కువ కావచ్చు — తక్కువ నీటి పంట లేదా అదనపు నీటిపారుదల ఆలోచించండి.",
    stageWhen: "ఎప్పుడు",
    stageWork: "దశ",
    stageCost: "అంచనా ఖర్చు",
    stageLabour: "కూలీ",
    daysUnit: "రోజులు",
    perennialNote: "బహువర్ష పంట: నాటడానికి ఎకరాకు సుమారు ₹{cost}, మొదటి నిజమైన ఆదాయం సుమారు {year}వ సంవత్సరంలో, ఆపై ~{span} ఏళ్లు దిగుబడి. పై గణాంకాలు పరిపక్వ తోటకు.",
    harvestNote: "అంచనా దిగుబడి: సుమారు {qtl} క్వింటాళ్లు, {date} ప్రాంతంలో, సూచక ధర క్వింటాకు ₹{price}.",
    labourNote: "మొత్తం సుమారు {total} కూలీ-రోజులు అవసరం; ఇంటి కూలీకి అదనంగా సుమారు {hired} రోజులు కిరాయికి, ఖర్చు సుమారు ₹{cost}.",
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
    loginCopy:
      "మీ ఫోన్ నంబర్ మరియు పిన్‌తో లాగ్ ఇన్ అవ్వండి, లేదా పొలం ప్లాన్‌లు సేవ్ చేయడానికి ఉచిత ఖాతా సృష్టించండి.",
    loginTab: "లాగ్ ఇన్",
    registerTab: "ఖాతా సృష్టించండి",
    pin: "పిన్",
    choosePin: "పిన్ ఎంచుకోండి",
    confirmPin: "పిన్ నిర్ధారించండి",
    newPin: "కొత్త పిన్",
    registerButton: "నా ఖాతా సృష్టించండి",
    forgotPin: "పిన్ మర్చిపోయారా?",
    orDivider: "లేదా",
    skipForNow: "ప్రస్తుతానికి దాటవేయండి",
    phoneStepTitle: "మీ పొలం ప్లాన్‌లు మీకు సేవ్ అవ్వడానికి ఫోన్ నంబర్ జోడించండి.",
    phoneStepSave: "ఫోన్ నంబర్ సేవ్ చేయండి",
    pinStepTitle: "ఫోన్ నంబర్‌తో లాగ్ ఇన్ కావడానికి కొత్త పిన్ సెట్ చేయండి.",
    pinStepSave: "కొత్త పిన్ సేవ్ చేయండి",
    signedInAs: "సైన్ ఇన్:",
    changePin: "పిన్ మార్చండి",
    addPhone: "ఫోన్ నంబర్ జోడించండి",
    logout: "లాగ్ అవుట్",
    linkGoogleHint: "మర్చిపోయిన పిన్‌ను తర్వాత రీసెట్ చేయడానికి కింద మీ Google ఖాతాను లింక్ చేయండి.",
    err_forgot_pin_hint: "పిన్ రీసెట్ చేయడానికి కింద Googleతో సైన్ ఇన్ అవ్వండి.",
    err_bad_credentials: "ఫోన్ నంబర్, పేరు లేదా పిన్ తప్పు.",
    err_duplicate_phone: "ఈ ఫోన్ నంబర్ ఇప్పటికే నమోదైంది. లాగ్ ఇన్ ప్రయత్నించండి.",
    err_pin_mismatch: "పిన్‌లు సరిపోలలేదు.",
    err_invalid_phone: "సరైన 10 అంకెల ఫోన్ నంబర్ ఇవ్వండి.",
    err_invalid_pin: "పిన్ సరిగ్గా 4 అంకెలు ఉండాలి.",
    err_invalid_username: "మీ పేరు ఇవ్వండి.",
    err_google_failed: "Google సైన్-ఇన్ విఫలమైంది. మళ్లీ ప్రయత్నించండి.",
    err_google_account: "ఈ ఖాతా Googleతో సైన్ ఇన్ అవుతుంది.",
    err_google_unconfigured: "Google సైన్-ఇన్ అందుబాటులో లేదు.",
    err_google_taken: "ఈ Google ఖాతా వేరే ప్రొఫైల్‌కి లింక్ అయ్యింది.",
    err_not_signed_in: "దయచేసి మళ్లీ లాగ్ ఇన్ అవ్వండి.",
    err_network: "సర్వర్‌ను చేరుకోలేకపోయాం. మళ్లీ ప్రయత్నించండి.",
    accountDetails: "ఖాతా వివరాలు",
    emailLabel: "ఇమెయిల్",
    memberSince: "సభ్యులైన తేదీ",
    signInMethods: "సైన్-ఇన్ పద్ధతులు",
    notSet: "సెట్ కాలేదు",
    editProfile: "ప్రొఫైల్ సవరించండి",
    saveChanges: "మార్పులు సేవ్ చేయండి",
    cancelEdit: "రద్దు చేయండి",
    security: "భద్రత",
    setPin: "పిన్ సెట్ చేయండి",
    pinSaved: "పిన్ సేవ్ అయ్యింది.",
    profileSaved: "ప్రొఫైల్ అప్‌డేట్ అయ్యింది.",
    deleteProfile: "ప్రొఫైల్ తొలగించండి",
    deleteConfirmMsg:
      "ప్రొఫైల్ శాశ్వతంగా తొలగించాలా? ఈ పరికరంలో సేవ్ చేసిన ప్లాన్‌లు కూడా తొలగించబడతాయి.",
    savedPlans: "సేవ్ చేసిన పొలం ప్లాన్‌లు",
    addPhoneForHistory: "పొలం ప్లాన్‌లు సేవ్ చేయడానికి ఫోన్ నంబర్ జోడించండి.",
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
  Potato: { hi: "आलू", mr: "बटाटा", te: "బంగాళదుంప" },
  Tomato: { hi: "टमाटर", mr: "टोमॅटो", te: "టమాటా" },
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
function applyTheme() {
  const isDark = localStorage.getItem("terraTheme") === "dark";
  if (isDark) document.body.classList.add("dark");
  
  document.querySelectorAll(".mode-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const isNowDark = document.body.classList.toggle("dark");
      localStorage.setItem("terraTheme", isNowDark ? "dark" : "light");
    });
  });
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
  const currentLang = currentLanguage();
  const strings = translations[currentLang] || {};
  const enStrings = translations.en || {};

  const getStr = (key) => strings[key] || enStrings[key];

  root.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = getStr(element.dataset.i18nHtml);
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (element.dataset.i18nHtml) return;
    const value = getStr(element.dataset.i18n);
    if (value)
      element.textContent = value;
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = getStr(element.dataset.i18nPlaceholder);
    if (value)
      element.placeholder = value;
  });
  root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const value = getStr(element.dataset.i18nAriaLabel);
    if (value)
      element.setAttribute("aria-label", value);
  });
  root.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = getStr(element.dataset.i18nAlt);
    if (value)
      element.setAttribute("alt", value);
  });
  root.querySelectorAll("[data-i18n-data-question]").forEach((element) => {
    const value = getStr(element.dataset.i18nDataQuestion);
    if (value)
      element.dataset.question = value;
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
  const voiceInputBtn = document.querySelector("#voiceInputBtn");
  if (voiceInputBtn) {
    voiceInputBtn.addEventListener("click", () => {
      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Recognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }
      const recognition = new Recognition();
      const languageCode = localStorage.getItem("terraLanguage") || "en";
      const speechLocales = { en: "en-IN", hi: "hi-IN", mr: "mr-IN", te: "te-IN" };
      recognition.lang = speechLocales[languageCode] || "en-IN";
      recognition.interimResults = false;
      
      voiceInputBtn.innerHTML = "🎤 Listening...";
      
      recognition.onresult = (event) => {
        voiceInputBtn.innerHTML = "🎤 Speak values";
        const transcript = event.results[0][0].transcript.toLowerCase();
        const numbers = transcript.match(/\d+(\.\d+)?/g);
        
        if (numbers && numbers.length >= 4) {
          document.querySelector("#inputNitrogen").value = numbers[0];
          document.querySelector("#inputPhosphorus").value = numbers[1];
          document.querySelector("#inputPotassium").value = numbers[2];
          document.querySelector("#inputPh").value = numbers[3];
        } else {
          alert("Could not clearly extract 4 numbers (N, P, K, pH). Please try again.");
        }
      };
      
      recognition.onerror = () => {
        voiceInputBtn.innerHTML = "🎤 Speak values";
        alert("Could not hear that. Please try again.");
      };
      
      recognition.start();
    });
  }
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
    if (className === "mita-message") {
      const readBtn = document.createElement("button");
      readBtn.className = "read-aloud-btn";
      readBtn.innerHTML = "🔊";
      readBtn.title = "Read aloud";
      readBtn.style.marginLeft = "8px";
      readBtn.style.background = "none";
      readBtn.style.border = "none";
      readBtn.style.cursor = "pointer";
      readBtn.style.fontSize = "1.2rem";
      readBtn.onclick = () => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const speechLocales = { en: "en-IN", hi: "hi-IN", mr: "mr-IN", te: "te-IN" };
        const languageCode = localStorage.getItem("terraLanguage") || "en";
        utterance.lang = speechLocales[languageCode] || "en-IN";
        window.speechSynthesis.speak(utterance);
      };
      message.appendChild(readBtn);
    }
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
    if (className === "mita-message") {
      const readBtn = document.createElement("button");
      readBtn.className = "read-aloud-btn";
      readBtn.innerHTML = "🔊";
      readBtn.title = "Read aloud";
      readBtn.style.marginLeft = "8px";
      readBtn.style.background = "none";
      readBtn.style.border = "none";
      readBtn.style.cursor = "pointer";
      readBtn.style.fontSize = "1.2rem";
      readBtn.onclick = () => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const speechLocales = { en: "en-IN", hi: "hi-IN", mr: "mr-IN", te: "te-IN" };
        const languageCode = localStorage.getItem("terraLanguage") || "en";
        utterance.lang = speechLocales[languageCode] || "en-IN";
        window.speechSynthesis.speak(utterance);
      };
      message.appendChild(readBtn);
    }
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
  const registerForm = document.querySelector("#registerForm");
  const errorBox = document.querySelector("#authError");
  const show = (selector, on) => {
    const element = document.querySelector(selector);
    if (element) element.hidden = !on;
  };
  const showError = (err) => {
    if (!errorBox) return;
    const key = err?.code ? `err_${err.code}` : "";
    const translated = key ? t(key) : "";
    errorBox.textContent =
      (translated && translated !== key ? translated : err?.error) ||
      t("err_network");
    errorBox.hidden = false;
  };
  const clearError = () => {
    if (errorBox) errorBox.hidden = true;
  };
  let pinLength = 4;
  let currentUser = null;
  let forgotMode = false;
  const validPin = (pin) => new RegExp(`^\\d{${pinLength}}$`).test(pin);
  const finishLogin = (user) => {
    localStorage.setItem(
      "terraProfile",
      JSON.stringify({ name: user.username, phone: user.phone || "" }),
    );
    location.href = "planner.html";
  };
  const showOnly = (step) => {
    clearError();
    ["#authTabs", "#loginForm", "#registerForm", "#phoneStep", "#pinStep"].forEach(
      (selector) => show(selector, false),
    );
    if (step === "forms") {
      show("#authTabs", true);
      const active = document.querySelector(".auth-tab.active")?.dataset.tab || "login";
      show(active === "login" ? "#loginForm" : "#registerForm", true);
    } else {
      show(step, true);
    }
  };
  const afterGoogleLogin = (data) => {
    const user = data.user;
    currentUser = user;
    if (forgotMode) {
      forgotMode = false;
      showOnly("#pinStep");
    } else if (data.isNew && !user.phone) {
      showOnly("#phoneStep");
    } else {
      finishLogin(user);
    }
  };
  document.querySelectorAll(".auth-tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".auth-tab")
        .forEach((other) => other.classList.toggle("active", other === tab));
      clearError();
      show("#loginForm", tab.dataset.tab === "login");
      show("#registerForm", tab.dataset.tab === "register");
    }),
  );
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError();
    const phone = form.elements["phone"].value.trim();
    const username = form.elements["username"].value.trim();
    const pin = form.elements["pin"].value;
    if (!/^[0-9]{10}$/.test(phone)) return showError({ code: "invalid_phone" });
    if (!username) return showError({ code: "invalid_username" });
    if (!validPin(pin)) return showError({ code: "invalid_pin" });
    try {
      const data = await authFetch("/login", { phone, username, pin });
      finishLogin(data.user);
    } catch (err) {
      showError(err);
    }
  });
  registerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError();
    const phone = registerForm.elements["phone"].value.trim();
    const username = registerForm.elements["username"].value.trim();
    const pin = registerForm.elements["pin"].value;
    const confirmPin = registerForm.elements["confirmPin"].value;
    if (!/^[0-9]{10}$/.test(phone)) return showError({ code: "invalid_phone" });
    if (!username) return showError({ code: "invalid_username" });
    if (!validPin(pin)) return showError({ code: "invalid_pin" });
    if (pin !== confirmPin) return showError({ code: "pin_mismatch" });
    try {
      const data = await authFetch("/register", { phone, username, pin, confirmPin });
      finishLogin(data.user);
    } catch (err) {
      showError(err);
    }
  });
  document.querySelector("#forgotPin")?.addEventListener("click", () => {
    forgotMode = true;
    clearError();
    showError({ code: "forgot_pin_hint" });
  });
  document.querySelector("#phoneStep")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError();
    const phone = document.querySelector("#phoneStepInput").value.trim();
    if (!/^[0-9]{10}$/.test(phone)) return showError({ code: "invalid_phone" });
    try {
      const data = await authFetch("/phone", { phone });
      finishLogin(data.user);
    } catch (err) {
      showError(err);
    }
  });
  document.querySelector("#phoneStepSkip")?.addEventListener("click", () => {
    if (currentUser) finishLogin(currentUser);
  });
  document.querySelector("#pinStep")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError();
    const pin = document.querySelector("#pinStepPin").value;
    const confirmPin = document.querySelector("#pinStepConfirm").value;
    if (!validPin(pin)) return showError({ code: "invalid_pin" });
    if (pin !== confirmPin) return showError({ code: "pin_mismatch" });
    try {
      const data = await authFetch("/pin", { pin, confirmPin });
      currentUser = data.user;
      if (!data.user.phone) showOnly("#phoneStep");
      else finishLogin(data.user);
    } catch (err) {
      showError(err);
    }
  });
  document.querySelector("#pinStepSkip")?.addEventListener("click", () => {
    if (currentUser) finishLogin(currentUser);
  });
  const onGoogleCredential = async (response) => {
    clearError();
    try {
      const data = await authFetch("/google", { credential: response.credential });
      afterGoogleLogin(data);
    } catch (err) {
      showError(err);
    }
  };
  const renderGoogleButton = (clientId) => {
    let attempts = 0;
    const tryRender = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: onGoogleCredential,
        });
        window.google.accounts.id.renderButton(
          document.querySelector("#googleButton"),
          { theme: "outline", size: "large", width: 320 },
        );
        show("#authOr", true);
      } else if (attempts++ < 50) {
        setTimeout(tryRender, 200);
      }
    };
    tryRender();
  };
  const profile = storedProfile();
  if (profile) {
    form.elements["phone"].value = profile.phone || "";
    form.elements["username"].value = profile.name || "";
    renderHistory(profile.phone || "");
  }
  form.elements["phone"].addEventListener("input", () =>
    renderHistory(form.elements["phone"].value.trim()),
  );
  authFetch("/config")
    .then((config) => {
      pinLength = config.pinLength || 4;
      const placeholder = "•".repeat(pinLength);
      document
        .querySelectorAll('input[inputmode="numeric"][type="password"], #pinStepPin, #pinStepConfirm')
        .forEach((input) => {
          input.maxLength = pinLength;
          input.placeholder = placeholder;
        });
      if (config.googleClientId) renderGoogleButton(config.googleClientId);
    })
    .catch(() => {});
  authFetch("/me")
    .then(() => location.replace("profile.html"))
    .catch(() => {});
}
const AUTH_BASE = window.TERRABYTE_AUTH_ENDPOINT || "/api/auth";
async function authFetch(path, body) {
  const response = await fetch(
    `${AUTH_BASE}${path}`,
    body === undefined
      ? {}
      : {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    data.httpStatus = response.status;
    throw data;
  }
  return data;
}
function setupProfilePage() {
  if (!document.body.classList.contains("profile-page")) return;
  const errorBox = document.querySelector("#profileError");
  const noteBox = document.querySelector("#profileNote");
  const showMsg = (element, text) => {
    if (element) {
      element.textContent = text || "";
      element.hidden = !text;
    }
  };
  const showError = (err) => {
    const key = err?.code ? `err_${err.code}` : "";
    const translated = key ? t(key) : "";
    showMsg(noteBox, "");
    showMsg(
      errorBox,
      (translated && translated !== key ? translated : err?.error) || t("err_network"),
    );
  };
  const notify = (key) => {
    showMsg(errorBox, "");
    showMsg(noteBox, t(key));
  };
  const dateLabel = (iso) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  let user = null;
  let pinLength = 4;
  const renderHistory = () => {
    const target = document.querySelector("#profileHistory");
    if (!target) return;
    if (!user.phone) {
      target.innerHTML = `<p class="profile-empty">${t("addPhoneForHistory")}</p>`;
      return;
    }
    const history = historyFor(user.phone);
    if (!history.length) {
      target.innerHTML = `<p class="profile-empty">${t("historyNoPlans")}</p>`;
      return;
    }
    target.innerHTML = history
      .map((entry) => {
        const field = entry.field || {};
        const parts = [
          ["N", field.nitrogen],
          ["P", field.phosphorus],
          ["K", field.potassium],
          ["pH", field.ph],
          ["°C", field.temperature],
          ["% RH", field.humidity],
          ["mm", field.rainfall],
        ]
          .filter(([, value]) => value !== undefined && value !== null && value !== "")
          .map(([label, value]) => `<span>${value} ${label}</span>`)
          .join("");
        return `<div class="history-entry"><b>${dateLabel(entry.date)}</b>${parts}</div>`;
      })
      .join("");
  };
  const render = () => {
    document.querySelector("#profileHeroName").textContent = user.username;
    document.querySelector("#profileHeroMeta").textContent = [user.phone, user.email]
      .filter(Boolean)
      .join(" · ");
    document.querySelector("#detailName").textContent = user.username;
    document.querySelector("#detailPhone").textContent = user.phone || t("notSet");
    document.querySelector("#detailEmail").textContent = user.email || t("notSet");
    document.querySelector("#detailSince").textContent = user.createdAt
      ? dateLabel(user.createdAt.replace(" ", "T") + "Z")
      : "—";
    document.querySelector("#detailMethods").textContent =
      [user.hasPin ? t("pin") : null, user.hasGoogle ? "Google" : null]
        .filter(Boolean)
        .join(" · ") || t("notSet");
    document.querySelector("#changePinButton").textContent = user.hasPin
      ? t("changePin")
      : t("setPin");
    localStorage.setItem(
      "terraProfile",
      JSON.stringify({ name: user.username, phone: user.phone || "" }),
    );
    renderHistory();
  };
  const editForm = document.querySelector("#editForm");
  const detailsList = document.querySelector("#profileDetails");
  const detailActions = document.querySelector("#detailActions");
  const closeEdit = () => {
    editForm.hidden = true;
    detailsList.hidden = false;
    detailActions.hidden = false;
  };
  document.querySelector("#editStart")?.addEventListener("click", () => {
    editForm.elements["username"].value = user.username;
    editForm.elements["phone"].value = user.phone || "";
    editForm.hidden = false;
    detailsList.hidden = true;
    detailActions.hidden = true;
  });
  document.querySelector("#editCancel")?.addEventListener("click", closeEdit);
  editForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = editForm.elements["username"].value.trim();
    const phone = editForm.elements["phone"].value.trim();
    if (!username) return showError({ code: "invalid_username" });
    if (phone && !/^[0-9]{10}$/.test(phone)) return showError({ code: "invalid_phone" });
    try {
      if (username !== user.username) user = (await authFetch("/profile", { username })).user;
      if (phone && phone !== user.phone) user = (await authFetch("/phone", { phone })).user;
      render();
      closeEdit();
      notify("profileSaved");
    } catch (err) {
      showError(err);
    }
  });
  document.querySelector("#changePinForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const pin = form.elements["pin"].value;
    const confirmPin = form.elements["confirmPin"].value;
    if (!new RegExp(`^\\d{${pinLength}}$`).test(pin)) return showError({ code: "invalid_pin" });
    if (pin !== confirmPin) return showError({ code: "pin_mismatch" });
    try {
      user = (await authFetch("/pin", { pin, confirmPin })).user;
      form.reset();
      render();
      notify("pinSaved");
    } catch (err) {
      showError(err);
    }
  });
  document.querySelector("#deleteProfile")?.addEventListener("click", async () => {
    if (!confirm(t("deleteConfirmMsg"))) return;
    try {
      await authFetch("/delete", {});
      if (user?.phone) localStorage.removeItem(`terraHistory_${user.phone}`);
      localStorage.removeItem("terraProfile");
      location.href = "index.html";
    } catch (err) {
      showError(err);
    }
  });
  document.querySelector("#profileLogout")?.addEventListener("click", async () => {
    try {
      await authFetch("/logout", {});
    } catch {}
    localStorage.removeItem("terraProfile");
    location.href = "login.html";
  });
  const onGoogleCredential = async (response) => {
    try {
      user = (await authFetch("/google", { credential: response.credential })).user;
      document.querySelector("#profileGoogleSection").hidden = true;
      render();
      notify("profileSaved");
    } catch (err) {
      showError(err);
    }
  };
  authFetch("/me")
    .then(async (data) => {
      user = data.user;
      render();
      try {
        const config = await authFetch("/config");
        pinLength = config.pinLength || 4;
        const placeholder = "•".repeat(pinLength);
        document
          .querySelectorAll('#changePinForm input[type="password"]')
          .forEach((input) => {
            input.maxLength = pinLength;
            input.placeholder = placeholder;
          });
        if (config.googleClientId && !user.hasGoogle) {
          document.querySelector("#profileGoogleSection").hidden = false;
          let attempts = 0;
          const tryRender = () => {
            if (window.google?.accounts?.id) {
              window.google.accounts.id.initialize({
                client_id: config.googleClientId,
                callback: onGoogleCredential,
              });
              window.google.accounts.id.renderButton(
                document.querySelector("#profileGoogleButton"),
                { theme: "outline", size: "large", width: 280 },
              );
            } else if (attempts++ < 50) {
              setTimeout(tryRender, 200);
            }
          };
          tryRender();
        }
      } catch {}
    })
    .catch(() => location.replace("login.html"));
}
function setupAuthNav() {
  const profileLink = document.querySelector('.top-actions .login-link[href="login.html"], .topbar .login-link[href="login.html"]');
  authFetch("/me")
    .then((data) => {
      const user = data.user;
      localStorage.setItem(
        "terraProfile",
        JSON.stringify({ name: user.username, phone: user.phone || "" }),
      );
      if (profileLink && !document.querySelector("#logoutLink")) {
        profileLink.textContent = t("myProfile");
        profileLink.dataset.i18n = "myProfile";
        profileLink.href = "profile.html";
        const logout = document.createElement("a");
        logout.id = "logoutLink";
        logout.className = profileLink.className;
        logout.href = "#";
        logout.textContent = t("logout");
        logout.addEventListener("click", async (event) => {
          event.preventDefault();
          try {
            await authFetch("/logout", {});
          } catch {}
          localStorage.removeItem("terraProfile");
          location.href = "login.html";
        });
        profileLink.after(logout);
      }
    })
    .catch((error) => {
      // Login is optional — never bounce to login.html. Just drop a stale
      // profile if the auth server explicitly rejected the session.
      if (error?.httpStatus === 401) {
        localStorage.removeItem("terraProfile");
      }
    });
}
// PlantVillage class order — must stay in sync with DISEASE_LABELS in server.py.
const DISEASE_LABELS = [
  "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust",
  "Apple___healthy", "Blueberry___healthy",
  "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
  "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy",
  "Grape___Black_rot", "Grape___Esca_(Black_Measles)",
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
  "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot",
  "Peach___healthy", "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy",
  "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
  "Raspberry___healthy", "Soybean___healthy", "Squash___Powdery_mildew",
  "Strawberry___Leaf_scorch", "Strawberry___healthy", "Tomato___Bacterial_spot",
  "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
  "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite",
  "Tomato___Target_Spot", "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
  "Tomato___Tomato_mosaic_virus", "Tomato___healthy",
];
function prettyDisease(label) {
  const clean = (part) => part.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  const [crop, condition = ""] = label.split("___");
  return { crop: clean(crop), condition: clean(condition) || "unknown" };
}
// tfjs + tflite runtime is vendored (same-origin) because Chrome's ORB
// blocks the WASM loader when it is fetched from a cross-origin CDN.
const TFLITE_DIR = "vendor/tflite/";
let diseaseModelPromise = null;
function getDiseaseModel() {
  if (!diseaseModelPromise)
    diseaseModelPromise = (async () => {
      const load = (src) =>
        new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      if (!window.tf) await load(TFLITE_DIR + "tf.min.js");
      if (!window.tflite) await load(TFLITE_DIR + "tf-tflite.min.js");
      tflite.setWasmPath(TFLITE_DIR);
      return tflite.loadTFLiteModel("disease-model.tflite");
    })().catch((error) => {
      diseaseModelPromise = null;
      throw error;
    });
  return diseaseModelPromise;
}
async function detectDiseaseInBrowser(file) {
  const model = await getDiseaseModel();
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 224;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, 224, 224);
  bitmap.close();
  // The saved model rescales internally, so raw 0-255 pixels go in as-is.
  const pixels = tf.browser.fromPixels(canvas).toFloat().expandDims(0);
  const output = model.predict(pixels);
  const probabilities = await output.data();
  pixels.dispose();
  output.dispose();
  return Array.from(probabilities.keys())
    .sort((a, b) => probabilities[b] - probabilities[a])
    .slice(0, 3)
    .map((i) => {
      const label = DISEASE_LABELS[i] || `class_${i}`;
      const { crop, condition } = prettyDisease(label);
      return {
        label,
        crop,
        condition,
        healthy: condition.toLowerCase() === "healthy",
        probability: probabilities[i],
      };
    });
}
async function detectDiseaseOnServer(file) {
  const body = new FormData();
  body.append("photo", file);
  const response = await fetch("/api/disease", { method: "POST", body });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.predictions?.length)
    throw new Error(data.error || "request failed");
  return data.predictions;
}
function setupDiseasePage() {
  const input = document.querySelector("#leafPhoto");
  if (!input) return;
  const previewBox = document.querySelector("#leafPreview");
  const previewImage = document.querySelector("#leafImage");
  const checkButton = document.querySelector("#checkLeafBtn");
  const resultBox = document.querySelector("#diseaseResult");
  const showMessage = (text) => {
    resultBox.textContent = text;
    resultBox.classList.add("visible");
  };
  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;
    if (previewImage.src) URL.revokeObjectURL(previewImage.src);
    previewImage.src = URL.createObjectURL(file);
    previewBox.classList.add("visible");
    checkButton.disabled = false;
    resultBox.classList.remove("visible");
    resultBox.textContent = "";
    getDiseaseModel().catch(() => {}); // warm up while the user reviews the preview
  });
  document.querySelector("#removeLeafBtn").addEventListener("click", () => {
    input.value = "";
    if (previewImage.src) URL.revokeObjectURL(previewImage.src);
    previewImage.removeAttribute("src");
    previewBox.classList.remove("visible");
    checkButton.disabled = true;
    resultBox.classList.remove("visible");
    resultBox.textContent = "";
  });
  checkButton.addEventListener("click", async () => {
    const file = input.files?.[0];
    if (!file) return;
    checkButton.disabled = true;
    showMessage(t("diseaseAnalyzing"));
    try {
      let predictions;
      try {
        predictions = await detectDiseaseInBrowser(file);
      } catch {
        predictions = await detectDiseaseOnServer(file);
      }
      renderDiseaseResult(resultBox, predictions);
      resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch {
      showMessage(t("diseaseError"));
    } finally {
      checkButton.disabled = false;
    }
  });
}
function renderDiseaseResult(resultBox, predictions) {
  const diseaseName = (prediction) =>
    `${prediction.crop} — ${prediction.healthy ? t("diseaseHealthyLabel") : prediction.condition}`;
  const top = predictions[0];
  const percent = Math.round(top.probability * 100);
  resultBox.innerHTML = "";

  const heading = document.createElement("div");
  heading.className = "disease-top" + (top.healthy ? " healthy" : "");
  const nameEl = document.createElement("b");
  nameEl.textContent = diseaseName(top);
  const percentEl = document.createElement("span");
  percentEl.textContent = `${percent}%`;
  heading.append(nameEl, percentEl);

  const meter = document.createElement("div");
  meter.className = "disease-meter";
  const fill = document.createElement("b");
  fill.style.width = `${percent}%`;
  meter.append(fill);
  resultBox.append(heading, meter);

  const alternates = predictions.slice(1).filter((p) => p.probability >= 0.05);
  if (alternates.length) {
    const alts = document.createElement("p");
    alts.className = "disease-alts";
    alts.textContent =
      `${t("diseaseAlsoPossible")} ` +
      alternates
        .map((p) => `${diseaseName(p)} (${Math.round(p.probability * 100)}%)`)
        .join(", ");
    resultBox.append(alts);
  }

  const advice = document.createElement("p");
  advice.className = "disease-advice";
  advice.textContent =
    top.probability < 0.5
      ? t("diseaseLowConfidence")
      : top.healthy
        ? t("diseaseHealthyAdvice")
        : t("diseaseSickAdvice", { condition: top.condition });
  resultBox.append(advice);
  resultBox.classList.add("visible");
}
useLanguage();
setupPlanner();
setupDashboard();
setupLogin();
setupProfilePage();
setupDiseasePage();
if (!document.body.classList.contains("login-page")) setupAuthNav();
