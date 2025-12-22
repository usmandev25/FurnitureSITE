import pkg from "pg";

export const pool = new pkg.Pool({
  database: "products",
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "8919",
});

pool.connect().then(() => {
  console.log("Connected to Postgres");
});
