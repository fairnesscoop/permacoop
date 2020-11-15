export const minutesToHours = (value) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  
  if (0 === hours) {
    return `${value}m`;
  }

  if (value % 60 === 0) {
    return `${hours}h`;
  }

  return `${hours}h${minutes}`;
}
