import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n/translations';
import { X, Calendar, User, Building, FileText, Target, AlertTriangle } from 'lucide-react';

const NewAuditForm = ({ isOpen, onClose, onSubmit }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [formData, setFormData] = useState({
    auditTitle: '',
    auditType: '',
    auditScope: '',
    auditObjective: '',
    department: '',
    assignedAuditor: '',
    startDate: '',
    endDate: '',
    priority: 'medium',
    description: '',
    riskLevel: 'low',
    complianceFramework: '',
    estimatedHours: '',
    budget: ''
  });

  const auditTypes = [
    'Financial Audit',
    'Operational Audit',
    'Compliance Audit',
    'IT Security Audit',
    'Risk Assessment',
    'Internal Controls Review',
    'Performance Audit'
  ];

  const departments = [
    'Finance',
    'IT',
    'Human Resources',
    'Operations',
    'Procurement',
    'Legal',
    'Marketing',
    'Sales'
  ];

  const auditors = [
    'Sarah Al-Mahmoud',
    'Ahmed Al-Rashid',
    'Fatima Al-Zahra',
    'Omar Al-Kindi',
    'Layla Al-Mansouri',
    'Khalid Al-Hashemi'
  ];

  const complianceFrameworks = [
    'ISO 27001',
    'SOX',
    'GDPR',
    'COSO',
    'IIA Standards',
    'Basel III',
    'COBIT'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate audit number
    const auditNumber = `AUD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    const newAudit = {
      ...formData,
      auditNumber,
      status: 'Planning',
      createdDate: new Date().toISOString().split('T')[0],
      progress: 0
    };

    onSubmit(newAudit);
    
    // Reset form
    setFormData({
      auditTitle: '',
      auditType: '',
      auditScope: '',
      auditObjective: '',
      department: '',
      assignedAuditor: '',
      startDate: '',
      endDate: '',
      priority: 'medium',
      description: '',
      riskLevel: 'low',
      complianceFramework: '',
      estimatedHours: '',
      budget: ''
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'تدقيق جديد' : 'New Audit'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'عنوان التدقيق' : 'Audit Title'} *
                </label>
                <input
                  type="text"
                  name="auditTitle"
                  value={formData.auditTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'ar' ? 'أدخل عنوان التدقيق' : 'Enter audit title'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'نوع التدقيق' : 'Audit Type'} *
                </label>
                <select
                  name="auditType"
                  value={formData.auditType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{language === 'ar' ? 'اختر نوع التدقيق' : 'Select audit type'}</option>
                  {auditTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'القسم' : 'Department'} *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{language === 'ar' ? 'اختر القسم' : 'Select department'}</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'المدقق المسؤول' : 'Assigned Auditor'} *
                </label>
                <select
                  name="assignedAuditor"
                  value={formData.assignedAuditor}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{language === 'ar' ? 'اختر المدقق' : 'Select auditor'}</option>
                  {auditors.map(auditor => (
                    <option key={auditor} value={auditor}>{auditor}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Scope and Objectives Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5" />
              {language === 'ar' ? 'النطاق والأهداف' : 'Scope & Objectives'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'نطاق التدقيق' : 'Audit Scope'} *
              </label>
              <textarea
                name="auditScope"
                value={formData.auditScope}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={language === 'ar' ? 'وصف نطاق التدقيق' : 'Describe the audit scope'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'هدف التدقيق' : 'Audit Objective'} *
              </label>
              <textarea
                name="auditObjective"
                value={formData.auditObjective}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={language === 'ar' ? 'وصف هدف التدقيق' : 'Describe the audit objective'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'الوصف التفصيلي' : 'Description'}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={language === 'ar' ? 'معلومات إضافية عن التدقيق' : 'Additional information about the audit'}
              />
            </div>
          </div>

          {/* Timeline and Resources Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {language === 'ar' ? 'الجدولة والموارد' : 'Timeline & Resources'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'تاريخ البداية' : 'Start Date'} *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'تاريخ النهاية' : 'End Date'} *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'الساعات المقدرة' : 'Estimated Hours'}
                </label>
                <input
                  type="number"
                  name="estimatedHours"
                  value={formData.estimatedHours}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'ar' ? 'عدد الساعات' : 'Number of hours'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'الميزانية المقدرة' : 'Estimated Budget'}
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'ar' ? 'المبلغ بالدولار' : 'Amount in USD'}
                />
              </div>
            </div>
          </div>

          {/* Risk and Compliance Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {language === 'ar' ? 'المخاطر والامتثال' : 'Risk & Compliance'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'الأولوية' : 'Priority'} *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">{language === 'ar' ? 'منخفضة' : 'Low'}</option>
                  <option value="medium">{language === 'ar' ? 'متوسطة' : 'Medium'}</option>
                  <option value="high">{language === 'ar' ? 'عالية' : 'High'}</option>
                  <option value="critical">{language === 'ar' ? 'حرجة' : 'Critical'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'مستوى المخاطر' : 'Risk Level'} *
                </label>
                <select
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">{language === 'ar' ? 'منخفض' : 'Low'}</option>
                  <option value="medium">{language === 'ar' ? 'متوسط' : 'Medium'}</option>
                  <option value="high">{language === 'ar' ? 'عالي' : 'High'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'إطار الامتثال' : 'Compliance Framework'}
                </label>
                <select
                  name="complianceFramework"
                  value={formData.complianceFramework}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{language === 'ar' ? 'اختر الإطار' : 'Select framework'}</option>
                  {complianceFrameworks.map(framework => (
                    <option key={framework} value={framework}>{framework}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              {language === 'ar' ? 'إنشاء التدقيق' : 'Create Audit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAuditForm;

