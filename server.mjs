import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';

const app = express();

// --- 1. ENTERPRISE RATE LIMITER ---
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30, 
    message: { threatLevel: "Medium", analysis: "Rate limit exceeded.", recommendedAction: "Slow down." }
});

app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);

// 🌟 UI MOUNT: Resolves "Cannot GET /"
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

const TRUSTED_DOMAINS = ["hasil.gov.my", "utm.my", "bnm.gov.my", "mcmc.gov.my", "youtube.com", "youtu.be", "github.com"];
const API_KEY = process.env.GEMINI_API_KEY || "";

// --- 2. TELEMETRY DATABASE (The Honeypot) ---
const telemetryDatabase = [];

function normalizeText(text) {
    return text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').toLowerCase();
}

// --- 3. FEEDBACK LOOP API (The Data Flywheel) ---
app.post('/api/feedback', (req, res) => {
    const { text, userFeedback } = req.body;
    telemetryDatabase.push({
        timestamp: new Date().toISOString(),
        type: "FALSE_POSITIVE_REPORT",
        payload: text,
        userCorrection: userFeedback
    });
    console.log(`\n🔄 [DATA FLYWHEEL] User reported misclassification. Telemetry updated.`);
    res.json({ status: "success", message: "Telemetry updated. Thank you for contributing to National Security." });
});

// --- 4. MAIN ANALYSIS API ---
app.post('/api/analyze', async (req, res) => {
    const { text, captchaToken } = req.body;

    // 🛡️ FRONTEND SECURITY CHECK
    if (!captchaToken || captchaToken !== "hackathon-valid-token") {
        return res.status(403).json({ 
            threatLevel: "Critical", 
            analysis: "SECURITY ALERT: Automated bot traffic detected.", 
            extractedEntities: ["None"],
            recommendedAction: "Access Denied." 
        });
    }

    if (!text || text.trim().length < 5) return res.json({ threatLevel: "Low", extractedEntities: ["None"], analysis: "Input too short.", recommendedAction: "Pass." });

    const normalized = normalizeText(text);
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
    const rawUrls = text.match(urlRegex) || [];

    let heuristicScore = 0;
    rawUrls.forEach(urlStr => {
        try {
            const hostname = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`).hostname;
            const isTrusted = TRUSTED_DOMAINS.some(t => hostname === t || hostname.endsWith(`.${t}`));
            if (!isTrusted) heuristicScore += 60; 
        } catch (e) {}
    });

    if (/rm\s?\d+|\$\d+|bank|transfer|payment/i.test(normalized)) heuristicScore += 25;
    if (/urgent|immediately|within|password|acc|login/i.test(normalized)) heuristicScore += 15;

    let strictLevel = "Low";
    if (heuristicScore >= 70) strictLevel = "Critical";
    else if (heuristicScore >= 60) strictLevel = "High";
    else if (heuristicScore >= 15) strictLevel = "Medium";

    // 🌟 AI EXPLAINER (Gemini 1.5 Flash + JSON Schema)
    const prompt = `You are an elite cybersecurity analyst. 
    Threat Level is already determined as: ${strictLevel}
    Explain the manipulation tactic used in the text. Be extremely concise. Do NOT advise clicking links.
    Text to analyze: ${text}`;

    try {
        if (!API_KEY) throw new Error("GEMINI_API_KEY is missing.");

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "OBJECT",
                        properties: {
                            analysis: { type: "STRING" },
                            recommendedAction: { type: "STRING" }
                        },
                        required: ["analysis", "recommendedAction"]
                    }
                }
            })
        });
        
        if (!response.ok) throw new Error(`Google API Rejected: ${response.status}`);
        const data = await response.json();
        const finalResult = JSON.parse(data.candidates[0].content.parts[0].text);
        
        finalResult.threatLevel = strictLevel;
        finalResult.extractedEntities = rawUrls.length > 0 ? rawUrls : ["None"];
        res.json(finalResult);

    } catch (error) {
        console.error("\n⚠️ [SYSTEM ALERT] AI Node connection failed:", error.message);
        res.json({ 
            threatLevel: strictLevel, 
            extractedEntities: rawUrls.length > 0 ? rawUrls : ["None"], 
            analysis: "AI Node offline. Mathematical heuristics applied to secure this packet.", 
            recommendedAction: heuristicScore >= 60 ? "High risk detected. Do not trust this message." : "Maintain standard vigilance." 
        });
    }
});

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 ScamGuard V9.2 (Gemini 1.5 Engine) Active on port: ${PORT}`));
