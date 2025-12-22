import { Request, Response } from "express";
import {
  deleteProductService,
  getOneProductService,
  getProductService,
  getSearchProductService,
  IBody,
  postProductService,
  updateProductService,
} from "./product.service";

export const postProduct = async (
  req: Request<
    {},
    {},
    {
      title: string;
      description: string;
      main_image: string[];
      price: number;
      old_price: number;
      category: string;
      material: string;
      color: string;
      product_style: string;
      width: number;
      height: number;
      product_depth: number;
      in_stock: boolean;
    }
  >,
  res: Response
) => {
  try {
    const body = req.body;
    const response = await postProductService(body);
    res.status(200).json({
      message: "post product succesfully",
      success: true,
      data: response,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const response = await getProductService();
    res.status(200).json({
      message: "get product successfully",
      status: "success",
      data: response,
    });
  } catch (error) {}
};

export const getSearchProduct = async (
  req: Request<{}, {}, {}, { search: string; limit: number; offset: number }>,
  res: Response
) => {
  try {
    const search = String(req.query.search || "").trim();
    const limit = Number(req.query.limit || 10);
    const offset = Number(req.query.offset || 0);
    if (!search) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const response = await getSearchProductService(search, limit, offset);
    res.status(200).json({
      message: "успешно найдены",
      status: "success",
      data: response,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Interval server error" });
  }
};

export const getOneProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const response = await getOneProductService(id);
    res.status(200).json({
      message: "product successfully received",
      statuc: "success",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "error in receiving the product",
    });
  }
};

export const updateProduct = async (
  req: Request<{ id: string }, {}, IBody>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "no fields provided for update" });
    }
    const response = await updateProductService(id, body);

    res.status(200).json({
      message: "person updated successfully",
      status: "success",
      data: response,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new Error("invalid id");
    const response = await deleteProductService(id);
    res.status(200).json({
      message: "product deleted successfully",
      status: "success",
      data: response,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
