import { db } from "../config/db";

export const createProduct = async (
  name: string,
  description: string,
  price: number
) => {
  const [result] = await db.query(
    "INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
    [name, description, price]
  );
  return result;
};


interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows as Product[];  // 타입 단언
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  const products = rows as Product[];
  return products.length > 0 ? products[0] : null;
};

export const updateProduct = async (
  id: number,
  name: string,
  description: string,
  price: number
): Promise<boolean> => {
  const [result] = await db.query(
    "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
    [name, description, price, id]
  );
  // result.affectedRows가 1 이상이면 성공
  return (result as any).affectedRows > 0;
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  const [result] = await db.query(
    "DELETE FROM products WHERE id = ?",[id]);
  // result.affectedRows가 1 이상이면 성공
  return (result as any).affectedRows > 0;
};