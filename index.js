const express = require('express');
const summarizeText = require('./summarize.js');

const app = express();
const port = 3000;


if (!process.env.ACCESS_TOKEN) {
  console.error("ACCESS_TOKEN environment variable is not set.");
  process.exit(1);
}

app.use(express.json());
app.use(express.static('public'));

app.post("/summarize", async (req, res) => {
  const text = req.body.text_to_summarize;

  if (!text) {
    return res.status(400).send({ error: "Text to summarize is required." });
  }

  try {
    const summary = await summarizeText(text);
    res.send( summary );
  } catch (error) {
    console.error("Error in /summarize route:", error.message);
    res.status(500).send({ error: "Failed to summarize text. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
