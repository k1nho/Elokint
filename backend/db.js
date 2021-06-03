// pool instance and dotenv configuration
const Pool = require("pg").Pool;
require("dotenv").config();

// development configuration
const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

// production configuration
const productionConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? productionConfig : devConfig
);

module.exports = pool;
