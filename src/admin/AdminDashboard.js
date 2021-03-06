import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  mainListItems,
  secondaryListItems,
} from "./adminDashboardContent/components/listItems";
import { Routes, Route } from "react-router-dom";
import DashboardLanding from "./adminDashboardContent/DashboardLanding";
import DashboardProfile from "./adminDashboardContent/DashboardProfile";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import Orders from "./Orders";
import ManageProducts from "./ManageProducts";
import UpdateProduct from "./UpdateProduct";
import ProfileUpdate from "./ProfileUpdate";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
  "& .MuiTypography-root": {
    fontFamily: "Lato",
  },
}));

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            px: [1],
          }}
        >
          {open ? (
            <Typography variant="h6" sx={{ fontFamily: "Lato" }}>
              Configuration
            </Typography>
          ) : (
            ""
          )}

          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "92.8vh",
          overflow: "auto",
        }}
      >
        <Toolbar />

        <Routes>
          <Route path="/" element={<DashboardLanding />} />
          <Route path="/profile" element={<DashboardProfile />} />
          <Route path="/create/category" element={<AddCategory />} />
          <Route path="/create/product" element={<AddProduct />} />
          <Route path="/products" element={<ManageProducts />} />
          <Route
            path="/products/update/:productId"
            element={<UpdateProduct />}
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/update" element={<ProfileUpdate />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function AdminDashboard() {
  return <DashboardContent />;
}
