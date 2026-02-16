const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, '..', 'data');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(REPORTS_FILE)) fs.writeFileSync(REPORTS_FILE, '[]');

app.post('/report', (req, res) => {
  const payload = {
    receivedAt: new Date().toISOString(),
    body: req.body
  };
  try {
    const raw = fs.readFileSync(REPORTS_FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    arr.push(payload);
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(arr, null, 2));
    console.log('Saved report:', payload);
    res.status(200).json({ok:true});
  } catch (err) {
    console.error('Failed to persist report', err);
    res.status(500).json({ok:false,error:err.message});
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Receiver listening on http://localhost:${port}`));
