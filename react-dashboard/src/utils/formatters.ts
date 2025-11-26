import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(
  date: string | Date,
  formatLayout: string = "dd/MM/yyyy HH:mm"
): string {
  const dateObject = typeof date === "string" ? parseISO(date) : date;
  return format(dateObject, formatLayout, { locale: ptBR });
}

export function formatTemperature(temp: number): string {
  return `${temp.toFixed(1)}°C`;
}

export function formatWindSpeed(speed: number): string {
  return `${speed.toFixed(1)} km/h`;
}

export function formatHumidity(humidity: number): string {
  return `${humidity.toFixed(0)}%`;
}
