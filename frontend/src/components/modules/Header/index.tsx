import { useAuth } from "contexts/AuthContext";
import Container from "@mui/material/Container";
import Box, { BoxProps } from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "components/elements/Typography";
import Link from "components/elements/Link";
import Button from "components/elements/Button";

const SECTIONS = ["About", "Motivation", "Implementation", "Results"];

export default function Header(props: BoxProps) {
  const { user } = useAuth();

  return (
    <Box py={2} {...props}>
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">HelloWorld</Typography>
          <Stack direction="row" spacing={4}>
            {SECTIONS.map((section) => (
              <Link
                href={`/#${section.toLowerCase()}`}
                color="text.primary"
                underline="none"
                key={section}
              >
                {section}
              </Link>
            ))}
          </Stack>
          {user ? (
            <Button href="/dashboard" variant="contained">
              Dashboard
            </Button>
          ) : (
            <Button href="/auth/signin" variant="contained">
              Sign In
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
