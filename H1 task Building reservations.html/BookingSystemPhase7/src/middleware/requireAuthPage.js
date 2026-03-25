import jwt from "jsonwebtoken";

export default function requireAuthPage(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;

  const cookieToken = req.headers.cookie
    ?.split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith("token="))
    ?.split("=")[1];

  const token = bearerToken || cookieToken;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}