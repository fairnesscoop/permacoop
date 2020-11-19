export const minutesToHours = (value) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  
  if (0 === hours) {
    return `${value}m`;
  }

  if (0 === minutes) {
    return `${hours}h`;
  }

  return `${hours}h${minutes}`;
}
