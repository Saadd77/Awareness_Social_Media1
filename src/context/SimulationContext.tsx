import { createContext, useContext, useState, ReactNode } from 'react';

export interface AdminState {
  nationalismLevel: number;
  censorshipLevel: number;
  outrageBoost: number;
  screenTimeBoost: number;
  proAmericanContent: boolean;
  antiForeignPlatforms: boolean;
  strongLeaderContent: boolean;
  influencerObsession: number;
  emotionalManipulation: number;
  wealthFlexing: boolean;
  nationalPride: boolean;
  shortClipPriority: boolean;
  currentDay: number;
}

interface SimulationContextType {
  adminState: AdminState;
  updateAdminState: (updates: Partial<AdminState>) => void;
  advanceDay: () => void;
  resetSimulation: () => void;
}

const defaultAdminState: AdminState = {
  nationalismLevel: 30,
  censorshipLevel: 20,
  outrageBoost: 25,
  screenTimeBoost: 40,
  proAmericanContent: false,
  antiForeignPlatforms: false,
  strongLeaderContent: false,
  influencerObsession: 35,
  emotionalManipulation: 30,
  wealthFlexing: false,
  nationalPride: false,
  shortClipPriority: true,
  currentDay: 1,
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [adminState, setAdminState] = useState<AdminState>(defaultAdminState);

  const updateAdminState = (updates: Partial<AdminState>) => {
    setAdminState(prev => ({ ...prev, ...updates }));
  };

  const advanceDay = () => {
    setAdminState(prev => ({ ...prev, currentDay: prev.currentDay + 1 }));
  };

  const resetSimulation = () => {
    setAdminState(defaultAdminState);
  };

  return (
    <SimulationContext.Provider value={{ adminState, updateAdminState, advanceDay, resetSimulation }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
