import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataAnalysisProps {
  data: any[];
  columns: string[];
}

const DataAnalysis = ({ data, columns }: DataAnalysisProps) => {
  const calculateStats = (column: string) => {
    const values = data.map(row => parseFloat(row[column])).filter(val => !isNaN(val));
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    const sorted = [...values].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const missing = data.length - values.length;

    return { mean, median, missing };
  };

  const numericColumns = columns.filter(column => {
    const sample = data[0][column];
    return !isNaN(parseFloat(sample));
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {numericColumns.map(column => {
          const stats = calculateStats(column);
          return (
            <Card key={column} className="stats-card">
              <CardHeader>
                <CardTitle className="text-lg">{column}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Mean</dt>
                    <dd className="text-sm font-medium">{stats.mean.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Median</dt>
                    <dd className="text-sm font-medium">{stats.median.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Missing Values</dt>
                    <dd className="text-sm font-medium">{stats.missing}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {numericColumns.map(column => (
        <div key={column} className="chart-container">
          <h3 className="text-lg font-medium mb-4">{column} Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={column} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={column} fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default DataAnalysis;