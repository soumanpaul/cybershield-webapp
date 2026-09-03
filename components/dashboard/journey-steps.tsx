import { Check } from "lucide-react";

interface JourneyStepsProps {
  labels: readonly string[];
  active: number;
}

export function JourneySteps({ labels, active }: JourneyStepsProps) {
  return (
    <div className="journey-steps">
      {labels.map((label, index) => (
        <div key={label} className={index <= active ? "active" : ""}>
          <span>{index < active ? <Check /> : index + 1}</span>
          <small>{label}</small>
          {index < labels.length - 1 && <i />}
        </div>
      ))}
    </div>
  );
}
