# ScamGuard: The National Digital Shield 🛡️
> **Engineered by Team MercAttacker** | *"Thinking like attackers to protect the citizens."*

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-success.svg)](https://scamguard-agent-490204017472.asia-southeast1.run.app)
[![Pitch Video](https://img.shields.io/badge/Pitch_Video-YouTube-FF0000.svg)](#) 
[![Project 2030](https://img.shields.io/badge/Hackathon-Project_2030-blue.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ScamGuard** is an industrial-grade, dual-engine Threat Intelligence Gateway designed to protect citizens from AI-driven phishing and social engineering attacks. Developed for the **Project 2030: MyAI Future Hackathon**, it bridges the gap between complex enterprise security and everyday digital safety.

---

## 🎥 1. Hackathon Deliverables
* **[Live Citizen Portal](https://scamguard-agent-490204017472.asia-southeast1.run.app)**: The live Edge Gateway deployment (Accessible without login).
* **[The MercAttacker Pitch Video](#)**: A 5-minute demonstration of our Dual-Engine Pipeline and UI/UX flow. *(Note: Replace # with your YouTube/Drive link)*
* **[Architecture Pitch Deck](./ScamGuard_MercAttacker_Pitch.pdf)**: The complete business, economic, and technical breakdown.

---

## 🔬 2. Threat Landscape Research (The "Why")
Malaysia loses hundreds of millions annually to digital scams. Our red-team analysis revealed a critical shift in attacker methodology:
* **The Death of Static Filters:** Scammers now use Generative AI to craft grammatically perfect, highly personalized phishing messages (e.g., LHDN tax refunds, Telco point expirations).
* **Zero-Width Obfuscation:** Attackers bypass traditional Regex filters using open redirects and URL shorteners.
* **The Asymmetry of Defense:** While corporations deploy million-dollar SOCs (Security Operations Centers), everyday citizens are left defending themselves with basic intuition. 

**Our Conclusion:** We need a citizen-facing portal powered by enterprise-grade, cost-optimized intelligence.

---

## 🛠️ 3. Development Focus: The Dual-Engine Architecture
Building an AI gateway for 30 million citizens creates a massive cost and latency bottleneck if every message is sent to a Large Language Model (LLM). Team MercAttacker's primary development focus was **Cost-Optimized Accuracy**.

We architected a **Dual-Engine Pipeline**:
1. **Engine 1: Deterministic Heuristics (The Edge Shield)** * We intercept the payload and mathematically score it based on deep URL unfurling, known trusted domains (e.g., `.gov.my`), and financial urgency keywords.
   * **Result:** 80% of obvious threats or safe messages are handled here at **zero AI cost** and **<100ms latency**.
2. **Engine 2: Agentic AI Explainer (The Gemini Layer)**
   * Only ambiguous or highly sophisticated social engineering attacks are routed to the sandboxed Google Gemini Pro API.
   * Gemini is strictly prompted to act as an "Explainer," translating the deterministic threat score into empathetic, actionable human language.

---

## ⚠️ 4. Known Limitations & Engineering Trade-offs
*Built within a 24-hour hackathon window, we made deliberate architectural trade-offs to prioritize end-to-end logical flow over production readiness. We proudly document these here:*

| Current Hackathon Implementation | Production Roadmap (Post-Hackathon) | Reason for Trade-off |
| :--- | :--- | :--- |
| **Simulated reCAPTCHA v3:** Hardcoded token bypass in `server.mjs`. | **Google reCAPTCHA Enterprise:** Integration to prevent automated bot DDoS attacks. | Prioritized UX flow demonstration over complex third-party API handshakes in a limited timeframe. |
| **In-Memory Telemetry Database:** "False Positive" reports are stored in an ephemeral array. | **Google BigQuery Integration:** Persistent data lake for threat intelligence aggregation. | Cloud Run is stateless; a real DB requires VPC peering setup which exceeds the 24h limit. |
| **Regex-Heavy Heuristics:** Current baseline scoring relies on hardcoded keyword weights. | **Gemma-2B Local Fine-tuning:** Training an open-weight model on Malaysian dialects (Manglish) for edge-scoring. | MVP validation needed a deterministic baseline before introducing ML-model drift. |

---

## 🔄 5. The Data Flywheel (Citizen Telemetry)
We implemented a **"Report False Positive"** loop directly into the UX. When the AI misclassifies a threat, citizens can flag it. This creates a crowdsourced Honeypot, transforming users from passive victims into active threat-intelligence probes. This data is critical for our Phase 2 roadmap: training localized defense models to detect Zero-Day threats.

---

## 💻 6. Installation & Setup

### Prerequisites
* Node.js (v18+)
* Google Cloud SDK (for deployment)
* Gemini API Key (via Google AI Studio)

### Local Development
```bash
# 1. Clone the repository
git clone [https://github.com/youamar/ScamGuard-AI.git](https://github.com/youamar/ScamGuard-AI.git)
cd ScamGuard-AI

# 2. Install dependencies
npm install

# 3. Set environment variables
export GEMINI_API_KEY="your_api_key_here"

# 4. Start the Edge Gateway
node server.mjs
