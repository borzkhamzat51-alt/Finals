const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ── MongoDB Connection ──────────────────────────────────────────────────────
mongoose.connect('mongodb://localhost:27017/MyDb')
  .then(() => console.log('✅ Connected to MongoDB (MyDb)'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ── Battle Schema ───────────────────────────────────────────────────────────
const battleSchema = new mongoose.Schema({
  rapper1:    { type: String, required: true },   // Field 1
  rapper2:    { type: String, required: true },   // Field 2
  event:      { type: String, required: true },   // e.g. AHON 16
  venue:      { type: String, required: true },   // Extra field 1
  date:       { type: String, required: true },   // Extra field 2
  battleType: { type: String, required: true },   // Extra field 3: 1-on-1, Dos Por Dos, etc.
  winner:     { type: String, default: 'TBD' },
  notes:      { type: String, default: '' },
}, { timestamps: true });

const Battle = mongoose.model('Battle', battleSchema, 'Battles');

// ── ROUTES ──────────────────────────────────────────────────────────────────

app.get('/api/battles', async (req, res) => {
  try {
    const battles = await Battle.find().sort({ createdAt: -1 });
    res.json(battles);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('/api/battles/:id', async (req, res) => {
  try {
    const battle = await Battle.findById(req.params.id);
    if (!battle) return res.status(404).json({ message: 'Battle not found' });
    res.json(battle);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/battles', async (req, res) => {
  try {
    const battle = new Battle(req.body);
    const saved = await battle.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

app.put('/api/battles/:id', async (req, res) => {
  try {
    const updated = await Battle.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Battle not found' });
    res.json(updated);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

app.delete('/api/battles/:id', async (req, res) => {
  try {
    const deleted = await Battle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Battle not found' });
    res.json({ message: 'Battle deleted successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running at http://localhost:${PORT}`);
});
