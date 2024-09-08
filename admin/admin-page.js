const express = require('express');
const app = express();
const axios = require('axios');

// Assume the existing page is at http://example.com/api/data
app.get('/admin', (req, res) => {
  axios.get('http://example.com/api/data')
    .then(response => {
      const data = response.data;
      res.render('admin', { data });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching data');
    });
});

app.post('/admin/update', (req, res) => {
  const updates = req.body;
  axios.post('http://example.com/api/update', updates)
    .then(response => {
      res.send('Data updated successfully');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error updating data');
    });
});

app.listen(3000, () => {
  console.log('Admin page listening on port 3000');
});