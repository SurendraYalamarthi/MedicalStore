import { useEffect, useState } from 'react';

const PREFIX = "medicine-store-";

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        let jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue === 'undefined') jsonValue = "";
        if (jsonValue) return JSON.parse(jsonValue);
        if (typeof initialValue == 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
}
