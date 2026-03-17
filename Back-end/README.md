# Real-Time Fraud Loan Detection 🚀

This project implements a **serverless, AI-powered loan fraud detection system** using AWS Lambda, DynamoDB, S3, and Amazon Bedrock. It automates document ingestion, identity verification, credit scoring, and fraud detection in real time.

---

## 📂 Components Overview

### 1. `dataCollector_1612` (Lambda Function)
- **Purpose:** Intake engine for loan-related documents (identity proofs, bank statements).
- **Storage:** Uploads files to `applicant-docs-ssss` S3 bucket.
- **Workflow:** Receives JSON payload → validates → decodes Base64 → stores securely in S3.

---

### 2. `idpDrivingLicense`
- **Purpose:** Automated OCR engine for Driver’s License verification.
- **Tech:** AWS Textract (AnalyzeID).
- **Workflow:** Extracts fields (Name, Address, License Number, DOB) → standardizes → returns JSON.

---

### 3. `GetLatestApplications`
- **Purpose:** Real-time feed for Leadership Dashboard.
- **Tech:** DynamoDB + CORS-enabled API.
- **Workflow:** GET `/dashboard` → fetches latest applications → formats risk metrics for UI.

---

### 4. `AddressAgent`
- **Purpose:** Central KYC Orchestrator.
- **Workflow:** Fetches applicant form data → retrieves license docs → runs OCR → matches SSN → AI adjudication via Bedrock → Approve/Reject/Review.

---

### 5. `CalculateCreditScore`
- **Purpose:** Auto credit scoring via DynamoDB Streams.
- **Workflow:** Triggered on new application insert → extracts income → assigns score range → updates applicant record.

---

### 6. `SSNmasterDB`
- **Purpose:** Final underwriting & fraud detection.
- **Workflow:** Invokes `AddressAgent` → syncs SSN with Master Database → AI anomaly detection via Bedrock → applies credit score guardrails:
  - ≥ 630 → Auto-Approved  
  - 541–629 → Manual Review  
  - ≤ 540 → Auto-Rejected  

---

### 7. `GetApplicantDetails`
- **Purpose:** Data retrieval for dashboard.
- **Workflow:** Queries `ApplicantData` table → fetches latest submission → maps internal fields → returns user-friendly JSON.

---

## 🛠️ Technologies Used
- **AWS Lambda** – Serverless compute  
- **Amazon S3** – Document storage  
- **Amazon DynamoDB** – Applicant & Master data  
- **Amazon Textract (AnalyzeID)** – OCR for Driver’s Licenses  
- **Amazon Bedrock (Claude 3.5 Sonnet)** – AI-powered fraud detection  
- **Python Libraries:** boto3, json, os, logging, random  

---

## ✅ Key Features
- Real-time fraud detection  
- Automated KYC verification  
- AI-powered anomaly detection  
- Credit scoring simulation  
- Leadership dashboard integration  
- Explainable AI (XAI) summaries  

---

## 📊 System Flow
1. Document Upload → S3  
2. OCR Extraction → Textract  
3. Form + Master Data Sync → DynamoDB  
4. AI Adjudication → Bedrock  
5. Credit Scoring → DynamoDB Streams  
6. Final Decision → Dashboard  

---

## 🚨 Fraud Detection Example
- Applicant enters false DOB.  
- License + Master DB show correct DOB.  
- System detects mismatch → **Rejected**.  

---

## 📌 Conclusion
This project demonstrates a **scalable, serverless fraud detection system** for loan applications, combining **AI, OCR, and real-time data pipelines** to prevent identity fraud and streamline underwriting.
