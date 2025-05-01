import express from "express";
import { createProductHandler,getAllProductsHandler,getProductByIdHandler,updateProductHandler,deleteProductHandler} from "../controllers/productController";

const router = express.Router();
router.post("/products", createProductHandler);
router.get("/products", getAllProductsHandler);
router.get("/products/:id", getProductByIdHandler);
router.put("/products/:id", updateProductHandler);
router.delete("/products/:id", deleteProductHandler);

export default router;