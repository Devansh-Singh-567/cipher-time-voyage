
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Zap, Terminal, Activity, Lock, AlertTriangle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import SimulationTerminal from '../components/SimulationTerminal';
import ComparisonChart from '../components/ComparisonChart';
import StatisticsPanel from '../components/StatisticsPanel';

interface SimulationResult {
  algorithm: string;
  time: number;
  keySize: number;
  attempts: string;
  status: 'completed' | 'running' | 'pending';
}

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'aes' | 'dms' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const simulateAES256Attack = async (): Promise<number> => {
    addLog("🔒 Initializing AES-256 brute-force simulation...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addLog("🔑 Generating 256-bit encryption key...");
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addLog("📝 Encrypting sample message with AES-256...");
    await new Promise(resolve => setTimeout(resolve, 700));
    
    addLog("⚡ Starting brute-force attack simulation...");
    
    // Simulate progressive attack with multiple stages
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      addLog(`🔄 Testing key combinations... ${i}% complete`);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    addLog("✅ AES-256 simulation completed");
    
    // Simulated time calculation (0.2 base + key complexity)
    return 0.2 + (256 / 512) + Math.random() * 0.3;
  };

  const simulateDMS4096Attack = async (): Promise<number> => {
    addLog("🔐 Initializing DMS4096 brute-force simulation...");
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    addLog("🛡️ Analyzing DMS4096 encryption structure...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addLog("🎯 Attempting to break 4096-bit encryption...");
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addLog("⚠️ Warning: Extremely high computational complexity detected");
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Simulate much longer attack process
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      addLog(`🔄 Deep cryptanalysis in progress... ${i}% complete`);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    addLog("✅ DMS4096 simulation completed");
    
    // Simulated time calculation (0.6 base + significant complexity)
    return 0.6 + 5 + Math.random() * 2;
  };

  const runSimulation = async () => {
    setIsRunning(true);
    setCurrentPhase('aes');
    setResults([]);
    setTerminalLogs([]);
    setProgress(0);

    addLog("🚀 Starting comprehensive encryption brute-force simulation");
    addLog("📊 Target: Sample secret message encryption");
    
    try {
      // AES-256 Simulation
      addLog("📡 Phase 1: AES-256 Attack Simulation");
      const aesTime = await simulateAES256Attack();
      
      const aesResult: SimulationResult = {
        algorithm: 'AES-256',
        time: aesTime,
        keySize: 256,
        attempts: '2^256',
        status: 'completed'
      };
      
      setResults(prev => [...prev, aesResult]);
      setCurrentPhase('dms');
      setProgress(0);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // DMS4096 Simulation
      addLog("📡 Phase 2: DMS4096 Attack Simulation");
      const dmsTime = await simulateDMS4096Attack();
      
      const dmsResult: SimulationResult = {
        algorithm: 'DMS4096',
        time: dmsTime,
        keySize: 4096,
        attempts: '2^4096',
        status: 'completed'
      };
      
      setResults(prev => [...prev, dmsResult]);
      setCurrentPhase('complete');
      
      addLog("🎯 Analysis complete - Results ready for review");
      toast({
        title: "Simulation Complete",
        description: "Brute-force attack simulation finished successfully",
      });
      
    } catch (error) {
      addLog("❌ Simulation error occurred");
      toast({
        title: "Simulation Error",
        description: "An error occurred during the simulation",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const resetSimulation = () => {
    setCurrentPhase('idle');
    setProgress(0);
    setResults([]);
    setTerminalLogs([]);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CyberSec Attack Simulator
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced encryption brute-force simulation comparing AES-256 vs DMS4096 resistance
          </p>
        </div>

        {/* Control Panel */}
        <Card className="mb-6 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Terminal className="h-5 w-5" />
              Simulation Control Panel
            </CardTitle>
            <CardDescription className="text-slate-400">
              Execute comprehensive brute-force attack simulations on different encryption standards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={runSimulation}
                disabled={isRunning}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                {isRunning ? (
                  <>
                    <Activity className="mr-2 h-4 w-4 animate-spin" />
                    Running Simulation...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Start Attack Simulation
                  </>
                )}
              </Button>
              
              <Button 
                onClick={resetSimulation}
                variant="outline"
                disabled={isRunning}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Reset
              </Button>
            </div>

            {isRunning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Current Phase: {currentPhase === 'aes' ? 'AES-256 Attack' : 'DMS4096 Attack'}
                  </span>
                  <span className="text-slate-400">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Terminal Output */}
          <SimulationTerminal logs={terminalLogs} isActive={isRunning} />
          
          {/* Statistics Panel */}
          <StatisticsPanel results={results} currentPhase={currentPhase} />
        </div>

        {/* Results Comparison */}
        {results.length > 0 && (
          <ComparisonChart results={results} />
        )}

        {/* Security Notice */}
        <Card className="mt-6 bg-amber-900/20 border-amber-600/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-400 mb-2">Security Simulation Notice</h3>
                <p className="text-amber-200 text-sm">
                  This is a simulated demonstration for educational purposes. Real brute-force attacks 
                  would require astronomical computational resources and time periods far exceeding 
                  the age of the universe for modern encryption standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
