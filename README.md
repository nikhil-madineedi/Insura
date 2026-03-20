# INSURA – AI Powered Income Protection for Gig Workers

Insura is an AI-powered parametric insurance platform designed to protect delivery partners from income loss caused by external disruptions such as heavy rain, floods, heatwaves, or city shutdowns.

Delivery partners depend entirely on daily orders for income. When disruptions occur, they lose working hours and earnings. Insura provides a simple weekly protection plan that automatically compensates workers when such disruptions happen.

The platform uses AI-based risk analysis, real-time data monitoring, and parametric triggers to ensure fast, transparent, and reliable payouts.

---

## Problem Statement

India’s gig economy includes millions of delivery partners working for platforms such as:

- Swiggy  
- Zomato  
- Blinkit  
- Zepto  
- Amazon  

These workers rely on daily deliveries for income. However, external disruptions can prevent them from working.

Examples include:

- Heavy rainfall  
- Floods  
- Heatwaves  
- Curfews  
- Government shutdowns (Bandh)  

When such events occur, workers lose income immediately and currently have no reliable protection or financial safety net.

---

## Persona

### Ravi – Delivery Partner
- Age: 27  
- Platform: Swiggy  
- City: Hyderabad  
- Weekly Income: ₹4500  

### Scenario

- Ravi registers on the Insura platform  
- The system analyzes environmental and social risks in his city  
- AI recommends a suitable insurance plan  
- Ravi subscribes to a weekly protection plan  
- Heavy rain disrupts deliveries  
- The system detects disruption using real-time data  
- Ravi automatically receives compensation  

This reflects the real challenges faced by gig workers, where even a few days without work creates financial stress.

---

## Our Solution

Insura provides parametric income protection insurance for gig workers.

Instead of traditional claim-based insurance, the platform uses real-time data and predefined thresholds to detect disruptions.

When disruption conditions are met, compensation is automatically triggered without manual claims.

### Key Features

- AI-based risk scoring and plan recommendation  
- Weekly subscription-based model  
- Automatic payout triggers  
- Real-time data monitoring (weather, alerts)  
- Fraud detection with multi-layer verification  
- Manual claim support for edge cases  

---

## Weekly Premium Model

The platform uses a **Parametric Insurance Model**, where payouts are triggered automatically based on predefined conditions.

### Example Plans

| Plan     | Weekly Premium | Daily Payout | Max Weekly Payout |
|----------|--------------|-------------|------------------|
| Basic    | ₹100         | ₹200        | ₹400             |
| Standard | ₹200         | ₹400        | ₹800             |

Additionally, risk-based plans are dynamically assigned:

| Risk Level | Premium | Daily Payout | Max Weekly |
|------------|--------|-------------|------------|
| Low        | ₹125   | ₹275        | ₹700       |
| Medium     | ₹150   | ₹325        | ₹700       |
| High       | ₹175   | ₹325        | ₹700       |

---

## AI-Based Personalized Pricing

The system calculates disruption probability using environmental and social factors.

### Risk Factors

**Environmental Factors**
- Rainfall  
- Temperature  
- Flood alerts  
- Pollution  

**Social Factors**
- Curfews  
- Strikes  
- Restrictions  

### Probability Model

- Environmental Risk = Average of environmental scores  
- Social Risk = Average of social scores  
- Final Probability =  
  (0.7 × Environmental Risk) + (0.3 × Social Risk)

Based on this probability:
- Risk level is assigned (Low / Medium / High)  
- Pricing and payouts are adjusted dynamically  

---

## Application Workflow

### 1. Worker Registration
- Enter phone number  
- Select city  
- Link delivery platform (optional)  

### 2. AI Risk Assessment
- System fetches real-time and historical data  
- Risk score is calculated  
- Worker is assigned a risk category  

### 3. Plan Selection
- Worker selects a plan (AI-recommended or manual)  
- Payment is completed  
- Policy is activated  

### 4. Continuous Monitoring
- System monitors:
  - Weather APIs  
  - Disaster alerts  
  - Government notifications  

### 5. Disruption Detection
- Events are detected using parametric triggers  

### 6. Fraud Verification
- Multi-layer validation ensures authenticity  

### 7. Instant Payout
- Compensation is automatically credited  

---

## Parametric Trigger System

The platform uses predefined thresholds to detect disruptions.

| Event        | Trigger Condition |
|-------------|-----------------|
| Heavy Rain  | Rainfall above threshold |
| Heatwave    | Temperature above threshold |
| Flood       | Government flood alert |
| Curfew      | Official announcement |

Once triggered, payouts are automatically processed.

---

## Claim Processing

### Automatic Claims (AI Triggered)

- System detects disruption  
- Verifies event data  
- Identifies affected workers  
- Approves and processes payout  

### Manual Claims

- Worker submits request  
- Admin reviews claim  
- Compensation is processed if valid  

This ensures fairness and reduces false negatives.

---

## AI in the System

### Risk Assessment
AI analyzes environmental and disruption data to assign risk levels.

### Dynamic Pricing
Premium and payouts are adjusted based on:
- location risk  
- historical patterns  

### Fraud Detection

The system prevents fraud using:

- IP and GPS validation  
- Device and sensor verification  
- Behavioral analysis  
- Detection of fraud rings and coordinated attacks  

Claims are classified as:
- Low Risk → Auto approved  
- Medium Risk → Review  
- High Risk → Investigation  

---

## Platform Choice

The system is built as a web application.

### Advantages

- Accessible across all devices  
- No installation required  
- Faster deployment  
- Easy scalability  

---

## Technology Stack

### Frontend
- React  
- CSS  

### Backend
- Spring Boot  

### Database
- MySQL  

### Cloud & APIs
- AWS (Lambda, API Gateway)  
- OpenWeather API  

---

## Project Vision

Insura aims to create a reliable financial safety net for gig workers.

By combining:
- AI-based risk analysis  
- Real-time environmental data  
- Parametric insurance models  
- Fraud-resistant systems  

the platform delivers fast, transparent, and scalable income protection for gig workers in India.

---
