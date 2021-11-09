import { useState, useCallback } from 'react';

function useInputs(initialForm) {
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setForm(form => ({...form, [name]: value})); // form은 원래상태받아오고, ...form은 그걸 복사, return생략하면서 return으로 ()씀, ()생략가능한데 객체를 반환할때는 불가능 
   /*(form) => {
                 return {...form, [name]: value} 
               } */
    }, []); 
    const reset = useCallback(() => setForm(initialForm), [initialForm]);
    return [form, onChange, reset];
}

export default useInputs;