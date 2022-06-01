const express = require("express");
const router = express.Router();
const usersRepo = require("../usersRepo");
const { giveToken } = require("../middleware");

router.post("/register", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await usersRepo.register(email, password);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/login",
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userEmail = await usersRepo.login(email, password);
      req.user = { email: userEmail };
      next();
    } catch (e) {
      next(e);
    }
  },
  giveToken
);

router.get("/", async (req, res, next) => {
  try {
    const users = await usersRepo.getUsers();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.patch("/add-score", async (req, res, next) => {
  const { email, score } = req.body;
  try {
    await usersRepo.addScore(email, score);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
