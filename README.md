# ScamGuard: The National Digital Shield 🛡️
> **Engineered by Team MercAttacker** | *"Thinking like attackers to protect the citizens."*

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-success.svg)](https://scamguard-agent-490204017472.asia-southeast1.run.app)
[![Project 2030](https://img.shields.io/badge/Hackathon-Project_2030-blue.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ScamGuard** is an industrial-grade, dual-engine Threat Intelligence Gateway designed to protect citizens from AI-driven phishing and social engineering attacks. Developed for the **Project 2030: MyAI Future Hackathon**, it bridges the gap between complex enterprise security and everyday digital safety.

---

## 🚀 The Mission
Traditional keyword filters are failing. Scammers now use Generative AI to craft perfect, panic-inducing messages. **ScamGuard** leverages a hybrid architecture—combining deterministic mathematical heuristics with the reasoning power of **Google Gemini Pro**—to provide real-time, empathetic, and cost-effective threat analysis.

## ✨ Key Features
* **Dual-Engine Pipeline**: 80% of threats are neutralized at the edge via deterministic scoring; 20% of complex cases are explained by Agentic AI.
* **Deep URL Unfurling**: Automatically resolves shortened links (Bit.ly, TinyURL) and cross-references Google Safe Browsing.
* **Citizen Intelligence Portal**: A high-performance, HCI-optimized interface for instant threat verification.
* **The Data Flywheel**: A built-in feedback loop that crowdsources False Positive reports to generate Zero-Day threat intelligence.
* **Enterprise-Grade Performance**: Built-in caching and rate-limiting to ensure sub-second latency and protection against DDoS.

---

## 🏗️ Technical Architecture
ScamGuard is built on a **Stateless Resilience** model, optimized for cloud-native deployment.

1. **Ingress Layer**: Node.js/Express server protected by simulated reCAPTCHA v3 and `express-rate-limit`.
2. **Logic Engine**: Deterministic regex-based normalization and scoring.
3. **Inference Layer**: Sandboxed Google Gemini Pro API for social engineering tactic explanation.
4. **Telemetry**: Asynchronous logging of threat patterns for future model fine-tuning.

---

## 🛠️ Installation & Setup

### Prerequisites
* Node.js (v18+)
* Google Cloud SDK (for deployment)
* Gemini API Key (via Google AI Studio)

### Local Development
1. Clone the repository:
   ```bash
   git clone [https://github.com/youamar/ScamGuard-AI.git](https://github.com/youamar/ScamGuard-AI.git)
   cd ScamGuard-AI
