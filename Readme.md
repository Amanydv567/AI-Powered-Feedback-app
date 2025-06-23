#🤖 AI Feedback App

A simple AI-powered feedback app built using **React**, **Node.js**, and **MongoDB**.  
The app generates mock AI feedback (no OpenAI key needed) and stores user responses in a database.
)


##🛠 How to Run Locally

##1. Clone the Project
```bash
git clone https://github.com/your-username/ai-feedback-app.git
cd ai-feedback-app

##1. Backened Setup

1.cd server
  npm install


2.Create a .env file inside /server using .env.example
   MONGO_URI=mongodb://localhost:27017/feedback-app
   PORT=5000


3.Start MongoDB (if not already running):
  mongod


Then run backened
node app.js

3.Frontend Setup

cd ./client
npm install

Add this line to client/package.json:
"proxy": "http://localhost:5000"

Then start the react app
npm start

📦 Folder Structure
/client         → React frontend  
/server         → Express backend with MongoDB  
.env.example    → Sample env config  
README.md       → Project instructions


🌐 API Endpoints
POST /api/feedback – Submit user input and get AI feedback
GET /api/history – Fetch last 10 saved feedbacks

✅ Notes
 No API key or deployment required (mock AI used)
 MongoDB used locally for development




