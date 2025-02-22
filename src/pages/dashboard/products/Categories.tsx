
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data - replace with API call
const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
    level: 1,
    path: "/electronics",
    parent: null,
  },
  {
    id: 2,
    name: "Clothing",
    description: "Fashion and apparel",
    level: 1,
    path: "/clothing",
    parent: null,
  },
  {
    id: 3,
    name: "Books",
    description: "Books and literature",
    level: 1,
    path: "/books",
    parent: null,
  },
  {
    id: 4,
    name: "Smartphones",
    description: "Mobile phones and accessories",
    level: 2,
    path: "/electronics/smartphones",
    parent: "Electronics",
  },
  {
    id: 5,
    name: "Laptops",
    description: "Notebooks and accessories",
    level: 2,
    path: "/electronics/laptops",
    parent: "Electronics",
  },
  {
    id: 6,
    name: "Men's Wear",
    description: "Men's clothing and accessories",
    level: 2,
    path: "/clothing/mens",
    parent: "Clothing",
  },
  {
    id: 7,
    name: "Women's Wear",
    description: "Women's clothing and accessories",
    level: 2,
    path: "/clothing/womens",
    parent: "Clothing",
  },
  {
    id: 8,
    name: "Fiction",
    description: "Fiction books",
    level: 2,
    path: "/books/fiction",
    parent: "Books",
  },
  {
    id: 9,
    name: "Non-Fiction",
    description: "Non-fiction books",
    level: 2,
    path: "/books/non-fiction",
    parent: "Books",
  },
  {
    id: 10,
    name: "Children's Books",
    description: "Books for children",
    level: 2,
    path: "/books/children",
    parent: "Books",
  },
];

const ITEMS_PER_PAGE = 5;

const Categories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: number) => {
    console.log("Deleting category:", id);
    toast({
      title: "Category deleted",
      description: "The category has been successfully deleted.",
    });
  };

  const handleEdit = (id: number) => {
    navigate(`/dashboard/products/categories/edit/${id}`);
  };

  // Calculate pagination
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-muted-foreground">
            Manage your product categories here.
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/products/categories/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.level}</TableCell>
                <TableCell>{category.path}</TableCell>
                <TableCell>{category.parent || "Root"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Categories;
