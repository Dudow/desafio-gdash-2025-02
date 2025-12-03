import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useExportButtons } from "./use";

export default function ExportButtons() {
  const { handleExportXLSX, handleExportCSV } = useExportButtons();

  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={handleExportCSV}>
        <FileDown /> Export CSV
      </Button>
      <Button variant="outline" onClick={handleExportXLSX}>
        <FileDown /> Export XLSX
      </Button>
    </div>
  );
}
