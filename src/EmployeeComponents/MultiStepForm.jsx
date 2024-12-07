import React, { useState } from 'react';
import BasicDetailsForm from './BasicDetailsForm';
import ProfessionalDetailsForm from './ProfessionalDetailsForm';
import DocumentUploadForm from './DocumentUploadForm';
import SuccessPage from './SuccessPage';

const MultiStepForm = ({ onCancel }) => {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        streetAddress: '',
        city: '',
        region: '',
        postalCode: '',
        companyName: '',
        employeeId: '',
        corporateEmail: '',
        jobRole: '',
        employmentStatus: '',
        reportingTo: '',
        role: '',
        credentials: null // For credentials data from API
    };

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleFormDataChange = (newData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...newData
        }));
    };

    const handleCancel = () => {
        setStep(1);
        setFormData(initialFormData);
        onCancel();
    };

    return (
        <>
            {step === 1 && (
                <BasicDetailsForm
                    formData={formData}
                    onNext={handleNext}
                    onCancel={handleCancel}
                    onFormDataChange={handleFormDataChange}
                />
            )}
            {step === 2 && (
                <ProfessionalDetailsForm
                    formData={formData}
                    onNext={handleNext}
                    onBack={handleBack}
                    onFormDataChange={handleFormDataChange}
                    onCancel={handleCancel}
                />
            )}
            {step === 3 && (
                <DocumentUploadForm
                    formData={formData}
                    onNext={handleNext}
                    onBack={handleBack}
                    onFormDataChange={handleFormDataChange}
                    onCancel={handleCancel}
                />
            )}
            {step === 4 && (
                <SuccessPage
                    formData={formData} // Pass credentials to success page
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default MultiStepForm;
