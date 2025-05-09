// utils/colorUtils.ts
export const getRandomColor = () => {
  const colors = [
    '#FF6384', // Red
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#4BC0C0', // Teal
    '#9966FF', // Purple
    '#FF9F40', // Orange
    '#8AC24A', // Green
    '#607D8B', // Blue Grey
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
type getTextColorProps = {
  bgColor: string | undefined;
};

export const getTextColor = ({ bgColor }: getTextColorProps) => {
  if (!bgColor || bgColor.length < 7) {
    return '#000066';
  }

  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
