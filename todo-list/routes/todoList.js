const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();


const todoListController = require('../controllers/todoListController');

router.post("/create-task", todoListController.createTask);
router.put("/update-task/:name", todoListController.updateOneTask);
router.delete("/delete-one/:name", todoListController.deleteOneTask);
router.delete("/delete-multi/", todoListController.deleteMultipleTasks);
router.post("/create-multi", todoListController.createMultipleTasks);
router.get("/all", todoListController.getAllTasks);

module.exports = router;