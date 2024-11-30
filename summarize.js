const axios = require('axios');
require('dotenv').config();


async function summarizeText(text) {
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    if (response.data && response.data[0]) {
      const resp= response.data[0].summary_text;
      console.log(resp);
      return resp;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (err) {
    console.error("Error in summarizeText:", err.message);
    throw err;
  }
}

module.exports = summarizeText;
