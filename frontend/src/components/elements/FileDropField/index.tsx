import { useCallback } from "react";
import { useField } from "formik";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "components/elements/Typography";
import { MdImage } from "react-icons/md";

interface DropzoneProps {
  accept: string;
  label: string;
  name: string;
}

export default function FileDropField(props: DropzoneProps) {
  const { accept, label, name } = props;
  const [_, __, helpers] = useField(name);

  const onDrop = useCallback(
    (acceptedFiles) => {
      helpers.setValue(acceptedFiles[0]);
      helpers.setTouched(true);
    },
    [helpers.setValue]
  );

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept,
      multiple: false,
    });

  const inputProps = getInputProps();

  return (
    <Box
      width={1}
      minHeight={300}
      height={1}
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      border={1}
      borderRadius={1}
      borderColor="primary.main"
      sx={{
        borderStyle: "dashed",
        borderWidth: 5,
        cursor: "pointer",
        transition: "background-color 0.1s ease-in-out",
        "&:hover": { bgcolor: "rgba(82,146,240,0.1)" },
      }}
      bgcolor={isDragActive ? "rgba(82,146,240,0.1)" : undefined}
      {...getRootProps()}
    >
      <input {...inputProps} />
      {acceptedFiles.length > 0 ? (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          color="primary.main"
        >
          <MdImage fontSize="2rem" />
          <Typography variant="h4">{acceptedFiles[0].name}</Typography>
        </Stack>
      ) : (
        <Typography
          variant="h4"
          color={isDragActive ? "primary.dark" : "primary.main"}
          align="center"
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}
