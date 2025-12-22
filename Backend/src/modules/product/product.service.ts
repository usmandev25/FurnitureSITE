import { pool } from "../../plugin/postgres";

export interface IBody {
  id?: number;
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
  create_at?: any;
  update_at?: any;
}

export const postProductService = async (body: IBody) => {
  try {
    const response = await pool.query(
      "insert into products (title, description, main_image, price, old_price, category, material, color, product_style, width, height, product_depth, in_stock) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *",
      [
        body.title,
        body.description,
        body.main_image,
        body.price,
        body.old_price,
        body.category,
        body.material,
        body.color,
        body.product_style,
        body.width,
        body.height,
        body.product_depth,
        body.in_stock,
      ]
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

export const getSearchProductService = async (
  search: string,
  limit: number,
  offset: number
) => {
  if (!search) {
    throw new Error("форма не заполнена");
  }
  try {
    const query =
      "select * from products where title ilike $1 order by product_id desc limit $2 offset $3";
    const values = [`%${search}%`, limit, offset];
    const response = await pool.query(query, values);
    return response.rows;
  } catch (error) {
    throw error;
  }
};

export const getOneProductService = async (id: number) => {
  try {
    const response = await pool.query(
      "select * from products where product_id = $1",
      [id]
    );
    if (response.rows.length === 0) {
      return null;
    }
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

export const updateProductService = async (
  id: number,
  body: Partial<IBody>
) => {
  try {
    const fields = Object.keys(body);
    if (fields.length === 0) throw new Error("no fields to update");
    const setQuery = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");
    const values = Object.values(body);
    values.push(id);
    const query = `update products set ${setQuery} where product_id = $${
      fields.length + 1
    }`;
    const response = await pool.query(query, values);
    if (!response.rows[0]) {
      throw new Error("person not found");
    }
    return response.rows[0];
  } catch (error: any) {
    throw error;
  }
};

export const deleteProductService = async (id: number) => {
  try {
    const response = await pool.query(
      "delete from products where product_id = $1 returning *",
      [id]
    );
    return response.rows[0]
  } catch (error) {
    throw error
  }
};
