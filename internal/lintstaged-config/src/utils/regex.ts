export const regex = (...extensions: string[]): string => {
  if (extensions.length === 0) return `**/*.${extensions}`;
  else return `**/*.{${extensions.join(",")}}`;
};
