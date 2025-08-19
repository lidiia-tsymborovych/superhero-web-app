import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className='error-container'>
    <div className='error-message' role='alert'>
      <p>{message}</p>
      <p>Please try again later</p>
    </div>
  </div>
);
