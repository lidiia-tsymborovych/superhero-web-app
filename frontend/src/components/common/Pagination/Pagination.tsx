import { Button } from '../Button';
import './Pagination.css';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: Props) => (
  <div className='pagination'>
    <Button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
      Prev
    </Button>
    <span>
      {page} / {totalPages}
    </span>
    <Button
      onClick={() => onPageChange(page + 1)}
      disabled={page >= totalPages}
    >
      Next
    </Button>
  </div>
);

