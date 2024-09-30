import { useState } from 'react';
const useJar = () => {
    const [jarItems, setJarItems] = useState<object>({});
    const addItemInJar = (itemId: number) => {
        setJarItems((s: any) => ({
            ...s,
            [itemId]: 1 + (s[itemId] || 0)
        }))
    };
    const removeItemInJar = (itemId: number) => {
        setJarItems((s: object) => ({
            ...s,
            [itemId]: 0
        }))
    }
    return { jarItems, addItemInJar, removeItemInJar }
};

export default useJar;
