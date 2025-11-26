import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from './AuthContext';

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
  syncedSession: boolean;
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
  const [syncedSession, setSyncedSession] = useState(false);
  const { user, sessionId, userRole } = useAuth();

  useEffect(() => {
    if (!user || !sessionId || !userRole) return;

    const loadSessionState = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_directives')
          .select('*')
          .eq('session_id', sessionId)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setAdminState({
            nationalismLevel: data.nationalism_level || 30,
            censorshipLevel: data.censorship_level || 20,
            outrageBoost: data.outrage_boost || 25,
            screenTimeBoost: data.screen_time_boost || 40,
            proAmericanContent: data.pro_american_content || false,
            antiForeignPlatforms: data.anti_foreign_platforms || false,
            strongLeaderContent: data.strong_leader_content || false,
            influencerObsession: data.influencer_obsession || 35,
            emotionalManipulation: data.emotional_manipulation || 30,
            wealthFlexing: data.wealth_flexing || false,
            nationalPride: data.national_pride || false,
            shortClipPriority: data.short_clip_priority !== false,
            currentDay: data.current_day || 1,
          });
          setSyncedSession(true);
        }
      } catch (err) {
        console.error('Failed to load session state:', err);
      }
    };

    loadSessionState();

    const subscription = supabase
      .channel(`directives:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'admin_directives',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const data = payload.new;
          setAdminState({
            nationalismLevel: data.nationalism_level || 30,
            censorshipLevel: data.censorship_level || 20,
            outrageBoost: data.outrage_boost || 25,
            screenTimeBoost: data.screen_time_boost || 40,
            proAmericanContent: data.pro_american_content || false,
            antiForeignPlatforms: data.anti_foreign_platforms || false,
            strongLeaderContent: data.strong_leader_content || false,
            influencerObsession: data.influencer_obsession || 35,
            emotionalManipulation: data.emotional_manipulation || 30,
            wealthFlexing: data.wealth_flexing || false,
            nationalPride: data.national_pride || false,
            shortClipPriority: data.short_clip_priority !== false,
            currentDay: data.current_day || 1,
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, sessionId, userRole]);

  const updateAdminState = async (updates: Partial<AdminState>) => {
    setAdminState(prev => ({ ...prev, ...updates }));

    if (!sessionId || !userRole || userRole !== 'admin') return;

    try {
      const dbUpdates: Record<string, any> = {};

      if (updates.nationalismLevel !== undefined)
        dbUpdates.nationalism_level = updates.nationalismLevel;
      if (updates.censorshipLevel !== undefined)
        dbUpdates.censorship_level = updates.censorshipLevel;
      if (updates.outrageBoost !== undefined)
        dbUpdates.outrage_boost = updates.outrageBoost;
      if (updates.screenTimeBoost !== undefined)
        dbUpdates.screen_time_boost = updates.screenTimeBoost;
      if (updates.proAmericanContent !== undefined)
        dbUpdates.pro_american_content = updates.proAmericanContent;
      if (updates.antiForeignPlatforms !== undefined)
        dbUpdates.anti_foreign_platforms = updates.antiForeignPlatforms;
      if (updates.strongLeaderContent !== undefined)
        dbUpdates.strong_leader_content = updates.strongLeaderContent;
      if (updates.influencerObsession !== undefined)
        dbUpdates.influencer_obsession = updates.influencerObsession;
      if (updates.emotionalManipulation !== undefined)
        dbUpdates.emotional_manipulation = updates.emotionalManipulation;
      if (updates.wealthFlexing !== undefined)
        dbUpdates.wealth_flexing = updates.wealthFlexing;
      if (updates.nationalPride !== undefined)
        dbUpdates.national_pride = updates.nationalPride;
      if (updates.shortClipPriority !== undefined)
        dbUpdates.short_clip_priority = updates.shortClipPriority;

      if (Object.keys(dbUpdates).length > 0) {
        dbUpdates.updated_at = new Date().toISOString();

        const { error } = await supabase
          .from('admin_directives')
          .update(dbUpdates)
          .eq('session_id', sessionId);

        if (error) throw error;
      }
    } catch (err) {
      console.error('Failed to sync admin state:', err);
    }
  };

  const advanceDay = async () => {
    const newDay = adminState.currentDay + 1;
    setAdminState(prev => ({ ...prev, currentDay: newDay }));

    if (!sessionId) return;

    try {
      const { error } = await supabase
        .from('sessions')
        .update({ current_day: newDay })
        .eq('id', sessionId);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to advance day:', err);
    }
  };

  const resetSimulation = () => {
    setAdminState(defaultAdminState);
  };

  return (
    <SimulationContext.Provider value={{ adminState, updateAdminState, advanceDay, resetSimulation, syncedSession }}>
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
