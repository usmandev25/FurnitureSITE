import { pool } from "../../plugin/postgres";

export interface IBody {
  id?: number;
  title: string;
  description: string;
  main_image: string[];
  price: number;
  old_price: number;
  category: string,
  material: string,
  color: string
  product_style: string
  width: number
  height: number
  product_depth: number
  in_stock: boolean
  create_at?: any;
  update_at?: any;
}

export const postProductService = async (body: IBody) => {
  try {
    const response = await pool.query(
      "insert into products (title, description, main_image, image, price, old_price, category, material, color, product_style, width, height, product_depth, in_stock) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *",
      [body.title, body.description, body.main_image, body.price, body.old_price, body.category, body.material, body.color, body.product_style, body.width, body.height, body.product_depth, body.in_stock]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getProductService = async () => {
  try {
    const response = await pool.query("select * from products");
    return response.rows;
  } catch (error) {
    throw error;
  }
};
