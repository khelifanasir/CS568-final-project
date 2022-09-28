const { ConnectionClosedEvent } = require("mongodb");
const { default: mongoose } = require("mongoose");
const Car = require("../model/Car");
const User = require("../model/User");

exports.getAllCars = async (req, res, next) => {
  let cars;
  try {
    cars = await Car.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!cars) {
    return res.status(404).json({ message: "No Cars Found" });
  }
  return res.status(200).json({ cars });
};

exports.addCar = async (req, res, next) => {
  const { model, make, year, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to Find User By ID" });
  }
  const car = new Car({
    model,
    make,
    year,
    description,
    image,
    user,
  });
  try {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    //await car.save({ session });
    //await existingUser.save({ session });
    // await session.commitTransaction();
    await car.save();
    existingUser.cars.push(car);
    existingUser.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ car });
};

exports.updateCar = async (req, res, next) => {
  const { make, model, year, description } = req.body;
  const carId = req.params.id;
  let car;
  try {
    car = await Car.findByIdAndUpdate(carId, {
      make,
      description,
      model,
      year,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!car) {
    return res.status(500).json({ message: "Unable to update the car" });
  }
  return res.status(200).json({ car });
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;
  let car;
  try {
    car = await Car.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!car) {
    return res.status(404).json({ message: "NO Car Found, Please try again" });
  }
  return res.status(200).json({ car });
};

exports.deleteCar = async (req, res, next) => {
  const id = req.params.id;
  let car;
  try {
    car = await Car.findByIdAndRemove(id).populate("user");
    await car.user.cars.pull(car);
    await car.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!car) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "successfully deleted" });
};

exports.getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userCars;
  try {
    userCars = await User.findById(userId).populate("cars");
  } catch (error) {
    return console.log(error);
  }
  if (!userCars) {
    return res.status(404).json({ message: "No Car Founds" });
  }
  return res.status(200).json({ user: userCars });
};
