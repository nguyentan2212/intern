import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Dashboard, ShoppingCart, People } from "@mui/icons-material";

function ListItems() {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
    </div>
  );
}

export default ListItems;
