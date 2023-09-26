import { format } from 'date-fns';

export const minutesToHours = (value: number): string => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  if (hours === 0) {
    return `${value}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h${minutes}`;
};

export const formatDate = (value: Date): string => {
  return format(value, 'dd/MM/yyyy');
};

export const formatHtmlDate = (value: Date): string => {
  return format(value, 'yyyy-MM-dd');
};
