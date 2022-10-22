import { useState } from 'react';

const useInputs = () => {
  const [form, setForm] = useState('');

  const handler = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  return [form, handler];
};

export default useInputs;
