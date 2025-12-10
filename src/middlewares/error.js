import ValidationError from "../errors/validation-error.js";

const errorMiddleware = (err, _, res, __) => {
  if (err instanceof ValidationError){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  const statusCode = err.statusCode ?? res.statusCode ?? 500; // Default to 500 if not set
  res.status(statusCode).json({ // Send JSON response
    success: false,
    message: err.message || "Something went wrong",
    // stack: process.env.NODE_ENV === "production" ? null : err.stack, 
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }), // Include stack trace only in non-production environments
    error: err.errors
      ? Object.values(err.errors).map((error) => error.message) // Extract error messages from Mongoose validation errors
      : null,
  });
};

export default errorMiddleware;