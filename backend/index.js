const express = require('express');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const connectDB=require('./config/connectDB')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRouter=require('./routes/authRouter');
const authenticated = require('./middlewares/authenticated');
const User=require('./models/userModel')

const app = express();
const port = 5000;
require('dotenv').config();
// Middleware to parse JSON body requests
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Enable CORS for all origins (for development)
app.use(
  cors({
    origin: [
      "https://imaginate-beta.vercel.app", // Frontend production
      "http://localhost:5173", // Frontend local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies and credentials
  })
);
connectDB();


app.get('/',(req,res)=>{
  res.send('This is Imaginate API')
})

app.get('/protected', authenticated, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password'); // Exclude sensitive fields
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    message: 'User authenticated',
    user,
  });
});

// /generate route handler
app.post('/generate', authenticated, async (req, res) => {

  const { prompt } = req.body;

  // Validate if prompt exists
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  // Prepare FormData with the prompt
  const form = new FormData();
  form.append('prompt', prompt);

  try {
    // Make the request to the ClipDrop API
    const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', form, {
      headers: {
        ...form.getHeaders(), // This ensures the correct Content-Type is set
        'x-api-key': process.env.CLICKDROP_API_KEY, // Replace with your actual API key
      },
      responseType: 'arraybuffer', // Ensure the response is in binary form
    });

    // Convert the array buffer response to a base64 string
    const imageBuffer = Buffer.from(response.data);
    const base64Image = imageBuffer.toString('base64');
    const imageSrc = `data:image/png;base64,${base64Image}`;

    // Return the base64-encoded image in the response
    res.json({ imageUrl: imageSrc });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching image from ClipDrop API', error: error.message });
  }
});


app.use('/auth',authRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
