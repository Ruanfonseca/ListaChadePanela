const express = require('express');
const router = express.Router();
const giftController = require('../controllers/gift.controller');

router.get('/', giftController.getAllGifts);
router.post('/', giftController.createGift);
router.patch('/:id/choose', giftController.chooseGift);
router.delete('/:id', giftController.deleteGift);

module.exports = router;
