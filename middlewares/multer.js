const multer = require("multer");
const DataUriParser = require("datauri/parser");
const path = require("path");

// Initialize Multer with memory storage
const storage = multer.memoryStorage();
const multerUploads = multer({ storage });

// Initialize DataUriParser
const parser = new DataUriParser();

// Middleware to convert file buffer to Data URI
const dataUri = (req) => {
  if (!req.file) {
    throw new Error("No file uploaded");
  }

  // Convert the buffer to a Data URI
  return parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  ).content; // `.content` gives the Data URI string
};

// Function to handle image field and save as Base64 Data URI
const saveAsDataUri = (req, res, next) => {
  if (!req.file) {
    return next(new Error("No file provided"));
  }

  try {
    // Convert the uploaded file to a Data URI
    req.body.image = dataUri(req); // Add the Data URI to req.body
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    next(error);
  }
};

module.exports = { multerUploads, dataUri, saveAsDataUri };

// const multer = require("multer");
// const DataUriParser = require("datauri/parser");
// const path = require("path");

// const storage = multer.memoryStorage();
// const parser = new DataUriParser();

// const multerUploads = multer({ storage });

// const dataUri = (req) => {
//   console.log(req.file);
//   return parser.format(
//     path.extname(req.file.originalname).toString(),
//     req.file.buffer
//   );
// };

// const thumbnailDataUri = (req) => {
//   console.log(req);
//   return parser.format(path.extname(req.originalname).toString(), req.buffer);
// };

// module.exports = { multerUploads, dataUri, thumbnailDataUri };
