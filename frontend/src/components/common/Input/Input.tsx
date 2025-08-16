import { forwardRef } from 'react';
import { X } from 'lucide-react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const handleClear = () => {
      if (props.onChange) {
        props.onChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      }
      if (ref && 'current' in ref && ref.current) {
        ref.current.focus();
      }
    };

    return (
      <div className='input-group'>
        <label>{label}</label>
        <div className='input-wrapper'>
          <input className='input' {...props} ref={ref} />
          {props.value && (
            <button
              type='button'
              className='clear-btn'
              onClick={handleClear}
              aria-label='Clear input'
            >
              <X size={18} color='#ffd600' />
            </button>
          )}
        </div>
        {error && <span className='error'>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
