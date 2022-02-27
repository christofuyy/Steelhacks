import { useRouter } from "next/router";
import { useRef } from "react";
import { useAuth } from "contexts/AuthContext";
import useOpenable from "hooks/useOpenable";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "components/elements/Typography";
import Link from "components/elements/Link";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MdLogout } from "react-icons/md";

export default function Header() {
  const { user } = useAuth();
  const { open, handleClose, handleOpen } = useOpenable();
  const router = useRouter();
  const avatarButtonRef = useRef();

  return (
    <Box bgcolor="#04132A" py={2}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" color="primary.light">
            <Link href="/" underline="none">
              XScanner
            </Link>
          </Typography>
          <Stack ml={4} mr="auto">
            <Link href="/dashboard" color="white" underline="none">
              Dashboard
            </Link>
          </Stack>
          <IconButton ref={avatarButtonRef} onClick={handleOpen}>
            <Avatar alt={user.displayName} src={user.photoURL} />
          </IconButton>
          <Menu
            anchorEl={avatarButtonRef.current}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => router.push("/auth/signout")}>
              <ListItemIcon>
                <MdLogout fontSize="1.5rem" />
              </ListItemIcon>
              Sign Out
            </MenuItem>
          </Menu>
        </Stack>
      </Container>
    </Box>
  );
}
