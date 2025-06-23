const Gift = require('../models/gift.model');

// GET /gifts
exports.getAllGifts = async (req, res) => {
  const gifts = await Gift.findAll();
  res.json(gifts);
};

// POST /gifts
exports.createGift = async (req, res) => {
  const gift = await Gift.create(req.body);
  res.status(201).json(gift);
};

// PATCH /gifts/:id/choose
exports.chooseGift = async (req, res) => {
  const { name, whatsapp } = req.body;
  const gift = await Gift.findByPk(req.params.id);
  if (!gift) return res.status(404).json({ error: 'Gift not found' });

  gift.available = false;
  gift.chosenBy = name;
  gift.chosenByWhatsApp = whatsapp;
  await gift.save();

  res.json(gift);
};

// DELETE /gifts/:id
exports.deleteGift = async (req, res) => {
  const deleted = await Gift.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).json({ error: 'Gift not found' });
  res.json({ message: 'Gift deleted' });
};
