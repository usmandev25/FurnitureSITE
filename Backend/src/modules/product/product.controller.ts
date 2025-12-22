import { Request, Response } from "express";
import { getProductService, postProductService } from "./product.service";

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
