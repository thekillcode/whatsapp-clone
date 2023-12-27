import { config } from 'dotenv';
import PropTypes from 'prop-types';
config({ path: `.env.${process.env.NODE_ENV}` });
export const env = (value) => {
  return process.env[value];
};
env.prototype = {
  value: PropTypes.string,
};
