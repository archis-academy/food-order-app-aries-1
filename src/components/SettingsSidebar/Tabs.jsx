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
  },
  {
    id: 2,
    icon: restaurant,
    title: "Your Restaurant",
    detail: "Dark and light mode, font size",
    path: "/settings/your-restaurant",
  },
  {
    id: 3,
    icon: discount,
    title: "Products Management",
    detail: "Manage your product, pricing, etc",
    path: "/settings/product-management",
  },
  {
    id: 4,
    icon: notification,
    title: "Notifications",
    detail: "Customize your notifications",
    path: "/settings/notifications",
  },
  {
    id: 5,
    icon: security,
    title: "Security",
    detail: "Configure your password, PIN, etc",
    path: "/settings/security",
  },
  {
    id: 6,
    icon: aboutUs,
    title: "About Us",
    detail: "Find out more about posly",
    path: "/settings/about-us",
  },
];

export default tabs;
