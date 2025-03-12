import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/router";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CustomPaginationProps) {
  const router = useRouter();
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
    }
  };

  const isAdmin = router.pathname.includes("/admin");

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={isAdmin ? "#" : ""}
            onClick={() => handlePageChange(currentPage - 1)}
            // isActive={currentPage != 1}
          />
        </PaginationItem>

        {totalPages > 1 &&
          getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={isAdmin ? "#" : ""}
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationNext
            href={isAdmin ? "#" : ""}
            onClick={() => {
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
              } else {
                handlePageChange(1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
