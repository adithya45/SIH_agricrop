const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/predict', async (req, res) => {
  try {
    const form = new FormData();
    form.append('image', req.files.image);

    const response = await axios.post('http://localhost:5000/predict', form, {
      headers: form.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Prediction failed' });
  }
});

module.exports = router;
