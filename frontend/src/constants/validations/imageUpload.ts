import * as yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/png", "image/jpeg"];

const imageUploadValidation = yup.object({
  image: yup
    .mixed()
    .nullable()
    .required("Image is required.")
    .test("fileSize", "Image is too large.", (val) => {
      return val && val.size <= FILE_SIZE;
    })
    .test("fileFormat", "File must be image type.", (val) => {
      return val && SUPPORTED_FORMATS.includes(val.type);
    }),
});

export default imageUploadValidation;
