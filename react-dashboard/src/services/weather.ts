import { WeatherData } from "@/types/weather";
import api from "./api";
import { PaginatedResponse, PaginationParams } from "@/types/pagination";
import { AIInsight } from "@/types/ai";

export const weatherService = {
  async getCurrentWeather(): Promise<WeatherData> {
    const response = await api.get<WeatherData>("/weathers/current");

    return response.data;
  },

  async getWeatherHistory(
    params: PaginationParams
  ): Promise<PaginatedResponse<WeatherData>> {
    const response = await api.get<PaginatedResponse<WeatherData>>(
      "/weathers",
      {
        params,
      }
    );
    return response.data;
  },

  async getAIInsights(): Promise<AIInsight[]> {
    const response = await api.get<AIInsight[]>("/weathers/insights");
    return response.data;
  },

  async exportToCSV(): Promise<Blob> {
    const response = await api.get("/weathers/export/csv", {
      responseType: "blob",
    });
    return response.data;
  },

  async exportToXLSX(): Promise<Blob> {
    const response = await api.get("/weathers/export/xlsx", {
      responseType: "blob",
    });
    return response.data;
  },
};
