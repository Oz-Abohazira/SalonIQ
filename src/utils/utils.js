export const getSlugFromServiceName = (serviceName) => {
  if (typeof serviceName !== "string" || serviceName.trim() === "") {
    return "";
  }

  return serviceName.trim().toLowerCase().replace(/\s+/g, "-");
};

export const getServiceNameFromSlug = (slug) => {
  if (typeof slug !== "string" || slug.trim() === "") {
    return "";
  }
  const withSpaces = slug.replace(/-/g, " ");

  return withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getIndicatorAndTextColor = (category) => {
  switch (category) {
    case "Haircut":
      return {
        indicator: "bg-blue-500",
        text: "text-blue-500",
      };
    case "Style":
      return {
        indicator: "bg-pink-500",
        text: "text-pink-500",
      };
    case "Color":
      return {
        indicator: "bg-green-500",
        text: "text-green-500",
      };
    default:
      return {
        indicator: "bg-gray-500",
        text: "text-gray-500",
      };
  }
};
