export const regex = (...extension: string[]): string => {
  return `**/*.{${extension.join(",")}}`;
};
