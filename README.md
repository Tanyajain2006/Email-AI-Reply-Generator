# 💌 AI-Powered Email Reply Generator for Gmail

This project is a powerful **Chrome extension** that integrates directly into the **Gmail interface** to provide intelligent, context-aware reply suggestions. By leveraging **Google's Gemini API**, this tool helps users manage email overload by reducing the time and cognitive effort required to compose thoughtful responses.

<img width="1304" height="637" alt="image" src="https://github.com/user-attachments/assets/866dcabe-af4d-4667-9b08-7696c9373182" />

---

## 🚀 Key Features

- **Seamless Gmail Integration:**  
  Injects a simple "Generate AI Reply" button directly into the Gmail compose window, providing a native and non-intrusive user experience.

- **Context-Aware Suggestions:**  
  Analyzes the content of the email thread to generate relevant and appropriately toned reply suggestions.

- **One-Click Insertion:**  
  Allows users to insert a chosen AI-generated reply directly into the email body with a single click.

- **Secure Architecture:**  
  Built with a secure three-tier architecture that protects sensitive API keys by handling all AI interactions on the backend, never exposing them to the client.

- **Modern Tech Stack:**  
  Developed using a robust, industry-standard technology stack including **React.js** for the frontend and **SpringBoot** for the backend.

---

## 🛠️ Technology Stack

| **Category**          | **Technology/Tool**                       |
|-----------------------|-------------------------------------------|
| **Frontend**          | React.js, JavaScript, HTML5, CSS3         |
| **Backend**           | Java, SpringBoot Framework                |
| **AI Service**        | Google Gemini API                         |
| **Development Tools** | VS Code, IntelliJ, Postman, Git           |
| **Build Tools**       | Webpack, Node.js, Maven                   |
| **API Testing**       | Postman                                   |

---

## 🏛️ System Architecture

The application follows a **three-tier architecture** to ensure a clear separation of concerns, security, and scalability:

### 🧩 Frontend (Chrome Extension)
A **React.js** application that runs in the user's browser.  
Responsible for rendering the UI within Gmail, capturing user interactions, and communicating with the backend service.

<img width="712" height="538" alt="image" src="https://github.com/user-attachments/assets/9349b2a7-3e12-4fb0-9919-ce278d75b14c" />

### ⚙️ Backend (SpringBoot Microservice)
A **Java SpringBoot RESTful API** that serves as the application's core.  
Handles business logic, prompt engineering, and securely communicates with the Gemini API.

### 🧠 AI Service (Google Gemini API)
Provides the **generative AI capabilities**.  
All requests are proxied through the backend to protect credentials.

<img width="932" height="621" alt="image" src="https://github.com/user-attachments/assets/af0d4e94-0c6d-47d2-9aad-fff25a623c1d" />

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### ✅ Prerequisites
- Node.js and npm  
- Java Development Kit (JDK) 17 or later  
- Apache Maven  
- MySQL Server  
- Google Gemini API Key

---
