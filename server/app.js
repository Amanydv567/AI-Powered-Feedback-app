const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://feedbackuser:feedback@cluster0.rog5srb.mongodb.net/feedbackDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB Error:', err));

//  MongoDB Schema
const feedbackSchema = new mongoose.Schema({
  user_input: String,
  feedback: String,
  timestamp: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Mock AI Function (instead of real API)
function getMockFeedback(input) {
  const responses = [
    `Great point! Your response "${input.slice(0, 30)}..." shows good thinking.`,
    `Interesting! You could expand more on this idea.`,
    `Well written! Consider adding examples to support your point.`,
    `Good insight! What other perspectives could strengthen this?`,
    `Nice work! This shows clear understanding of the topic.`
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// API Routes

// POST /api/feedback 
app.post('/api/feedback', async (req, res) => {
  try {
    const { user_input } = req.body;
    
    if (!user_input) {
      return res.status(400).json({ error: 'Please enter some text' });
    }

    // Get mock AI feedback
    const feedback = getMockFeedback(user_input);
    
    // Save to database
    const newFeedback = new Feedback({
      user_input,
      feedback
    });
    
    await newFeedback.save();
    
    res.json({
      user_input,
      feedback,
      timestamp: new Date()
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET /api/history 
app.get('/api/history', async (req, res) => {
  try {
    const history = await Feedback.find()
      .sort({ timestamp: -1 })
      .limit(10);
    
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not get history' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
