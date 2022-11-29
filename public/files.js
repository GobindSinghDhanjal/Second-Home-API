const homeModel = require("../models/home/homeModel");
const uploadFeature = require("@adminjs/upload");

const localProvider = {
  bucket: "public/images",
  opts: {
    baseUrl: "/images",
  },
};

const files = {
  resource: homeModel,
  options: {
    properties: {
      s3Key: {
        type: "string",
      },
      bucket: {
        type: "string",
      },
      mime: {
        type: "string",
      },
      comment: {
        type: "textarea",
        isSortable: false,
      },
    },
  },
  features: [
    uploadFeature({
      provider: { local: localProvider },
      validation: { mimeTypes: ["image/png", "application/pdf", "audio/mpeg"] },
    }),
  ],
};

module.exports = files;
