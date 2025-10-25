
import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface Props {
  accountNumber: string | null;
  onReset: () => void;
}

const SuccessMessage: React.FC<Props> = ({ accountNumber, onReset }) => {
  return (
    <div className="text-center animate-fade-in space-y-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckIcon className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">Account Created Successfully!</h2>
      <p className="text-slate-500">
        Congratulations! Your new SmartBank account is ready.
      </p>
      <div className="bg-slate-100 p-4 rounded-lg w-full max-w-sm">
        <p className="text-sm text-slate-600">Your new account number is:</p>
        <p className="text-xl font-mono font-bold text-primary-700 tracking-wider">
          {accountNumber || 'Generating...'}
        </p>
      </div>
      <p className="text-slate-500 text-sm">You will receive a confirmation email shortly with further details.</p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
      >
        Create Another Account
      </button>
    </div>
  );
};

export default SuccessMessage;
