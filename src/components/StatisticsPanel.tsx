
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Clock, Zap, Lock } from 'lucide-react';

interface SimulationResult {
  algorithm: string;
  time: number;
  keySize: number;
  attempts: string;
  status: 'completed' | 'running' | 'pending';
}

interface StatisticsPanelProps {
  results: SimulationResult[];
  currentPhase: 'idle' | 'aes' | 'dms' | 'complete';
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ results, currentPhase }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'running': return 'bg-yellow-600 animate-pulse';
      default: return 'bg-slate-600';
    }
  };

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(3)}s`;
  };

  const getSecurityLevel = (algorithm: string) => {
    return algorithm === 'DMS4096' ? 'Ultra High' : 'High';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="h-5 w-5" />
          Attack Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentPhase === 'idle' && (
          <div className="text-center py-8 text-slate-400">
            <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No simulation data available</p>
            <p className="text-sm">Start a simulation to view statistics</p>
          </div>
        )}

        {results.map((result, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Zap className="h-4 w-4" />
                {result.algorithm}
              </h3>
              <Badge className={getStatusColor(result.status)}>
                {result.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Key Size:</span>
                  <span className="text-white font-mono">{result.keySize} bits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Attempts:</span>
                  <span className="text-white font-mono">{result.attempts}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Time:</span>
                  <span className="text-white font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(result.time)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Security:</span>
                  <Badge variant={result.algorithm === 'DMS4096' ? 'default' : 'secondary'}>
                    {getSecurityLevel(result.algorithm)}
                  </Badge>
                </div>
              </div>
            </div>
            
            {index < results.length - 1 && <Separator className="bg-slate-600" />}
          </div>
        ))}

        {currentPhase === 'complete' && results.length === 2 && (
          <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
            <h4 className="font-semibold text-purple-300 mb-2">Analysis Summary</h4>
            <div className="text-sm text-purple-200 space-y-1">
              <p>• DMS4096 shows {((results[1].time / results[0].time) * 100).toFixed(1)}% higher resistance</p>
              <p>• Key complexity difference: {results[1].keySize - results[0].keySize} bits</p>
              <p>• Computational advantage: Significant</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticsPanel;
