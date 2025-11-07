import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.png";
import full_logo from "./full-logo.png";
import full_logo_right from "./full-logo-right.png";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import clock_icon from "./clock.png";
import price_icon from "./price.png";
import upload_icon from "./upload_icon.png";
import email_icon from './email_icon.svg'
import location_icon from './location_icon.svg'
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import haircut from "./haircut.png";
import style from "./style.png";
import color from "./color.png";
import banner from "./banner.png";


// Images to get :
// Men's Haircut, Women's Haircut, Blowout, Full Color,
// Root Touch Up, Partial Highlights, Full Highlights, Straightning, Extension

export const assets = {
  appointment_img,
  header_img,
  banner,
  group_profiles,
  logo,
  full_logo,
  full_logo_right,
  chats_icon,
  verified_icon,
  info_icon,
  clock_icon,
  price_icon,
  email_icon,
  location_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const serviceCategories = [
  {
    name: "Haircut",
    image: haircut,
  },
  {
    name: "Style",
    image: style,
  },
  {
    name: "Color",
    image: color,
  },
];

export const servicesData = [
  {
    _id: "1",
    name: `Men's Haircut`,
    category: "Haircut",
    image: haircut,
    repeatEvery: "Every 3 Weeks",
    duration: "Up To 1 Hour",
    durationInMinutes: "60",
    price: "45",
    description:
      "A precision haircut tailored to your style, whether you prefer classic or modern looks. Keep your hair sharp and well-maintained.",
  },
  {
    _id: "2",
    name: `Women's Haircut`,
    category: "Haircut",
    image: haircut,
    repeatEvery: "Every 2 Months",
    duration: "Up To 1 Hour",
    durationInMinutes: "60",
    price: "55",
    description:
      "Customized to suit your face shape and lifestyle. From trims to dramatic cuts, we create the perfect look just for you.",
  },
  {
    _id: "3",
    name: "Blowout",
    category: "Style",
    image: style,
    repeatEvery: "On a Special Occasion",
    duration: "Up To 1 Hour",
    durationInMinutes: "60",
    price: "35",
    description:
      "A professional blowout for smooth, voluminous hair that lasts. Perfect for any special occasion or when you want to feel extra polished.",
  },
  {
    _id: "4",
    name: "Full Color",
    category: "Color",
    image: color,
    repeatEvery: "Every 3 Months",
    duration: "Up To 2 Hours",
    durationInMinutes: "120",
    price: "150",
    description:
      "Rich, vibrant hair color that covers all your strands. Whether you’re going for a subtle change or a bold transformation, we’ll deliver a flawless result.",
  },
  {
    _id: "5",
    name: "Straightening",
    category: "Style",
    image: style,
    repeatEvery: "Once a Year",
    duration: "Up To 2.5 Hours",
    durationInMinutes: "150",
    price: "250",
    description:
      "Smooth, frizz-free hair with long-lasting results. A great option for anyone who loves sleek, straight hair without daily styling.",
  },
  {
    _id: "6",
    name: "Partial Highlights",
    category: "Color",
    image: color,
    repeatEvery: "Every 3 Months",
    duration: "Up To 1.5 Hours",
    durationInMinutes: "90",
    price: "125",
    description:
      "Add dimension and depth with partial highlights. A great option for those who want a subtle, sun-kissed effect.",
  },
  {
    _id: "7",
    name: "Full Highlights",
    category: "Color",
    image: color,
    repeatEvery: "Every 3 Months",
    duration: "Up To 3 Hours",
    durationInMinutes: "180",
    price: "225",
    description:
      "Full highlights for a brighter, more dynamic look. Transform your hair with stunning, all-over color for a fresh, vibrant appearance.",
  },
  {
    _id: "8",
    name: "Root Touch Up",
    category: "Color",
    image: color,
    repeatEvery: "Every 6 Weeks",
    duration: "Up To 1 Hour",
    durationInMinutes: "60",
    price: "85",
    description:
      "Keep your color looking fresh and natural with a root touch-up. Ideal for maintaining consistency and covering up any regrowth.",
  },
  {
    _id: "9",
    name: "Extension",
    category: "Style",
    image: style,
    repeatEvery: "Every 2.5 Months",
    duration: "Up To 4 Hours",
    durationInMinutes: "240",
    price: "200 per 50g",
    description:
      "Long, luscious hair with added volume and length. Extensions are customized to match your natural hair for a flawless, seamless look.",
  },
];

export const popularServices = [
  {
    name: `Men's Haircut`,
  },
  {
    name: "Extensions",
  },
  {
    name: "Full Highlights",
  },
  {
    name: "Straightening",
  },
];

