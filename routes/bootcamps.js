const express = require("express");
const {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");

const advancedResults = require("../middleware/advancedResults");

const { protect, authorize } = require("../middleware/auth");

// Include other resource routers
const courseRouter = require("./courses");
const reviewRouter = require('./reviews');
/*************************************/
const router = express.Router();
/************************************************************************/

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);
/************************************************************************/
module.exports = router;
