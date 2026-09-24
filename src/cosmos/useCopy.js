import { useEffect, useRef, useState } from 'react';

export function useCopy() {
  const [copied, setCopied] = useState('');
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = (key, text) => {
    const done = () => {
      setCopied(key);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(''), 1800);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {});
  };
  return [copied, copy];
}
