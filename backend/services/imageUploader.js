const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Your Imgur Client ID
const clientId = 'IMGUR_CLIENT_ID';

/* const uploadImageToImgur = async (imagePath) => {
  try {
    // Read the image as a Buffer
    const image = fs.readFileSync(imagePath);
    
    // Create a FormData object for the image
    const formData = new FormData();
    formData.append('image', image);
    
    // Send the request to Imgur API to upload the image
    const response = await axios.post('https://api.imgur.com/3/upload', formData, {
      headers: {
        'Authorization': `Client-ID ${clientId}`,
        ...formData.getHeaders(),  // Required for FormData
      },
    });
    
    // Get the URL of the uploaded image
    const imageUrl = response.data.data.link;
    console.log('Image uploaded successfully! URL:', imageUrl);
    
    return imageUrl;  // You can store this URL in your database
    
  } catch (error) {
    console.error('Error uploading image to Imgur:', error);
  }
};

// Example: Upload an image file from the local disk
uploadImageToImgur(path.join(__dirname, 'image.png'))
  .then((imageUrl) => {
    // Store the image URL in your database
    console.log('Image URL:', imageUrl);
  });
*/