const express = require("express");
const {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");
/*************************************/
const router = express.Router();
/************************************************************************/
router.get("/", getBootcamps);
router.post("/", createBootcamp);
router.get("/:id", getBootcamp);
router.put("/:id", updateBootcamp);
router.delete("/:id", deleteBootcamp);
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);
/************************************************************************/
module.exports = router;
