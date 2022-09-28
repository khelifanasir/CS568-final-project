const express = require("express");

const carController = require("../controllers/carController");

const router = express.Router();

router.get("/", carController.getAllCars);
router.post("/add", carController.addCar);
router.put("/update/:id", carController.updateCar);
router.get("/:id", carController.getById);
router.delete("/:id", carController.deleteCar);
router.get("/user/:id", carController.getByUserId);
module.exports = router;
