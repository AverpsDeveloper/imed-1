import { MongooseError } from "mongoose";

//handle email or usename duplicates
const handleDuplicateKeyError = (err: any) => {
  const field = Object.keys(err.keyValue);
  const message = `An account with that ${field} already exists.`;
  return { message, field, status: 409 };
};
//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err: any) => {
  let errors = Object.values(err.errors).map((el: any) => el.message);
  let fields = Object.values(err.errors).map((el: any) => el.path);
  if (errors.length > 1) {
    const formattedErrors = errors.join("");
    return { message: formattedErrors, fields: fields, status: 400 };
  } else {
    return { message: errors, fields: fields, status: 409 };
  }
};
//error controller function
export default async (err: Error | MongooseError | any) => {
  try {
    if (err.name === "ValidationError") return handleValidationError(err);
    if (err.code && err.code == 11000) return handleDuplicateKeyError(err);
    else return { message: err.message || err , status: 500};
  } catch (e) {
    return { message: (e as Error).message ?? e, status: 500 };
  }
};
