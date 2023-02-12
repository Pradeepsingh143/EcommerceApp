import Coupon from "../models/coupon.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";

/**********************************************************
 * @CREATE_COUPON
 * @route https://localhost:5000/api/coupon/add
 * @description Controller used for creating a new coupon
 * @description Only admin and Moderator can create the coupon
 * @returns Coupon Object with success message "Coupon Created SuccessFully"
 *********************************************************/
export const addCoupon = asyncHandler(async (req, res) => {
  const { code, discount } = req.body;

  if (!(code && discount)) {
    throw new CustomError("Coupon code is required", 400);
  }

  let existCoupon = await Coupon.find({code});
 
  if (existCoupon.length !== 0) {
    throw new CustomError("Coupon code already registered please choose different code", 400);
  }

  existCoupon = undefined

  const discountInNumber = +discount;

  const coupon = await Coupon.create({
    code,
    discount: discountInNumber,
  });

  res.status(200).json({
    success: true,
    message: "coupon successfully created",
    coupon,
  });
});

/**********************************************************
 * @DEACTIVATE_COUPON
 * @route https://localhost:5000/api/coupon/deactive/:id
 * @description Controller used for deactivating the coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Coupon Object with success message "Coupon Deactivated SuccessFully"
 *********************************************************/
export const deactivateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError("coupon id is required", 400);
  }

  // upade isActive status to false and runvalidator
  let coupon = await Coupon.findByIdAndUpdate(
    id,
    { isActive: false },
    { runValidators: false }
  );

  if (!coupon) {
    throw new CustomError("Coupon not found", 400);
  }

  coupon = undefined

  res.status(200).json({
    success: true,
    message: "coupon deactivated successfully",
  });
});


/**********************************************************
 * @ACTIVATE_COUPON
 * @route https://localhost:5000/api/coupon/activate/:id
 * @description Controller used for activating the coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Coupon Object with success message "Coupon activated SuccessFully"
 *********************************************************/
export const activateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError("coupon id is required", 400);
  }

  // upade isActive status to false and runvalidator
  let coupon = await Coupon.findByIdAndUpdate(
    id,
    { isActive: true },
    { runValidators: false }
  );

  if (!coupon) {
    throw new CustomError("Coupon not found", 400);
  }

  coupon = undefined

  res.status(200).json({
    success: true,
    message: "coupon activated successfully",
  });
});


/**********************************************************
 * @DELETE_COUPON
 * @route https://localhost:5000/api/coupon/delete:id
 * @description Controller used for deleting the coupon
 * @description Only admin and Moderator can delete the coupon
 * @returns Success Message "Coupon Deleted SuccessFully"
 *********************************************************/
export const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // delete coupon from db
    let coupon = await Coupon.findByIdAndDelete(id);
  
    if (!coupon) {
      throw new CustomError("Coupon not found", 400);
    }
  
    coupon = null
  
    res.status(200).json({
      success: true,
      message: "coupon deleted successfully",
    });
  });
  

/**********************************************************
 * @GET_ALL_COUPONS
 * @route https://localhost:5000/api/coupon/get
 * @description Controller used for getting all coupons details
 * @description Only admin and Moderator can get all the coupons
 * @returns allCoupons Object
 *********************************************************/
export const getAllCoupon = asyncHandler(async (req, res) => {

    // get all coupon list
    const coupon = await Coupon.find({});
  
    if (!coupon) {
      throw new CustomError("No Coupon found", 400);
    }
  
    res.status(200).json({
      success: true,
      message: "coupon deleted successfully",
      coupon
    });
  });