import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  styled,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMoralis } from "react-moralis";
import Swal from "sweetalert2";

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function CAppBar(props) {
  const { drawerWidth, open, toggleDrawer, title } = props;
  const { user, logout, authenticate, Moralis, account } = useMoralis();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mergeAddress = (address) => {
    Swal.fire({
      title: "Do you want to merge?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Merge account");
        try {
          await Moralis.link(address);
        } catch (e) {
          Swal.fire("Error", e.message, "error");
        }
      }
    });
  };

  return (
    <StyledAppBar position="absolute" open={open} drawerWidth={drawerWidth}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        {user ? (
          <Box component="div">
            <IconButton color="inherit" onClick={handleClick}>
              <AccountCircle />
            </IconButton>
            <Menu
              sx={{ width: "200px" }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  mergeAddress(account);
                }}
              >
                Merge Address
              </MenuItem>
              <MenuItem>{user ? user.get("username") : "null"}</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Button
              color="inherit"
              onClick={() => {
                handleClose();
                authenticate();
              }}
            >
              Connect wallet
            </Button>
            <Typography sx={{ mx: "10px" }}>or</Typography>
            <Button color="inherit" onClick={() => navigate("/auth/signin")}>
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}

export default CAppBar;
