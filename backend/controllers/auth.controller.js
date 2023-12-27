import logger from '../config/logger.config.js';

export const register = async (req, res) => {
  logger.info(JSON.stringify(req.body));
  return res.status(201).json(req.body);
};

export const login = async (req, res) => {
  return res.status(200).json('logged in successfully');
};

export const logout = async (req, res) => {
  return res.status(200).json('logged Out');
};
