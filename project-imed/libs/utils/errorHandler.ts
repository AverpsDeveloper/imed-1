import { MongooseError } from "mongoose";

//handle email or usename duplicates
const handleDuplicateKeyError = (err: any) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `An account with that ${field} already exists.`;
  return { error, field };
};
//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err: any) => {
  let errors = Object.values(err.errors).map((el: any) => el.message);
  let fields = Object.values(err.errors).map((el: any) => el.path);
  let code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join("");
    return { messages: formattedErrors, fields: fields };
  } else {
    return { messages: errors, fields: fields };
  }
};
//error controller function
export default async (err: Error | MongooseError | any) => {
  try {
    if (err.name === "ValidationError") return handleValidationError(err);
    if (err.code && err.code == 11000) return handleDuplicateKeyError(err);
    else return { message: err.message || err };
  } catch (e) {
    return { message: (e as Error).message ?? e };
  }
};
