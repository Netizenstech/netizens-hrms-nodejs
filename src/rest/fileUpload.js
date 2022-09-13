const multer = require('multer');
const path = require('path');
console.log(path.join(__dirname, "public"));
const publicFs = path.join(__dirname, "../public");
var filePath = "";
const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: publicFs,
  filename: (req, file, cb) => {
    req.file = {
      name: file.originalname
    };
    var uploadFile = "";
    if (filePath == "uploadProfile") {
      uploadFile = "profile";
    } else if (filePath == "uploadDocument") {
      uploadFile = "document";
    } else if (filePath == "uploadOrganizationLogo") {
      uploadFile = "organizationLogo";
    } else if (filePath == "uploadOrganizationBackgroundImage") {
      uploadFile = "organizationBackground"
    }
    cb(null, `${uploadFile}/${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);

  }
});

const uploadProductImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 100000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    filePath = req.url.slice(1)
    if (!file.originalname.match(/\.(png|jpg|jpeg|xlsx|xlx|doc|txt|xls|pdf|docx|ppt|pptx|csv)$/)) {
      return cb(new Error('Please upload a Image'));
    }
    cb(undefined, true);
  }
});

module.exports = {
  uploadProductImage
};