**Title: GitHub Repository Analyzer PWA**

**About**:A Progressive Web App (PWA) built with React that analyzes any public GitHub repository. It shows repository stats, language usage, commit activity, and AI-powered insights. Works **offline**, is **installable**, and provides a smooth dashboard-like experience.

**Features**

📊 **Core Statistics**: Stars ⭐, forks 🍴, issues 🐛, license 📄 , 🔗 Repo Link, 👤 Owner \
🧩 **Language Composition Chart**: Interactive pie chart of repo languages  
📈 **Commit Activity Graph**: Weekly commit activity over the last year  
🤖 **AI-Generated Insights**:
  - Repository summary  
  - Language analysis  
  - Contribution patterns  
📱 **PWA**: Installable & offline-capable

**Tech Stack**

 **Frontend**: React (Vite)  
 **Charts**: Recharts  
 **AI Insights**: Gemini API (Google Generative AI)  
 **Deployment**: Vercel  
 **PWA**: Service Worker + Manifest  

 Live URL: https://git-hub-repository-analyzer-liart.vercel.app/ 

 Screenshots: 
<img width="1920" height="1020" alt="glimpse1" src="https://github.com/user-attachments/assets/aa7a07cf-78ea-4ad5-a387-08c25bf41293" />  <br>
<img width="1920" height="1020" alt="glimpse2" src="https://github.com/user-attachments/assets/7731b86f-d00c-472e-9e31-191ab17a9363" /> <br>
<img width="1920" height="1020" alt="glimpse3" src="https://github.com/user-attachments/assets/a4ba497e-466b-439e-bf54-7e99022b37da" /> <br>
<img width="1920" height="1020" alt="glimpse4" src="https://github.com/user-attachments/assets/18e6f739-cf40-47db-9cbc-ac2aab26de4d" /> <br>

STEPS TO RUN THE PWA LOCALLY:  (Run the commands on Git Bash or VS Code)
1. **Clone the repo**
  
   git clone https://github.com/Ankita-Giri117/GitHub-Repository-Analyzer.git  \
   cd GitHub-Repository-Analyzer

2. **Install dependencies**
   
   npm install
   
3. **Run locally**
   Create a .env file and add the following: \
   VITE_GITHUB_TOKEN=your_github_token \
   VITE_GEMINI_API_KEY=your_gemini_api_key
   
🔑 *How to get these keys*
1. GitHub Token
 -Open your GitHub account, Go to GitHub Settings → Developer Settings → Personal Access Tokens.
 -Click "Generate new token (classic)".
 -Give it a name (e.g., "Analyzer App") and select scopes:
   * repo (to read repo data)
   * read:user
  -Generate and copy the token.
  -Paste it into .env as VITE_GITHUB_TOKEN.

2. Generative AI API Key
 -Go to Google AI Studio.
 -Sign in with your Google account.
 -Create a new API key from Get API Key.
 -Copy the key and paste into .env as VITE_API_KEY.

4. **Run locally**
   npm run dev  \

   Then open the link that looks like http://localhost:5173
   
6. **Build for production**
   npm run build  \
   npm run preview

**PWA Features**
-Installable on desktop & mobile
-Works offline (service workers enabled)
-Responsive layout

Author: <br>
Made with ❤️ by Ankita Giri  \
08/09/25
