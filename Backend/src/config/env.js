import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { NODE_ENV, DB_URI, PORT, Backend_Url } = process.env;
