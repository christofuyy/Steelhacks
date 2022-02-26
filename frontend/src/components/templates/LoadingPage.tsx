import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "components/elements/Typography";

export interface LoadingScreenProps {
  /**
   * Loading message title
   */
  title?: string;

  /**
   * Short loading  message to describe the reason for loading
   */
  subtitle?: string;
}

export default function LoadingScreen({
  title = "Loading",
  subtitle,
}: LoadingScreenProps) {
  return (
    <Container
      sx={{ display: "flex", height: "100vh" }}
      data-testid="LoadingScreen"
    >
      <Stack m="auto" textAlign="center" alignItems="center" spacing={2}>
        <CircularProgress
          color="primary"
          data-testid="LoadingSpinner"
          disableShrink
          thickness={5}
        />
        <div>
          <Typography variant="h1">{title}</Typography>
          {subtitle ? (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          ) : undefined}
        </div>
      </Stack>
    </Container>
  );
}
