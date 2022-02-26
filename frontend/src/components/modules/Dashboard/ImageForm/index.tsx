import { Formik, Form, FormikHelpers } from "formik";
import Stack from "@mui/material/Stack";
import FileDropField from "components/elements/FileDropField";
import Button from "components/elements/Button/index";
import Alert from "@mui/material/Alert";
import imageUploadValidation from "constants/validations/imageUpload";

type ImageUploadFormValues = {
  image: File | string;
};

const initialValues: ImageUploadFormValues = {
  image: "",
};

const onSubmit = (
  values: ImageUploadFormValues,
  helpers: FormikHelpers<ImageUploadFormValues>
) => {
  const { image } = values;

  console.log(image);
};

export default function ImageForm() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={imageUploadValidation}
    >
      {({ isSubmitting, errors }) => {
        return (
          <Stack spacing={2}>
            {errors.image && <Alert severity="error">{errors.image}</Alert>}
            <Form>
              <Stack spacing={4} alignItems="center">
                <FileDropField
                  accept="image/*"
                  label="Drag and drop your image, or click to select image"
                  name="image"
                />
                <Button
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Predict
                </Button>
              </Stack>
            </Form>
          </Stack>
        );
      }}
    </Formik>
  );
}
