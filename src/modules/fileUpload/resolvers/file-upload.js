const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
var multer = require("multer");
  
const fileUpload = multer.diskStorage({
  // Destination to store image     
  destination: 'src/public/',
  filename: (req, file, cb) => {
      req.file = {
          name: file.originalname
      }
      cb(null, req.params.type+"/" + file.fieldname + '_' + Date.now()
          + path.extname(file.originalname))
      // file.fieldname is name of the field (image)
      // path.extname get the uploaded file extension
  }
});

const upload = multer({
  storage: fileUpload,
  limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) {
          // upload only png and jpg format
          return cb(new Error('Please upload a Image'))
      }
      cb(undefined, true)
  }
})


module.exports = {
  upload,
};

module.exports = createRole;
