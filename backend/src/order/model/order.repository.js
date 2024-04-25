import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  const newOrder = new OrderModel(data);
  return await newOrder.save();
};

export const myOrderRepo = async (id) => {
  return await OrderModel.find({ user: id });
};
export const placedOrdersRepo = async () => {
  return await OrderModel.find({ orderStatus: "Shipped" }).populate("orderedItems.product");
 
};

export const getSingleOrderRepo = async (id) => {
  const order = await OrderModel.findById(id);
  if (!order) {
    const resp = {
      success: false,
      msg: "order not found",
    };
    return resp;
  } else {
    return order;
  }
};
