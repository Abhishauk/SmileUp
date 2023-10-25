const multer = require('multer');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the directory where files should be saved.
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the file name.
  },
});

const upload = multer({ storage: storage });
module.exports = upload;