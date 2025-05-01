import { Request, Response } from "express";
import { createProduct, getAllProducts,getProductById,updateProduct,deleteProduct} from "../models/productModel";

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price } = req.body;

    if (!name || !price) {
      res.status(400).json({ message: "name과 price는 필수입니다." });
      return;
    }

    const result = await createProduct(name, description, price);
    res.status(201).json({ message: "상품 등록 성공", result });
  } catch (error) {
    console.error("상품 등록 실패:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};

export const getAllProductsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("상품 목록 조회 실패:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};

export const getProductByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "유효하지 않은 ID입니다." });
      return;
    }

    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({ message: "상품을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json({ message: "상품 조회 성공", product });
  } catch (error) {
    console.error("상품 조회 실패:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};


export const updateProductHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { name, description, price } = req.body;

    if (isNaN(id) || !name || !price) {
      res.status(400).json({ message: "잘못된 요청입니다." });
      return;
    }

    const success = await updateProduct(id, name, description, price);
    if (!success) {
      res.status(404).json({ message: "상품을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json({ message: "상품 수정 성공" });
  } catch (error) {
    console.error("상품 수정 실패:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};

export const deleteProductHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "유효하지 않은 ID입니다." });
      return;
    }

    const success = await deleteProduct(id);
    if (!success) {
      res.status(404).json({ message: "상품을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json({ message: "상품 삭제 성공"});
  } catch (error) {
    console.error("상품 삭제 실패:", error);
    res.status(500).json({ message: "서버 에러" });
  }
};