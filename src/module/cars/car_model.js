import { pool } from "../../utils/pg.js";

const getCars = async () => {
  const res = await pool.query(`SELECT 
    cars.car_id, 
    cars.car_name, 
    cars.car_image,
    brends.brend_name,
    brends.brend_image
      FROM 
    cars 
      JOIN 
    brends 
      ON 
    cars.brend_id = brends.brend_id;`);
  return res.rows;
};

const getCarById = async (id) => {
  const res = await pool.query('SELECT * FROM cars WHERE car_id = $1', [id]);
  return res.rows[0];
};

const createCar = async (car_name, car_image, car_brend) => {
  const res = await pool.query(
    'INSERT INTO cars (car_name, car_image, car_brend) VALUES ($1, $2, $3) RETURNING *',
    [car_name, car_image, car_brend]
  );
  return res.rows[0];
};

const updateCar = async (id, car_name, car_image, car_brend) => {
  const res = await pool.query(
    'UPDATE cars SET car_name = $1, car_image = $2 , car_brend = $3 WHERE car_id = $4 RETURNING *',
    [car_name, car_image, car_brend, id]
  );
  return res.rows[0];
};

const deleteCar = async (id) => {
  const res = await pool.query('DELETE FROM cars WHERE car_id = $1 RETURNING *', [id]);
  return res.rows[0];
};

export { getCars, getCarById, createCar, updateCar, deleteCar };
