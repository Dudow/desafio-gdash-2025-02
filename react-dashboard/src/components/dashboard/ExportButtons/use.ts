import { weatherService } from "@/services/weather";
import { toast } from "sonner";

export const useExportButtons = () => {
  const handleExportCSV = async () => {
    try {
      const blob = await weatherService.exportToCSV();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "weather.csv";
      link.click();

      URL.revokeObjectURL(url);
    } catch {
      toast("Erro ao exportar CSV");
    }
  };

  const handleExportXLSX = async () => {
    try {
      const blob = await weatherService.exportToXLSX();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "weather.xlsx";
      link.click();

      URL.revokeObjectURL(url);
    } catch {
      toast("Erro ao exportar XLSX");
    }
  };

  return {
    handleExportXLSX,
    handleExportCSV,
  };
};
