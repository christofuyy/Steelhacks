import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "components/elements/Typography";
import Button from "components/elements/Button";

export default function Hero() {
  return (
    <Box>
      <Container>
        <Stack direction="row" alignItems="center">
          <Stack alignItems="flex-start" maxWidth="60ch" spacing={2}>
            <Typography variant="h1">Welcome to XScanner</Typography>
            <Typography variant="body1" color="text.secondary">
              XScanner is a machine learning model that takes in human lung
              X-Ray images and outputs a classification of health/unhealthy.
            </Typography>
            <Button variant="contained">Learn More</Button>
          </Stack>
          <Box
            maxWidth={683}
            width={1}
            maxHeight={709}
            height={1}
            overflow="hidden"
          >
            <img
              src="svg/Drawkit-Vector-Illustration-Medical-16.svg"
              width="100%"
              height="100%"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
