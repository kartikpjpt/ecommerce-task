interface FilterRadioButtonProps {
    name: string;
    value: string | number;
    checked: boolean;
    onChange: () => void;
    label: string;
}

export function FilterRadioButton({ name, value, checked, onChange, label }: FilterRadioButtonProps) {
    return (
        <label className='group hover:bg-brand-green/10 flex cursor-pointer items-center rounded-md px-2 py-1 transition-colors'>
            <input type='radio' name={name} value={value} checked={checked} onChange={onChange} className='sr-only' />
            <div
                className={`mr-3 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all ${
                    checked ? 'border-brand-green bg-brand-green' : 'border-gray-300'
                }`}>
                <div className={`h-1.5 w-1.5 rounded-full bg-white transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <span className={`text-sm transition-colors group-hover:text-brand-green ${checked ? 'font-medium text-brand-green' : ''}`}>
                {label}
            </span>
        </label>
    );
}
