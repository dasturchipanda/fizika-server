import Joi from 'joi';

const carSchema = Joi.object({
  car_name: Joi.string().max(126).required(),
  car_image: Joi.string().required(),
});

const validateCar = (req, res, next) => {
  const { error } = carSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export { validateCar };
