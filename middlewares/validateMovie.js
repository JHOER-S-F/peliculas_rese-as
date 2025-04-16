module.exports = (req, res, next) => {
    const { title, year, description } = req.body;
  
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'El título es requerido y debe ser un string' });
    }
  
    if (!year || typeof year !== 'number') {
      return res.status(400).json({ error: 'El año es requerido y debe ser un número' });
    }
  
    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'La descripción es requerida y debe ser un string' });
    }
  
    next();
  };
  