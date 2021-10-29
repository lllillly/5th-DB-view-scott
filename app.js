const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const app = express();
const PORT = 4000;

app.use(morgan(`dev`));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  const listQuery = `
    SELECT EMPNO,
            ENAME,
           JOB,
           HIREDATE,
           SAL,
           DEPTNO
      FROM EMP
    `;

  db.query(listQuery, (err, rows) => {
    res.render("main", { emps: rows });
  });
});

app.listen(PORT, () => {
  console.log("Scott View Server Start");
});
