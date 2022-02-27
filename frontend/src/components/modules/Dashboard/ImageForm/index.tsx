import { v4 as uuidv4 } from "uuid";
import path from "path";
import { useAuth } from "contexts/AuthContext";
import { Formik, Form, FormikHelpers } from "formik";
import Stack from "@mui/material/Stack";
import FileDropField from "components/elements/FileDropField";
import Button from "components/elements/Button/index";
import Alert from "@mui/material/Alert";
import imageUploadValidation from "constants/validations/imageUpload";

import { storage, db } from "constants/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore/lite";

type ImageUploadFormValues = {
  image: File | string;
};

const initialValues: ImageUploadFormValues = {
  image: "",
};

export default function ImageForm({ images, setImages }) {
  const { user } = useAuth();

  const handleSubmit = async (
    values: ImageUploadFormValues,
    helpers: FormikHelpers<ImageUploadFormValues>
  ) => {
    const { image } = values;

    const objectStorageFilePath = `users/${user.uid}/images/${uuidv4()}`;
    const objectRef = ref(storage, objectStorageFilePath);
    await uploadBytes(objectRef, image as File);

    const fileName = path.basename(objectStorageFilePath);

    const downloadUrl = await getDownloadURL(objectRef);
    console.log(downloadUrl);
    const imageCollectionRef = collection(db, "users");
    const imageDocRef = doc(imageCollectionRef, user.uid, "images", fileName);
    await setDoc(imageDocRef, {
      downloadUrl,
    });

    setImages([{ downloadUrl }, ...images]);

    helpers.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
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
                  Upload
                </Button>
              </Stack>
            </Form>
          </Stack>
        );
      }}
    </Formik>
  );
}
