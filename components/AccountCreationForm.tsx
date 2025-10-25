
import React, { useState } from 'react';
import { AccountDetails, AccountType } from '../types';

interface Props {
  data: AccountDetails;
  updateData: (data: Partial<AccountDetails>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const AccountCreationForm: React.FC<Props> = ({ data, updateData, onSubmit, onBack }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(data.initialDeposit < 100) {
      setError('Minimum initial deposit is $100.');
      return;
    }
    setError(null);
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800">Create Your Account</h2>
      <p className="text-slate-500">Choose your account type and make an initial deposit.</p>

      <div>
        <label className="block text-sm font-medium text-slate-700">Account Type</label>
        <fieldset className="mt-2">
          <legend className="sr-only">Account type</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.values(AccountType).map((type) => (
              <label
                key={type}
                className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none transition-all ${data.accountType === type ? 'border-primary-500 ring-2 ring-primary-500' : 'border-gray-300'}`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value={type}
                  className="sr-only"
                  checked={data.accountType === type}
                  onChange={(e) => updateData({ accountType: e.target.value as AccountType })}
                  aria-labelledby={`${type}-label`}
                />
                <div className="flex flex-1">
                  <div className="flex flex-col">
                    <span id={`${type}-label`} className="block text-sm font-medium text-slate-900">{type}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      
      <div>
        <label htmlFor="initialDeposit" className="block text-sm font-medium text-slate-700">Initial Deposit Amount ($)</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="initialDeposit"
            name="initialDeposit"
            value={data.initialDeposit}
            onChange={(e) => updateData({ initialDeposit: parseInt(e.target.value, 10) || 0 })}
            className="block w-full rounded-md border-slate-300 pl-7 pr-12 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="0.00"
            min="100"
            step="10"
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex justify-center py-2 px-6 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Submit & Create Account
        </button>
      </div>
    </form>
  );
};

export default AccountCreationForm;
