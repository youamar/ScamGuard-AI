import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path'; // 🌟 新增：用于解析文件路径

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

// 🌟 新增：根目录路由，解决 "Cannot GET /" 的致命问题，直接返回你的极简 UI
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

const TRUSTED_DOMAINS = ["hasil.gov.my", "utm.my", "bnm.gov.my", "mcmc.gov.my"];
const API_KEY = process.env.GEMINI_API_KEY || "";

// --- 2. MOCK DATABASE (For Hackathon Telemetry) ---
const telemetryDatabase = [];

function normalizeText(text) {
    return text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').toLowerCase();
}

// --- 3. FEEDBACK LOOP API (The Data Flywheel) ---
app.post('/api/feedback', (req, res) => {
    const { text, reportedLevel, userFeedback } = req.body;
    
    // Log the user correction to our Honeypot/Telemetry DB
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

    // 🛡️ FRONTEND SECURITY CHECK (reCAPTCHA v3 Simulation)
    if (!captchaToken || captchaToken !== "hackathon-valid-token") {
        return res.status(403).json({ 
            threatLevel: "Critical", 
            analysis: "SECURITY ALERT: Automated bot traffic detected. Missing or invalid CAPTCHA token.", 
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

    // AI EXPLAINER
    const prompt = `You are a cybersecurity explainer. 
    Threat Level: ${strictLevel}
    Briefly explain the tactic in the text. Do NOT advise clicking links.
    JSON Format: {"analysis": "Brief explanation", "recommendedAction": "Actionable advice"}
    Text: ${text}`;

    try {
        if (!API_KEY) throw new Error("GEMINI_API_KEY is missing in environment variables.");

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        if (!response.ok) {
            const errDetails = await response.text();
            throw new Error(`Google API Rejected: ${response.status} - ${errDetails}`);
        }

        const data = await response.json();
        const cleanStr = data.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
        const finalResult = JSON.parse(cleanStr);
        
        finalResult.threatLevel = strictLevel;
        finalResult.extractedEntities = rawUrls.length > 0 ? rawUrls : ["None"];
        res.json(finalResult);

    } catch (error) {
        // 🌟 新增：V9.1 深度容灾日志，确保即使 AI 宕机，控制台也能看到原因
        console.error("\n⚠️ [SYSTEM ALERT] AI Node connection failed:");
        console.error(error.message);
        
        res.json({ 
            threatLevel: strictLevel, 
            extractedEntities: rawUrls.length > 0 ? rawUrls : ["None"], 
            analysis: "AI Node offline. Mathematical heuristics applied to secure this packet.", 
            recommendedAction: heuristicScore >= 60 ? "High risk detected. Do not trust this message." : "Maintain standard vigilance." 
        });
    }
});

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 ScamGuard V9.1 Final Active on port: ${PORT}`));
