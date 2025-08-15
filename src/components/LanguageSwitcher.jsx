import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2"
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  );
};

export default LanguageSwitcher;

