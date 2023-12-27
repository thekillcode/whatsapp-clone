import { config } from 'dotenv';
config();
export const env = (value) => {
  return process.env[value];
};
