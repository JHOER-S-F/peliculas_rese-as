module.exports = (req, res, next) => {
    const { rating } = req.body;
  
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'El rating debe ser un número entre 1 y 5' });
    }
  
    next();
  };
  