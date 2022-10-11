export const regex = (...extensions: string[]): string => {
  if (extensions.length === 1) return `**/*.${extensions}`;
  else return `**/*.{${extensions.join(",")}}`;
};
