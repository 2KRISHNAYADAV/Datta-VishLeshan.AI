import React, { useState } from 'react';
import Papa from 'papaparse';
import FileUpload from '@/components/FileUpload';
import DataAnalysis from '@/components/DataAnalysis';
import { toast } from 'sonner';
import { LineChart, BarChart, Database, PieChart, Sparkles } from 'lucide-react';

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const handleFileUpload = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          setData(results.data);
          setColumns(Object.keys(results.data[0]));
          toast.success('File uploaded successfully');
        } else {
          toast.error('Error parsing file');
        }
      },
      error: () => {
        toast.error('Error parsing file');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl font-bold text-center mb-2">
            <span className="inline-block animate-bounce text-[#9b87f5]">D</span>
            <span className="inline-block animate-bounce delay-75 text-[#D946EF]">a</span>
            <span className="inline-block animate-bounce delay-100 text-[#8B5CF6]">t</span>
            <span className="inline-block animate-bounce delay-150 text-[#7E69AB]">t</span>
            <span className="inline-block animate-bounce delay-200 text-[#6E59A5]">a</span>
            <span className="inline-block animate-bounce delay-300 text-[#D6BCFA]">V</span>
            <span className="inline-block animate-bounce delay-300 text-[#9b87f5]">i</span>
            <span className="inline-block animate-bounce delay-400 text-[#D946EF]">s</span>
            <span className="inline-block animate-bounce delay-500 text-[#8B5CF6]">h</span>
            <span className="inline-block animate-bounce delay-600 text-[#7E69AB]">L</span>
            <span className="inline-block animate-bounce delay-700 text-[#6E59A5]">e</span>
            <span className="inline-block animate-bounce delay-800 text-[#D6BCFA]">s</span>
            <span className="inline-block animate-bounce delay-900 text-[#9b87f5]">h</span>
            <span className="inline-block animate-bounce delay-1000 text-[#D946EF]">a</span>
            <span className="inline-block animate-bounce delay-1100 text-[#8B5CF6]">n</span>
            <span className="inline-block text-[#7E69AB]">.AI</span>
          </h1>
          <p className="text-center text-gray-500 mb-8">(DVAN.AI)</p>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your data into actionable insights with our powerful analytics platform
          </p>
        </div>

        {data.length === 0 ? (
          <div className="max-w-4xl mx-auto">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 text-sm">Powerful tools for deep data analysis</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Visual Insights</h3>
                <p className="text-gray-600 text-sm">Beautiful and interactive visualizations</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Data Processing</h3>
                <p className="text-gray-600 text-sm">Efficient handling of large datasets</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-violet-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Powered</h3>
                <p className="text-gray-600 text-sm">Smart insights and predictions</p>
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
              <FileUpload onFileUpload={handleFileUpload} />
            </div>
          </div>
        ) : (
          <DataAnalysis data={data} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Index;