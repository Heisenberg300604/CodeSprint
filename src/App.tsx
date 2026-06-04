import React, { useEffect } from 'react';
import CodeSprintApp from './components/CodeSprintApp';
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-[100dvh] w-full bg-[#060B14] text-[#F8FAFC]">
        <CodeSprintApp />
      </div>
    </TooltipProvider>
  );
}

export default App;
