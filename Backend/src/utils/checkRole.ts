export const checkRole = (email: string, password: string): "admin" | "user" => {
  if (email === "admin1010@gmail.com" && password === "Adminfs10.") {
    return "admin"
  } else {
    return "user"
  }
};