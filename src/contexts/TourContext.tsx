import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface TourStep {
  target: string;
  title: string;
  description: string;
}

const adminSteps: TourStep[] = [
  { target: 'Command Center', title: 'Command Center', description: 'Your AI-powered dashboard shows key metrics, alerts, and revenue trends at a glance.' },
  { target: 'Sales Reps', title: 'Manage Reps', description: 'Track rep activity scores, pipeline value, and AI performance badges.' },
  { target: 'Comms Center', title: 'Comms Center', description: 'Monitor all rep communications in real time — calls, texts, emails, and presentations.' },
  { target: 'Approvals', title: 'Approvals Queue', description: 'Review and approve compliance entries, expenses, discounts, and high-value deals.' },
  { target: 'Settings', title: 'Settings', description: 'Configure commission tiers, cadence rules, products, and notification preferences.' },
];

const repSteps: TourStep[] = [
  { target: 'My Tasks', title: 'Daily Tasks', description: 'AI-prioritized task list with pre-call briefs, cadence alerts, and urgency indicators.' },
  { target: 'Comms Hub', title: 'Comms Hub', description: 'Call, text, email, or video your doctors — all from one place with AI-assisted drafts.' },
  { target: 'Lead Capture', title: 'Conference Leads', description: 'Capture leads on the go with NPI lookup, interest rating, and voice notes.' },
  { target: 'Pipeline', title: 'My Pipeline', description: 'Track your deals through 6 stages with AI win probability for each.' },
  { target: 'Commission', title: 'Commission', description: 'See your earnings, tier progress, and AI-projected quarterly commission.' },
];

const doctorSteps: TourStep[] = [
  { target: 'Home', title: 'Welcome', description: 'See your recent orders, smart reorder suggestions, and your assigned rep.' },
  { target: 'Order Products', title: 'Ordering', description: 'Browse products, add to cart, and reorder your usual supplies with one tap.' },
  { target: 'My Rep', title: 'Your Rep', description: 'Contact your rep, schedule calls, leave feedback, and view your usage analytics.' },
];

interface TourContextType {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  startTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
}

const TourContext = createContext<TourContextType>({
  isActive: false,
  currentStep: 0,
  steps: [],
  startTour: () => {},
  nextStep: () => {},
  prevStep: () => {},
  endTour: () => {},
});

export const useTour = () => useContext(TourContext);

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = role === 'admin' ? adminSteps : role === 'rep' ? repSteps : doctorSteps;

  const startTour = useCallback(() => { setCurrentStep(0); setIsActive(true); }, []);
  const nextStep = useCallback(() => {
    setCurrentStep(prev => {
      if (prev >= steps.length - 1) { setIsActive(false); return 0; }
      return prev + 1;
    });
  }, [steps.length]);
  const prevStep = useCallback(() => setCurrentStep(prev => Math.max(0, prev - 1)), []);
  const endTour = useCallback(() => { setIsActive(false); setCurrentStep(0); }, []);

  return (
    <TourContext.Provider value={{ isActive, currentStep, steps, startTour, nextStep, prevStep, endTour }}>
      {children}
    </TourContext.Provider>
  );
};
