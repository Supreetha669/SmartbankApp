
import React, { useState } from 'react';
import { AccountType, FormData } from './types';
import StepIndicator from './components/StepIndicator';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import KycUploadForm from './components/KycUploadForm';
import AccountCreationForm from './components/AccountCreationForm';
import SuccessMessage from './components/SuccessMessage';

const TOTAL_STEPS = 3;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalDetails: { fullName: '', email: '', phone: '', address: '' },
    kycDocument: { documentType: 'Passport', file: null },
    accountDetails: { accountType: AccountType.SAVINGS, initialDeposit: 1000 },
  });
  const [accountNumber, setAccountNumber] = useState<string | null>(null);

  const updateFormData = <T,>(section: keyof FormData, data: T) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Final Form Data Submitted:', formData);
    // Simulate API call and account number generation
    const newAccountNumber = `SB${Date.now()}`;
    setAccountNumber(newAccountNumber);
    setCurrentStep(TOTAL_STEPS + 1); // Move to success screen
  };

  const handleReset = () => {
    setFormData({
      personalDetails: { fullName: '', email: '', phone: '', address: '' },
      kycDocument: { documentType: 'Passport', file: null },
      accountDetails: { accountType: AccountType.SAVINGS, initialDeposit: 1000 },
    });
    setAccountNumber(null);
    setCurrentStep(1);
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsForm
            data={formData.personalDetails}
            updateData={(data) => updateFormData('personalDetails', data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <KycUploadForm
            data={formData.kycDocument}
            updateData={(data) => updateFormData('kycDocument', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <AccountCreationForm
            data={formData.accountDetails}
            updateData={(data) => updateFormData('accountDetails', data)}
            onSubmit={handleSubmit}
            onBack={prevStep}
          />
        );
      case 4:
        return <SuccessMessage accountNumber={accountNumber} onReset={handleReset} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-primary-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary-800">SmartBank</h1>
        <p className="text-lg text-slate-600 mt-2">Welcome to your modern banking experience.</p>
      </header>

      <main className="w-full max-w-2xl bg-white rounded-2xl shadow-xl transition-all duration-500">
        <div className="p-8 border-b border-slate-200">
           <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>
        <div className="p-8">
            {renderStep()}
        </div>
      </main>

      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} SmartBank. All rights reserved.</p>
        <p>A secure and seamless digital banking platform.</p>
      </footer>
    </div>
  );
};

export default App;
