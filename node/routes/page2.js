const express = require('express');
const router = express.Router();

router.route('/:id').get((req, res) => {
    res.status(200).json({msg:`Hello World!${req.params.id}`})    
})

module.exports = router;