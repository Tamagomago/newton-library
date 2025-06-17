import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { useNavigate } from '@tanstack/react-router';
import { type FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';

interface CollectionsPaginationProps {
  startIndex?: number;
  totalResults: number;
}

function CollectionsPagination({
  startIndex = 0,
  totalResults = 0,
}: CollectionsPaginationProps) {
  const navigate = useNavigate();
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(
    Math.floor(startIndex / pageSize) + 1
  );

  useEffect(() => {
    setCurrentPage(Math.floor(startIndex / pageSize) + 1);
  }, [startIndex]);

  const hasNextPage = startIndex + pageSize < totalResults;
  const hasPrevPage = currentPage > 1;

  const goToPage = async (newStartIndex: number, e: FormEvent) => {
    e.preventDefault();
    await navigate({
      to: '/collections',
      search: (prev) => ({
        ...prev,
        startIndex: newStartIndex,
      }),
    });
  };

  return (
    <Pagination className={'pb-5 text-white/50'}>
      <PaginationContent>
        <PaginationItem
          className={hasPrevPage ? '' : 'pointer-events-none opacity-50'}
        >
          <PaginationPrevious
            onClick={(e) =>
              hasPrevPage && goToPage(Math.max(startIndex - pageSize, 0), e)
            }
          />
        </PaginationItem>
        <PaginationItem className={'text-center'}>
          <Button
            variant={'ghost'}
            className={'hover:bg-transparent hover:text-white'}
          >
            {currentPage}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={(e) => hasNextPage && goToPage(startIndex + pageSize, e)}
            className={hasNextPage ? '' : 'pointer-events-none opacity-50'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default CollectionsPagination;
