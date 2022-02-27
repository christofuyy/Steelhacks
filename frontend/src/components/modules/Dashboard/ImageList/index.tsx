import Stack from "@mui/material/Stack";
import ImageThumbnail from "./ImageThumbnail";

export default function ImageList({ images }) {
  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      {images.map(({ downloadUrl }) => (
        <ImageThumbnail src={downloadUrl} key={downloadUrl} />
      ))}
    </Stack>
  );
}
