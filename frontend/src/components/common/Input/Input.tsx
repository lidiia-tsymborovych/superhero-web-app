import { forwardRef, useRef, useImperativeHandle } from 'react';
import { X } from 'lucide-react';
import './Input.css';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  multiline?: boolean;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ label, error, multiline, ...props }, ref) => {
  const innerRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => innerRef.current!);

  const handleClear = () => {
    if (props.onChange) {
      props.onChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    }
    innerRef.current?.focus();
  };

  const handleFocus = () => {
    if (innerRef.current && 'selectionStart' in innerRef.current) {
      const length = innerRef.current.value.length;
      innerRef.current.setSelectionRange(length, length);
    }
  };

  return (
    <div className='input-group'>
      <label>{label}</label>
      <div className='input-wrapper'>
        {multiline ? (
          <textarea
            className='input'
            {...props}
            ref={innerRef as React.Ref<HTMLTextAreaElement>}
            onFocus={handleFocus}
          />
        ) : (
          <input
            className='input'
            {...props}
            ref={innerRef as React.Ref<HTMLInputElement>}
            onFocus={handleFocus}
          />
        )}

        {props.value && (
          <button
            type='button'
            className='clear-btn'
            onClick={handleClear}
            aria-label='Clear input'
          >
            <X size={18} color='#ffe680' />
          </button>
        )}
      </div>
      {error && <span className='error'>{error}</span>}
    </div>
  );
});

