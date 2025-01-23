const express = require('express');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const connectDB=require('./config/connectDB')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes')
const authenticated = require('./middlewares/authenticated');
const User=require('./models/userModel');
const Chat=require('./models/chatModel');

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

app.post('/generate', authenticated, async (req, res) => {
  const { prompt } = req.body;

  // Validate if prompt exists
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    // Find the user in the database
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has enough credits
    if (user.userCredits <= 0) {
      return res.status(400).json({ message: 'Not enough credits to generate an image' });
    }

    // Prepare FormData with the prompt for ClipDrop API
    const form = new FormData();
    form.append('prompt', prompt);

    // Make the request to the ClipDrop API
    const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', form, {
      headers: {
        ...form.getHeaders(),
        'x-api-key': process.env.CLICKDROP_API_KEY, // Replace with your actual API key
      },
      responseType: 'arraybuffer', // Ensure the response is in binary form
    });

    // Convert the array buffer response to a base64 string
    const imageBuffer = Buffer.from(response.data);
    const base64Image = imageBuffer.toString('base64');
    const imageSrc = `data:image/png;base64,${base64Image}`;

    // Upload the generated image to Imgur
    const imgurUrl = await uploadImageToImgur(imageBuffer);

    // Save the image generation result in the Chat model
    const newChat = new Chat({
      userId: req.user._id,
      prompt,
      result: 'Image generated successfully',
      status: 'success',
      imageUrl: imgurUrl,  // Store Imgur URL
    });
    await newChat.save();

    // Deduct 1 credit for the successful image generation
    user.userCredits -= 1;
    await user.save();

    // Return the generated image and remaining credits to the client
    res.json({
      imageUrl: imageSrc,
      userCredits: user.userCredits,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error generating image',
      error: error.message,
    });
  }
});

// Function to upload the image to Imgur
async function uploadImageToImgur(imageBuffer) {
  try {
    const formData = new FormData();
    formData.append('image', imageBuffer, 'generated-image.png');

    const response = await axios.post('https://api.imgur.com/3/upload', formData, {
      headers: {
        'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        ...formData.getHeaders(),
      },
    });

    // Return the Imgur URL of the uploaded image
    return response.data.data.link;
  } catch (error) {
    console.error('Error uploading to Imgur:', error);
    throw new Error('Failed to generate image');
  }
}

app.use('/user',userRoutes);
app.use('/auth',authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
