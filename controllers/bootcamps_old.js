const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

/**********************************************************************/
//1
// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(201)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    // res.status(400).json({ success: false, data: null });
    next(error);
  }
};

//2
// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    // res.status(400).json({ success: false, data: null });
    next(error);
  }
};

//3
// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      // res.status(400).json({ success: false, data: null });
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    // res.status(400).json({ success: false, data: null });
    // next(
    //   new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    // );
    next(error);
  }
};

//4
// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    // res.status(400).json({ success: false, data: null });
    next(error);
  }
};

//5
// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: null });
  } catch (error) {
    // res.status(400).json({ success: false, data: null });
    next(error);
  }
};
