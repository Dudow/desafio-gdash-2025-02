import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SetStateAction } from "react";

interface WeatherTableProps {
  page: number;
  setPage: (value: SetStateAction<number>) => void;
  totalPages: number;
  loading: boolean;
}

export default function WeatherTable({
  page,
  setPage,
  loading = true,
  totalPages,
}: WeatherTableProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1 || loading}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      <span className="text-sm text-gray-600">
        Page {page}/{totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((page) => Math.min(totalPages, page + 1))}
        disabled={page === totalPages || loading}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
