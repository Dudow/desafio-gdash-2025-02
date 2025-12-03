import { weatherService } from "@/services/weather";
import { WeatherData } from "@/types/weather";
import { useCallback, useState } from "react";

export const useWeatherTable = () => {
  const [data, setData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadTableData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await weatherService.getWeatherHistory({
        page,
        limit: 10,
      });
      setData(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  return {
    loadTableData,
    loading,
    data,
    setPage,
    page,
    totalPages,
  };
};
