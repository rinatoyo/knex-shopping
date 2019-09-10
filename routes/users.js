"use strict";

const express = require("express");
const db = require("./../database");
const router = express.Router();

router.put("/:user_id/forgot-password", (req, res) => {
  db.raw("SELECT * FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      if (results.rowCount === 0) {
        throw new Error();
      } else {
        db.raw("UPDATE users SET password = ? WHERE id = ? RETURNING *", [
          req.body.password,
          req.params.user_id
        ]).then(result => {
          res.status(200).json({ message: "New password created!" });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ message: "User not found" });
    });
});

router.delete("/:user_id", (req, res) => {
  db.raw("SELECT * FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      if (results.rowCount === 0) {
        throw new Error();
      } else {
        db.raw("DELETE FROM users WHERE id = ? RETURNING *", [
          req.params.user_id
        ]).then(results => {
          res.status(200).json({
            message: `User id: ${req.params.user_id} successfully deleted`
          });
        });
      }
    })
    .catch(err => {
      res.status(404).json({ message: "User ID not found" });
    });
});

router.get("/:user_id", (req, res) => {
  db.raw("SELECT * FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      if (results.rowCount === 0) {
        throw new Error();
      } else {
        res.status(200).json(results.rows);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ message: "User not found" });
    });
});

router.post("/login", (req, res) => {
  db.raw("SELECT * FROM users WHERE email = ?", [req.body.email])
    .then(results => {
      if (results.rowCount === 0) {
        res.status(404).json({ message: "User not found" });
      } else if (req.body.password !== results.rows[0].password) {
        res.status(401).json({ message: "Incorrect password" });
      } else {
        res.status(200).json(results.rows);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error" });
    });
});

router.post("/register", (req, res) => {
  db.raw("SELECT * FROM users WHERE EMAIL = ?", [req.body.email])
    .then(results => {
      if (results.rowCount !== 0) {
        throw new Error();
      } else {
        db.raw("INSERT INTO users (email, password) VALUES (?,?) RETURNING *", [
          req.body.email,
          req.body.password
        ]).then(results => {
          res.status(200).json({ message: "success" });
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "User already exists" });
    });
});

module.exports = router;
