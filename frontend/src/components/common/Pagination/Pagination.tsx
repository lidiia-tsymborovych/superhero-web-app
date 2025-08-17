import { Button } from '../Button';
import './Pagination.css';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  className?: string;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  className = '',
}: Props) => {
  // Кількість видимих сторінок
  const visiblePages = 3;
  let startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  // Перевірка, щоб завжди показувати visiblePages
  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={`pagination ${className}`}>
      <Button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Prev
      </Button>

      {pages.map(p => (
        <Button
          key={p}
          onClick={() => onPageChange(p)}
          className={`pagination-btn-page ${p === page ? 'active' : ''}`}
        >
          {p}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};
