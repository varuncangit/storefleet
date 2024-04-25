// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    const data = {...req.body,user:req.user._id,paidAt:Date.now()}
  const order = await createNewOrderRepo(data);
  res.status(201).json({success:true,msg:"New Order Placed",order});
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
export const myOrders = async(req,res,next)=>{
  try {
    const id = req.user._id;
    const myOrder =    await myOrderRepo(id);
    res.status(200).json({success:true,msg:"your order",myOrder});

  } catch (error) {
    return next(new ErrorHandler(400,error));
  }
} 

export const placedOrders = async(req,res,next)=>{
  try {
    const placedOrders = await placedOrdersRepo();
    if(!placedOrders|| placedOrders.length===0){
      res.status(404).json({success:false,msg:"no shipped orders found"});
    }else{
      res.status(200).json({
        success: true,
        count: placedOrders.length,
        data: placedOrders,
      });
    }
    
  } catch (error) {
    return next(new ErrorHandler(400,error));
  }
}
export const getSingleOrder = async(req,res,next)=>{
  try {
    const id = req.params.id;
    const order = await getSingleOrderRepo(id);
    res.status(200).json({success:true,order})
  } catch (error) {
    return next(new ErrorHandler(400,error));
  }
}

export const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const updatedOrderData = req.body;

  console.log("Received request to update order with ID:", orderId);
  console.log("Updated order data:", updatedOrderData);
  
  try {
    const updatedOrder = await updateOrderRepo(orderId, updatedOrderData);
    
    console.log("Updated order from repo:", updatedOrder);
    
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    next(new ErrorHandler(500, error.message));
  }
};
