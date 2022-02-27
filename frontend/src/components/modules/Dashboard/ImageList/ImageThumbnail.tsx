import useOpenable from "hooks/useOpenable";
import Card from "@mui/material/Card";
import ImageDialog from "./ImageDialog";

export default function ImageThumbnail({ src ,data}) {
  const { open, handleClose, handleOpen } = useOpenable();

  return (
    <>
      <Card
        sx={{
          width: 100,
          height: 100,
          transition: "transform 0.1s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-4px)",
          },
        }}
        elevation={3}
        onClick={handleOpen}
      >
        <img src={src} alt="image" width="100%" height="100%" loading="lazy" />
      </Card>
      <ImageDialog open={open} onClose={handleClose} imageSrc={src} data={data}/>
    </>
  );
}
