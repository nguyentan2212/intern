import React from "react";
import { useNavigate } from "react-router-dom";
import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Dashboard, ShoppingCart, People } from "@mui/icons-material";

function ListItems() {
  const navigate = useNavigate();
  return (
    <div>
      <ListItem button onClick={() => navigate("/transaction")}>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Tokens" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="NFTs" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItem>
    </div>
  );
}

export default ListItems;
