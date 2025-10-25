
import React, { useState } from 'react';
import { PersonalDetails } from '../types';

interface Props {
  data: PersonalDetails;
  updateData: (data: Partial<PersonalDetails>) => void;
  onNext: () => void;
}

const PersonalDetailsForm: React.FC<Props> = ({ data, updateData, onNext }) => {
  const [errors, setErrors] = useState<Partial<PersonalDetails>>({});

  const validate = (): boolean => {
    const newErrors: Partial<PersonalDetails> = {};
    if (!data.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!data.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!data.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(data.phone)) {
        newErrors.phone = 'Phone number is invalid.'
    }
    if (!data.address.trim()) newErrors.address = 'Address is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800">Personal Details</h2>
      <p className="text-slate-500">Let's start by getting to know you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-slate-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-slate-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-slate-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-slate-700">Home Address</label>
        <textarea
          id="address"
          name="address"
          rows={3}
          value={data.address}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-slate-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Next: KYC Verification
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
