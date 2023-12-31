import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Dashboard from "../Dashboard/Dashboard";
import IncomeDashboard from "../../Income/IncomeDashboard";
import ExpenseDashboard from "../../Expense/ExpenseDashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import TdsDashboard from "../TDS/TdsDashboard";
import Gst from "../GST/Gst";
// import PayrollDashboard from "../Payroll/PayrollDashboard";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Gst1 from "../GST/Gst1";
import Gst2 from "../GST/Gst2";

const Layout = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleGSTClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGSTClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("tokenauth");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderSelectedComponent = () => {
    const componentStyle = {
      flex: 1,
      backgroundImage:
        'url("https://getwallpapers.com/wallpaper/full/1/3/a/465073.jpg")',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      // Add more styles if needed
    };
    if (selectedTab === "dashboard") {
      return (
        <div style={componentStyle}>
          <Dashboard />
        </div>
      );
    } else if (selectedTab === "income") {
      return (
        <div style={componentStyle}>
          <IncomeDashboard />
        </div>
      );
    } else if (selectedTab === "expenses") {
      return (
        <div style={componentStyle}>
          <ExpenseDashboard />
        </div>
      );
    } else if (selectedTab === "tdsdashboard") {
      return (
        <div style={componentStyle}>
          <TdsDashboard />
        </div>
      );
    } else if (selectedTab === "incomegst") {
      return (
        <div style={componentStyle}>
          <Gst1 />
        </div>
      );
    } else if (selectedTab === "expensegst") {
      return (
        <div style={componentStyle}>
          <Gst2 />
        </div>
      );
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    localStorage.setItem("selectedTab", tab);
  };

  useEffect(() => {
    const storedTab = localStorage.getItem("selectedTab");
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);
  return (
    <div style={{ display: "flex" }}>
      {showNavBar && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#000000",
            },
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#FFFFFF",
                marginLeft: "16px",
              }}
            >
              Pyra Fin
            </Typography>
          </Toolbar>
          <List>
            <Divider />
            <ListItem
              button
              key="dashboard"
              onClick={() => handleTabClick("dashboard")}
              sx={{
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <ListItemIcon>
                <DashboardIcon style={{ color: "#FBC91B" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" style={{ color: "#FBC91B" }} />
            </ListItem>
            <ListItem
              button
              key="income"
              onClick={() => handleTabClick("income")}
              sx={{
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <ListItemIcon>
                <MonetizationOnIcon style={{ color: "#FBC91B" }} />
              </ListItemIcon>
              <ListItemText primary="Income" style={{ color: "#FBC91B" }} />
            </ListItem>
            <ListItem
              button
              key="expenses"
              onClick={() => handleTabClick("expenses")}
              sx={{
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <ListItemIcon>
                <AccountBalanceWalletIcon style={{ color: "#FBC91B" }} />
              </ListItemIcon>
              <ListItemText primary="Expenses" style={{ color: "#FBC91B" }} />
            </ListItem>
            <ListItem
              button
              key="tdsdashboard"
              onClick={() => handleTabClick("tdsdashboard")}
              sx={{
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <ListItemIcon>
                <AccountBalanceIcon style={{ color: "#FBC91B" }} />
              </ListItemIcon>
              <ListItemText primary="TDS" style={{ color: "#FBC91B" }} />
            </ListItem>
            <ListItem
              button
              key="gst"
              onClick={handleGSTClick}
              sx={{
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <ListItemIcon>
                <ArrowOutwardIcon style={{ color: "#FBC91B" }} />
              </ListItemIcon>
              <ListItemText primary="GST" style={{ color: "#FBC91B" }} />
              <ArrowDropDownIcon style={{ color: "#FBC91B" }} />
            </ListItem>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleGSTClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => handleTabClick("incomegst")}>
                GST-1
              </MenuItem>
              <MenuItem onClick={() => handleTabClick("expensegst")}>
                GST-2
              </MenuItem>
            </Menu>
            <ListItem
              button
              key="logout"
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon style={{ color: "#FBC91B" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" style={{ color: "#FBC91B" }} />
            </ListItem>
          </List>
        </Drawer>
      )}
      <div style={{ flex: 1 }}>{renderSelectedComponent()}</div>
    </div>
  );
};
export default Layout;
