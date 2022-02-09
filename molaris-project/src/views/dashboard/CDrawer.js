import React from "react";
import { styled, Drawer, Toolbar, IconButton, Divider, List } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import ListItems from "./ListItems";

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth"
})(({ theme, open, drawerWidth }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9)
      }
    })
  }
}));

function CDrawer(props) {
  const { drawerWidth, open, toggleDrawer } = props;

  return (
    <StyledDrawer variant="permanent" open={open} drawerWidth={drawerWidth}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1]
        }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ height: "100vh" }}>
        <ListItems />
      </List>
    </StyledDrawer>
  );
}

export default CDrawer;
