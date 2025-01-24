const axios = require('axios');
const FormData = require('form-data');


const uploadImageToImgur =async (imageBuffer)=> {
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

module.exports={uploadImageToImgur}