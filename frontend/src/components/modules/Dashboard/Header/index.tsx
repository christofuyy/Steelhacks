import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "components/elements/Typography";
import Link from "components/elements/Link";
import Avatar from "@mui/material/Avatar";

export default function Header() {
  return (
    <Box bgcolor="#04132A" py={2}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" color="primary.light">
            HelloWorld
          </Typography>
          <Stack ml={4} mr="auto">
            <Link href="/dashboard" color="white" underline="none">
              Dashboard
            </Link>
          </Stack>
          <Avatar>JS</Avatar>
        </Stack>
      </Container>
    </Box>
  );
}
