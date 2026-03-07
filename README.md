# Insura – AI Powered Income Protection for Gig Workers

Insura is an AI-powered insurance platform designed to protect delivery partners from **income loss caused by external disruptions** such as heavy rain, floods, or city shutdowns.

Delivery partners depend on daily orders for income. When disruptions occur, they lose working hours and earnings. Insura provides a **simple weekly protection plan that automatically compensates workers when such disruptions happen.**

The platform uses **AI-based risk analysis and parametric insurance triggers** to provide fast and transparent payouts.

---

# Problem Statement

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
- Government shutdowns  

When such events occur, workers lose income immediately and currently **have no reliable protection for lost earnings.**

---

# Persona

### Ravi – Delivery Partner

- Age: 27  
- Platform: Swiggy  
- City: Hyderabad  
- Weekly Income: ₹4500  

### Scenario

1. Ravi registers on the Insura platform.
2. The system analyzes environmental risks in his city.
3. AI recommends an insurance plan suitable for his location.
4. Ravi subscribes to the weekly protection plan.
5. Heavy rain stops deliveries in the city.
6. The system detects the disruption using weather data.
7. Ravi automatically receives a compensation payout.

---

# Our Solution

Insura provides **parametric income protection insurance** for gig workers.

Instead of traditional claim processes, the platform uses **data-driven triggers** to detect disruptions.

When a disruption crosses a predefined threshold, the system automatically triggers compensation for affected workers.

Key features:

- AI-based plan recommendation
- Weekly subscription model
- Automatic payout triggers
- Fraud detection
- Manual claim verification if needed

---

# Weekly Premium Model

The platform uses a **Parametric Insurance Model**.

This means payouts are triggered automatically when predefined conditions are met.

### Example Plans

| Plan | Weekly Premium | Coverage |
|-----|-----|-----|
| Basic | ₹50 | ₹1000 payout |
| Standard | ₹80 | ₹1500 payout |
| Pro | ₹120 | ₹2500 payout |

### AI-Based Personalized Pricing

When a worker registers, the system analyzes **risk factors of their location**, such as:

- rainfall frequency  
- flood history  
- temperature patterns  
- disruption history  

Based on this data, AI recommends a suitable plan.

Example:

AI Recommendation → **Standard Plan**

However, workers can still choose any plan they prefer.

The AI can also dynamically adjust:

- weekly premium
- payout coverage

depending on the **risk level of the worker’s location.**

---

# Application Workflow

## 1. Worker Registration

The worker signs up by:

- entering phone number
- selecting their city
- optionally linking their delivery platform

The system stores worker details and location data.

---

## 2. AI Plan Recommendation

After registration, the system performs **AI-based risk analysis** using historical environmental data.

The AI recommends the best plan based on the worker’s city risk profile.

Workers can either:

- accept the AI recommended plan  
- select their own plan manually

---

# Monitoring Events

The system continuously monitors real-world data sources such as:

- weather APIs
- disaster alerts
- government notifications

These data sources help detect events that may prevent workers from delivering orders.

---

# Parametric Trigger System

The platform uses **parametric triggers** to detect disruptions.

Example triggers:

| Event | Trigger |
|------|------|
Heavy Rain | Rainfall above threshold |
Heatwave | Temperature above threshold |
Flood Warning | Government flood alert |
Curfew | Official shutdown announcement |

Once a threshold is crossed, the system automatically triggers compensation.

---

# Claim Processing

Insura supports **two types of claims**.

## Automatic Claims (AI Triggered)

If disruption conditions are detected:

1. System verifies event data.
2. Affected workers are identified.
3. Claims are automatically approved.
4. Compensation is processed.

This ensures **fast and transparent payouts**.

---

## Manual Claims

Sometimes automatic detection may miss an event.

In such cases:

1. Worker submits a manual claim.
2. Admin or human verifier reviews the request.
3. If approved, compensation is processed.

This ensures:

- fair handling of edge cases
- reduced fraud
- better reliability

---

# AI in the System

AI is used in several parts of the platform.

## Risk Assessment

AI analyzes environmental and disruption data to determine the risk level of each city.

This helps recommend the best insurance plan for workers.

---

## Dynamic Pricing

Machine learning models can adjust:

- weekly premium
- coverage amount

based on local disruption risk.

---

## Fraud Detection

AI detects suspicious activity such as:

- duplicate accounts
- repeated unusual claims
- abnormal claim patterns

This helps prevent fraud in the system.

---

# Platform Choice

The system is built as a **Web Application**.

### Advantages

- Faster development
- Accessible on all devices
- No installation required
- Easy deployment

Workers can access the platform through any web browser.

---

# Technology Stack

### Frontend

- React
- Tailwind CSS

### Backend

- Spring Boot (Java)

### Database

- MongoDB

---

# Project Vision

Insura aims to create a **financial safety net for gig workers during unpredictable disruptions**.

By combining:

- AI-based risk analysis  
- environmental data  
- parametric insurance models  

the platform enables **fast, transparent, and reliable income protection** for delivery workers in India's growing gig economy.
