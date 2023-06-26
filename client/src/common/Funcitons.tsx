const colors = [
  "#ff0000",
  "#0000ff",
  "#00ff00",
  "#800080",
  "#ffa500",
  "#008080",
  "#ff69b4",
  "#4b0082",
  "#00ffff",
  "#00ff00",
  "#ffbf00",
  "#9370db",
  "#87cefa",
  "#ffbf00",
];
const userColorMap: Record<number, string> = {};

export const capitalize = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getInitials = (name: string): string => {
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials;
};

export const getUserColor = (userId: number): string => {
  if (userId in userColorMap) {
    return userColorMap[userId];
  }
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  userColorMap[userId] = colors[randomColorIndex]
  return userColorMap[userId]
};
