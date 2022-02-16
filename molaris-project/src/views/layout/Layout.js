import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import CAppBar from "./CAppBar";
import CDrawer from "./CDrawer";

const drawerWidth = 240;

function Layout({title}) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CAppBar
        drawerWidth={drawerWidth}
        open={open}
        toggleDrawer={toggleDrawer}
        title={title}
      />
      <CDrawer
        drawerWidth={drawerWidth}
        open={open}
        toggleDrawer={toggleDrawer}
      />
      <Box sx={{marginTop: "64px", width: "100%"}}>
      <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
