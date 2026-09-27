const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');
const themeToggle = document.getElementById('themeToggle');
const languageSelect = document.getElementById('languageSelect');
const imageUpload = document.getElementById('imageUpload');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
let currentImage = null;

const i18n = {
    English: {
        welcome: "Namaskar! I am KrishiSahayak, your AI Agricultural Advisor. How can I help you with your farm today?",
        starter1: "How to control aphids in cotton?",
        starter2: "Best fertilizer for wheat",
        starter3: "Today's weather impact on irrigation",
        placeholder: "Type your agricultural question here...",
        disclaimer: "Disclaimer: Recommendations are AI-generated general guidance. Please verify with local agronomists before applying chemicals."
    },
    Hindi: {
        welcome: "नमस्कार! मैं कृषिसहायक, आपका कृत्रिम बुद्धिमत्ता कृषि सलाहकार हूँ। आज मैं आपके खेत में आपकी कैसे मदद कर सकता हूँ?",
        starter1: "कपास में एफिड्स को कैसे नियंत्रित करें?",
        starter2: "गेहूं के लिए सबसे अच्छा उर्वरक",
        starter3: "आज के मौसम का सिंचाई पर प्रभाव",
        placeholder: "अपना कृषि प्रश्न यहां टाइप करें...",
        disclaimer: "अस्वीकरण: सिफारिशें एआई-जनित सामान्य मार्गदर्शन हैं। कृपया रसायनों को लागू करने से पहले स्थानीय कृषिविदों से सत्यापित करें।"
    },
    Marathi: {
        welcome: "नमस्कार! मी कृषिसहाय्यक, तुमचा एआय कृषी सल्लागार आहे. आज मी तुम्हाला तुमच्या शेतीत कशी मदत करू शकेन?",
        starter1: "कापसामधील मावा (Aphids) कसा नियंत्रित करावा?",
        starter2: "गव्हासाठी सर्वोत्तम खत",
        starter3: "आजच्या हवामानाचा सिंचनावर परिणाम",
        placeholder: "तुमचा कृषी प्रश्न येथे टाइप करा...",
        disclaimer: "अस्वीकरण: शिफारसी एआय-व्युत्पन्न सामान्य मार्गदर्शन आहेत. रसायने लागू करण्यापूर्वी कृपया स्थानिक कृषितज्ञांशी पडताळणी करा."
    },
    Telugu: {
        welcome: "నమస్కారం! నేను కృషీసహాయక్, మీ AI వ్యవసాయ సలహాదారుని. ఈ రోజు మీ పొలంలో నేను మీకు ఎలా సహాయపడగలను?",
        starter1: "పత్తిలో అఫిడ్స్ ను ఎలా నివారించాలి?",
        starter2: "గోధుమలకు ఉత్తమమైన ఎరువులు",
        starter3: "సాగునీటిపై నేటి వాతావరణ ప్రభావం",
        placeholder: "మీ వ్యవసాయ ప్రశ్నను ఇక్కడ టైప్ చేయండి...",
        disclaimer: "నిరాకరణ: సిఫార్సులు AI-సృష్టించిన సాధారణ మార్గదర్శకాలు. రసాయనాలను వర్తించే ముందు దయచేసి స్థానిక వ్యవసాయ నిపుణులతో ధృవీకరించండి."
    }
};

languageSelect.addEventListener('change', () => {
    const lang = languageSelect.value;
    const t = i18n[lang] || i18n.English;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });
});

// Backend URL (FastAPI)
const BACKEND_URL = 'http://localhost:8001';

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('krishiTheme', isDark ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('krishiTheme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Image Upload Preview
imageUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreviewContainer.innerHTML = `
                <div class="relative inline-block">
                    <img src="${e.target.result}" class="h-16 rounded object-cover">
                    <button type="button" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs" onclick="clearImage()">×</button>
                </div>
            `;
            imagePreviewContainer.classList.remove('hidden');
            currentImage = e.target.result; // Base64
        }
        reader.readAsDataURL(file);
    }
});

function clearImage() {
    imageUpload.value = '';
    imagePreviewContainer.innerHTML = '';
    imagePreviewContainer.classList.add('hidden');
    currentImage = null;
}

// Starter buttons
document.querySelectorAll('.starter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        messageInput.value = btn.innerText;
        chatForm.dispatchEvent(new Event('submit'));
    });
});

// Auto-resize textarea
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Chat History State
let history = [];

// Handle Chat Submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text && !currentImage) return;

    // Add user message to UI
    appendMessage('user', text, currentImage);
    
    const requestPayload = {
        question: text,
        history: history,
        language: languageSelect.value,
        image_data: currentImage
    };

    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    clearImage();

    // Add thinking placeholder
    const loadingId = appendMessage('bot', '...', null, true);

    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestPayload)
        });

        const data = await response.json();
        
        // Remove loading
        document.getElementById(loadingId).remove();
        
        if (response.ok) {
            appendMessage('bot', data.answer, null, false, data.sources);
            history.push({ role: 'user', content: text });
            history.push({ role: 'assistant', content: data.answer });
        } else {
            appendMessage('bot', 'Sorry, I am having trouble connecting to my knowledge base right now. Error: ' + data.detail);
        }
    } catch (error) {
        document.getElementById(loadingId).remove();
        appendMessage('bot', 'Network error. Please make sure the KrishiSahayak backend is running.');
    }
});

function appendMessage(sender, text, image, isLoading = false, sources = []) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `flex gap-4 message ${sender === 'user' ? 'justify-end' : 'bot-message'}`;
    const id = 'msg-' + Date.now();
    msgDiv.id = id;
    
    let contentHtml = '';
    if (image) {
        contentHtml += `<img src="${image}" class="max-w-xs rounded mb-2 shadow-sm border border-gray-200">`;
    }
    if (text) {
        contentHtml += `<p class="text-sm leading-relaxed ${isLoading ? 'animate-pulse' : ''}">${text.replace(/\\n/g, '<br>')}</p>`;
    }
    
    // Sources are added dynamically in the bot message block if applicable

    if (sender === 'user') {
        msgDiv.innerHTML = `
            <div class="bg-[#294632] text-[#e9eee4] p-3 px-4 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] ml-auto border border-[#16402a]">
                ${contentHtml}
            </div>
            <div class="w-8 h-8 rounded-full bg-[#102516] flex items-center justify-center flex-shrink-0 text-[#b4c2ae] border border-[#294632]">
                <i class="fa-solid fa-user text-sm"></i>
            </div>
        `;
    } else {
        let botContent = '';
        if (text) {
            botContent = `<div class="text-sm prose prose-sm max-w-none prose-invert">${marked.parse(text)}</div>`;
        }
        if (sources && sources.length > 0) {
            botContent += `<div class="mt-3 pt-2 border-t border-[#294632]/50 text-[10px] text-[#b4c2ae]">
                <strong>Sources:</strong> ${sources.map(s => `<span class="bg-[#102516] px-1 py-0.5 rounded mr-1">${s}</span>`).join('')}
            </div>`;
        }
        msgDiv.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-[#d7b46a] flex items-center justify-center flex-shrink-0 text-[#16402a]">
                <i class="fa-solid fa-seedling text-lg"></i>
            </div>
            <div class="bg-[#173321] text-[#e9eee4] p-4 rounded-2xl rounded-tl-none shadow-sm border border-[#294632] max-w-[85%] bot-bubble">
                ${botContent}
            </div>
        `;
    }
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return id;
}
