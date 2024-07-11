import {
  aboutUs,
  appearance,
  discount,
  restaurant,
  notification,
  security,
} from "./SettingsIcons";

const tabs = [
  {
    id: 1,
    icon: appearance,
    title: "Appearance",
    detail: "Dark and light mode, font size",
    path: "/settings/appearance",
    role: ["user", "admin"],
  },
  {
    id: 2,
    icon: restaurant,
    title: "Your Restaurant",
    detail: "Dark and light mode, font size",
    path: "/settings/your-restaurant",
    role: ["admin"],
  },
  {
    id: 3,
    icon: discount,
    title: "Products Management",
    detail: "Manage your product, pricing, etc",
    path: "/settings/product-management",
    role: ["admin"],
  },
  {
    id: 4,
    icon: notification,
    title: "Notifications",
    detail: "Customize your notifications",
    path: "/settings/notifications",
    role: ["user", "admin"],
  },
  {
    id: 5,
    icon: security,
    title: "Security",
    detail: "Configure your password, PIN, etc",
    path: "/settings/security",
    role: ["user", "admin"],
  },
  {
    id: 6,
    icon: aboutUs,
    title: "About Us",
    detail: "Find out more about posly",
    path: "/settings/about-us",
    role: ["user", "admin"],
  },
];

export default tabs;
