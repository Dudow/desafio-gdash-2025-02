import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  formatDate,
  formatHumidity,
  formatTemperature,
  formatWindSpeed,
} from "@/utils/formatters";
import { useWeatherTable } from "./use";
import Pagination from "@/components/pagination";

export default function WeatherTable() {
  const { loadTableData, data, loading, page, setPage, totalPages } =
    useWeatherTable();

  useEffect(() => {
    loadTableData();
  }, [loadTableData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Records History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Humidity</TableHead>
              <TableHead>Wind Speed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No record found
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDate(item.updatedAt)}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.condition}</TableCell>
                  <TableCell>{formatTemperature(item.temperature)}</TableCell>
                  <TableCell>{formatHumidity(item.humidity)}</TableCell>
                  <TableCell>{formatWindSpeed(item.windSpeed)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Pagination
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </CardContent>
    </Card>
  );
}
