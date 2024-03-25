import * as React from "react";
import { Typography, Toolbar, Box, AppBar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./styles.css";

export const Header: React.FC = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <FavoriteIcon />
          <Typography variant="h6">Application</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
