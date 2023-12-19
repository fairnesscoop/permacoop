import { format, parseISO } from 'date-fns';

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

export const formatDate = (value: Date | string): string => {
  if (typeof value === 'string') {
    value = parseISO(value);
  }
  return format(value, 'dd/MM/yyyy');
};

export const formatHtmlDate = (value: Date): string => {
  return format(value, 'yyyy-MM-dd');
};

export const formatHtmlYearMonth = (value: Date): string => {
  return format(value, 'yyyy-MM');
};
