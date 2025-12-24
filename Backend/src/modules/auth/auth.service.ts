import { pool } from "../../plugin/postgres";
import bcrypt from "bcryptjs";
import { checkRole } from "../../utils/checkRole";

export interface IUsers {
  user_name: string;
  email: string;
  password: string;
}

export const registerService = async (body: IUsers) => {
  const founded = await pool.query("select 1 from users where email = $1", [
    body.email,
  ]);
  if ((founded.rowCount ?? 0) > 0) {
    throw { status: 409, message: "Email already in use" };
  }
  const role = checkRole(body.email, body.password);
  const hashPassword = await bcrypt.hash(body.password, 12);
  const response = await pool.query(
    "insert into users (user_name, email, password, user_role) values ($1, $2, $3, $4) returning user_id, user_name, email, user_role",
    [body.user_name, body.email, hashPassword, role]
  );

  return response.rows[0];
};
