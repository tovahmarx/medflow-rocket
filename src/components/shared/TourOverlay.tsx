import { useTour } from '@/contexts/TourContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function TourOverlay() {
  const { isActive, currentStep, steps, nextStep, prevStep, endTour } = useTour();

  if (!isActive || steps.length === 0) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="fixed inset-0 bg-foreground/50" onClick={endTour} />
      <div className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-background p-6 shadow-xl">
        <button onClick={endTour} className="absolute right-3 top-3 tap-target">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {currentStep + 1} / {steps.length}
          </span>
        </div>

        <h3 className="mt-2 text-lg font-bold text-foreground">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground disabled:opacity-30 tap-target"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={nextStep}
            className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground tap-target"
          >
            {isLast ? 'Done' : 'Next'} {!isLast && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* Progress dots */}
        <div className="mt-4 flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
