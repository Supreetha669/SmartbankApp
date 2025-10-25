
import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { BankIcon } from './icons/BankIcon';
import { CheckIcon } from './icons/CheckIcon';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { name: 'Personal Details', icon: UserIcon },
  { name: 'KYC Verification', icon: DocumentIcon },
  { name: 'Account Creation', icon: BankIcon },
];

const Step: React.FC<{
  stepNumber: number;
  label: string;
  isCurrent: boolean;
  isCompleted: boolean;
  Icon: React.ElementType;
}> = ({ stepNumber, label, isCurrent, isCompleted, Icon }) => {
  const getCircleClasses = () => {
    if (isCompleted) {
      return 'bg-primary-600 text-white';
    }
    if (isCurrent) {
      return 'border-2 border-primary-600 text-primary-600 bg-primary-50';
    }
    return 'border-2 border-slate-300 text-slate-400 bg-slate-50';
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${getCircleClasses()}`}
      >
        {isCompleted ? <CheckIcon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
      </div>
      <p
        className={`mt-2 text-center text-sm font-medium transition-colors duration-300 ${
          isCurrent || isCompleted ? 'text-primary-700' : 'text-slate-500'
        }`}
      >
        {label}
      </p>
    </div>
  );
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-start w-full px-4 md:px-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Step
            stepNumber={index + 1}
            label={step.name}
            isCurrent={currentStep === index + 1}
            isCompleted={currentStep > index + 1}
            Icon={step.icon}
          />
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 bg-slate-200 mt-6 relative">
              <div
                className="absolute top-0 left-0 h-full bg-primary-600 transition-all duration-500"
                style={{ width: currentStep > index + 1 ? '100%' : '0%' }}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
