import React from "react";
import { AppBar, styled, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import { Menu, Notifications } from "@mui/icons-material";

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth"
})(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

function CAppBar(props) {
  const { drawerWidth, open, toggleDrawer } = props;
  
  return (
    <StyledAppBar position="absolute" open={open} drawerWidth={drawerWidth}>
      <Toolbar
        sx={{
          pr: "24px" // keep right padding when drawer closed
        }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" })
          }}>
          <Menu />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
}

export default CAppBar;
