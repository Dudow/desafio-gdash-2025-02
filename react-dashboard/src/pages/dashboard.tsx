import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, CloudRain, Droplets, Wind, TrendingUp } from "lucide-react";
import WeatherChart from "../components/dashboard/WeatherChart";
import WeatherTable from "../components/dashboard/WeatherTable";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";
import { downloadBlob } from "../utils/exportData";
import { WeatherData } from "@/types/weather";
import { AIInsight } from "@/types/ai";
import { weatherService } from "@/services/weather";

export default function Dashboard() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [weatherData, aiInsights] = await Promise.all([
        weatherService.getCurrentWeather(),
        weatherService.getAIInsights(),
      ]);
      setCurrentWeather(weatherData);
      setInsights(aiInsights);
    } catch (error: any) {
      toast("Erro ao carregar dados", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: "csv" | "xlsx") => {
    setExporting(true);
    try {
      const blob =
        format === "csv"
          ? await weatherService.exportToCSV()
          : await weatherService.exportToXLSX();

      downloadBlob(blob, `weather-data.${format}`);
      toast("Exportação concluída", {
        description: `Arquivo ${format.toUpperCase()} baixado com sucesso.`,
      });
    } catch (error: any) {
      toast("Erro na exportação", {
        description: error.message,
      });
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Weather Dashboard
            </h1>
            <p className="text-gray-600">
              Last Update:{" "}
              {currentWeather?.timestamp &&
                new Date(currentWeather.timestamp).toLocaleString("pt-BR")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => handleExport("csv")} disabled={exporting}>
              <Download className="w-4 h-4 mr-2" />
              Export as CSV
            </Button>
            <Button onClick={() => handleExport("xlsx")} disabled={exporting}>
              <Download className="w-4 h-4 mr-2" />
              Export as XLSX
            </Button>
          </div>
        </div>

        {/* Weather Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentWeather?.temperature.toFixed(1)}°C
              </div>
              <p className="text-xs text-muted-foreground">
                Wind chill: {currentWeather?.feelsLike?.toFixed(1)}°C
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentWeather?.humidity}%
              </div>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wind</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentWeather?.windSpeed} km/h
              </div>
              <p className="text-xs text-muted-foreground">Wind Speed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Condition</CardTitle>
              <CloudRain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentWeather?.condition}
              </div>
              <p className="text-xs text-muted-foreground">
                {currentWeather?.location}
              </p>
            </CardContent>
          </Card>
        </div>

        <AIInsightsCard insights={insights} />

        <Tabs defaultValue="charts" className="w-full">
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="table">Data Table</TabsTrigger>
          </TabsList>
          <TabsContent value="charts">
            <WeatherChart />
          </TabsContent>
          <TabsContent value="table">
            <WeatherTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
