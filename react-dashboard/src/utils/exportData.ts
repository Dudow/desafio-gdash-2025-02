import * as XLSX from "xlsx";

import { WeatherData } from "@/types/weather";

export function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function exportWeatherToCSV(
  data: WeatherData[],
  filename: string = "weather-data.csv"
) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  downloadBlob(blob, filename);
}

export function exportWeatherToXLSX(
  data: WeatherData[],
  filename: string = "weather-data.xlsx"
) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Weather Data");
  XLSX.writeFile(workbook, filename);
}
