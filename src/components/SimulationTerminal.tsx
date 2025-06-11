
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Activity } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface SimulationTerminalProps {
  logs: string[];
  isActive: boolean;
}

const SimulationTerminal: React.FC<SimulationTerminalProps> = ({ logs, isActive }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="bg-black/50 border-green-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-400 text-lg">
          <Terminal className="h-5 w-5" />
          Attack Terminal
          {isActive && <Activity className="h-4 w-4 animate-pulse text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80" ref={scrollRef}>
          <div className="font-mono text-sm space-y-1">
            {logs.length === 0 ? (
              <div className="text-green-400/70">
                <span className="animate-pulse">root@cybersec:~$ </span>
                <span className="text-slate-500">Waiting for simulation to start...</span>
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-green-400 leading-relaxed">
                  <span className="text-green-500">root@cybersec:~$ </span>
                  <span>{log}</span>
                </div>
              ))
            )}
            {isActive && (
              <div className="text-green-400">
                <span className="text-green-500">root@cybersec:~$ </span>
                <span className="animate-pulse">█</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SimulationTerminal;
