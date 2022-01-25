import React, { useState } from "react";
import {
  Box,
  CssBaseline,
} from "@mui/material";
import CAppBar from "./CAppBar";
import CDrawer from "./CDrawer";

const drawerWidth = 240;

function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CAppBar drawerWidth={drawerWidth} open={open} toggleDrawer={toggleDrawer} />
      <CDrawer drawerWidth={drawerWidth} open={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
}

export default Dashboard;
