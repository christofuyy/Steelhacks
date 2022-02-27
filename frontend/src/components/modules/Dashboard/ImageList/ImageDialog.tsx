import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Typography from "components/elements/Typography";
import Card from "@mui/material/Card";

export default function ImageDialog({ open, onClose, imageSrc, data }) {
  const { healthyProb, unhealthyProb } = data;
  console.log('healthyprob:',healthyProb)
  console.log('unhealthyprob:',unhealthyProb)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 0.8, height: 0.8, maxWidth: 1400, maxHeight: 800 },
      }}
    >
      <Stack direction="row" p={4} height={1} spacing={4}>
        <Card sx={{ width: 0.4, height: 1 }} elevation={3}>
          <img
            src={imageSrc}
            alt="image"
            width="100%"
            height="100%"
            loading="lazy"
          />
        </Card>
        <Stack width={0.7}>
          <Typography>Probability of being healthy: {healthyProb}</Typography>
          <Typography>
            Probability of being unhealthy: {unhealthyProb};
          </Typography>
        </Stack>
      </Stack>
    </Dialog>
  );
}
