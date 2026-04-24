# ScamGuard by Team MercAttacker 🛡️
> "Thinking like attackers to protect the citizens."

# ScamGuard: The National Digital Shield 🛡️
[![Project 2030](https://img.shields.io/badge/Project-2030-blue.svg)](https://example.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Google Cloud](https://img.shields.io/badge/Deployed-Google%20Cloud%20Run-4285F4?logo=google-cloud&logoColor=white)](https://cloud.google.com/)

**ScamGuard** is an industrial-grade, dual-engine Threat Intelligence Gateway designed to protect citizens from AI-driven phishing and social engineering attacks. Developed for the **Project 2030: MyAI Future Hackathon**, it bridges the gap between complex enterprise security and everyday digital safety.

---

## 🚀 The Mission
Traditional keyword filters are failing. Scammers now use Generative AI to craft perfect, panic-inducing messages. **ScamGuard** leverages a hybrid architecture—combining deterministic mathematical heuristics with the reasoning power of **Google Gemini Pro**—to provide real-time, empathetic, and cost-effective threat analysis.

## ✨ Key Features
* **Dual-Engine Pipeline**: 80% of threats are neutralized at the edge via deterministic scoring; 20% of complex cases are explained by Agentic AI.
* **Deep URL Unfurling**: Automatically resolves shortened links (Bit.ly, TinyURL) and cross-references Google Safe Browsing.
* **Citizen Intelligence Portal**: A high-performance, HCI-optimized interface for instant threat verification.
* **The Data Flywheel**: A built-in feedback loop that crowdsources False Positive reports to generate Zero-Day threat intelligence.
* **Enterprise-Grade Performance**: Built-in Redis-style caching and rate-limiting to ensure sub-second latency and protection against DDoS.

---

## 🏗️ Technical Architecture
ScamGuard is built on a **Stateless Resilience** model, optimized for cloud-native deployment.

1.  **Ingress Layer**: Node.js/Express server protected by reCAPTCHA v3 and `express-rate-limit`.
2.  **Logic Engine**: Deterministic regex-based normalization and scoring.
3.  **Inference Layer**: Sandboxed Google Gemini Pro API for social engineering tactic explanation.
4.  **Telemetry**: Asynchronous logging of threat patterns for future model fine-tuning.

---

## 🛠️ Installation & Setup

### Prerequisites
* Node.js (v18+)
* Google Cloud SDK (for deployment)
* Gemini API Key (via Google AI Studio)

### Local Development
1. Clone the repository:
   ```bash
   git clone [https://github.com/youamar/scamguard-ai.git](https://github.com/youamar/scamguard-ai.git)
   cd scamguard-ai
