require("dotenv").config();

export const JWT_SECRET = process.env.JWT_SECRET || "";
export const POSTGRES_HOST = process.env.POSTGRES_HOST || "";
export const POSTGRES_PORT = process.env.POSTGRES_PORT || "";
export const POSTGRES_USER = process.env.POSTGRES_USER || "";
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "";
export const POSTGRES_DB = process.env.POSTGRES_DB || "";
export const EMAIL_HOST = process.env.EMAIL_HOST || "";
export const EMAIL_PORT = process.env.EMAIL_PORT || "";
export const EMAIL = process.env.EMAIL || "";
export const EMAIL_PWD = process.env.EMAIL_PWD || "";
