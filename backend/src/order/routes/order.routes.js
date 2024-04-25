import express from "express";
import { createNewOrder,placedOrders,myOrders,getSingleOrder,updateOrder } from "../controllers/order.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);

router.route("/:id").get(auth, getSingleOrder);
router.route("/my/orders").get(auth,myOrders);
router.route("/orders/placed").get(auth,placedOrders);
router.route("/update/:id").put(auth,authByUserRole("admin"),updateOrder);

export default router;
