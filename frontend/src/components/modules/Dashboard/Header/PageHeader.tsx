import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "components/elements/Typography";

export default function PageHeader() {
  return (
    <Box
      bgcolor="white"
      boxShadow="0 1px 4px rgba(0,0,0,0.25)"
      py={2}
      borderBottom={1}
      borderColor="grey.100"
    >
      <Container>
        <Typography variant="h2">Dashboard</Typography>
      </Container>
    </Box>
  );
}
