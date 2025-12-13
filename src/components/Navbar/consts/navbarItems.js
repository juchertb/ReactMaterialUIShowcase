import PeopleIcon from "@mui/icons-material/People";
import DnsIcon from "@mui/icons-material/Dns";
import ImageIcon from "@mui/icons-material/Image";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import { Avatar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShopIcon from "@mui/icons-material/Shop";
import ReceiptIcon from "@mui/icons-material/Receipt";

export const mainNavbarItems = [
  {
    id: 0,
    icon: <DashboardIcon />,
    label: "Dashboard",
    //route: "authentication",
    addDivider: true,
    submenu: [
      {
        id: 100,
        icon: <AnalyticsIcon />,
        label: "Analytics",
        route: "analytics",
      },
      {
        id: 101,
        icon: <PointOfSaleIcon />,
        label: "Sales",
        route: "sales",
      },
    ],
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    label: "Authentication",
    //route: "authentication",
    addDivider: true,
    submenu: [
      {
        id: 200,
        icon: <PeopleIcon />,
        label: "Users",
        route: "authentication",
      },
      {
        id: 201,
        icon: <LoginIcon />,
        label: "Sign In",
        route: "",
      },
      {
        id: 202,
        icon: <AppRegistrationIcon />,
        label: "Sign Up",
        route: "authentication",
      },
      {
        id: 3,
        icon: <LockResetIcon />,
        label: "Reset Password",
        route: "authentication",
      },
    ],
  },
  {
    id: 2,
    icon: <DnsIcon />,
    label: "Hosting Services",
    route: "database",
  },
  {
    id: 3,
    icon: <ImageIcon />,
    label: "Storage",
    route: "storage",
  },
  {
    id: 4,
    icon: <PublicIcon />,
    label: "Hosting",
    route: "hosting",
  },
  {
    id: 5,
    icon: <SettingsEthernetIcon />,
    label: "Functions",
    route: "functions",
  },
  {
    id: 6,
    icon: <SettingsInputComponentIcon />,
    label: "Machine learning",
    route: "machine-learning",
  },
  {
    id: 7,
    icon: <ShoppingBasketIcon />,
    label: "eCommerce",
    route: "ecommerce",
    submenu: [
      {
        id: 300,
        icon: <InventoryIcon />,
        label: "Products",
        route: "ecommerce/products",
      },
      {
        id: 301,
        icon: <ShopIcon />,
        label: "Orders",
        route: "ecommerce/orders",
      },
    ],
  },
  {
    id: 8,
    icon: (
      <Avatar
        sx={{ width: 30, height: 30, marginRight: "10px" }}
        src="https://mui.com/static/images/avatar/1.jpg"
      />
    ),
    label: "Richard Davis",
    //route: "profile",
    addDivider: true,
    submenu: [
      {
        id: 400,
        icon: <PersonIcon />,
        label: "My Profile",
        route: "profile",
      },
      {
        id: 401,
        icon: <SettingsIcon />,
        label: "Settings",
        route: "settings",
      },
      {
        id: 402,
        icon: <ReceiptIcon />,
        label: "Billing",
        route: "billing",
      },
      {
        id: 403,
        icon: <LogoutIcon />,
        label: "Logout",
        route: "logout",
      },
    ],
  },
];
