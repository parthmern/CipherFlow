import { Select, Option } from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';

export const CodeSelector = ({ language, setLanguage }) => {
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    let cooldownTimeout;

    if (cooldown) {
      cooldownTimeout = setTimeout(() => {
        setCooldown(false);
      }, 30000); // 20 seconds cooldown
    }

    return () => {
      clearTimeout(cooldownTimeout);
    };
  }, [cooldown]);

  const handleLanguageChange = (val) => {
    if (!cooldown) {
      setLanguage(val);
      setCooldown(true);
    }
  };

  return (
    <div className="w-72">
      <Select value={language} onChange={handleLanguageChange} className="text-white" label="Select Version" disabled={cooldown}>
        <Option value="c programming language">C language</Option>
        <Option value="java programming language">Java</Option>
        <Option value="javascript programming language">JavaScript</Option>
        <Option value="cpp programming language">cpp</Option>
        <Option value="python programming language">Python</Option>
      </Select>
    </div>
  );
};
