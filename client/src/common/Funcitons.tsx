import { colors } from "./Constants";

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
  userColorMap[userId] = colors[randomColorIndex];
  return userColorMap[userId];
};

export const days: (string | number)[] = Array.from(
  { length: 31 },
  (_, index) => index + 1
);

export const years: (string | number)[] = Array.from(
  { length: 120 },
  (_, index) => 2023 - index
);
