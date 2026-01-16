import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { getAllProductService, getOneProductService, deleteOneProductService, updateOneProductService, createOneProductService } from '../../services/admin/ProductService';

export const useAdminProduct = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ['admin_product', pageNumber, pageSize, search],
    queryFn: () => getAllProductService({
      page: pageNumber,
      limit: pageSize,
      search,
    }),
    keepPreviousData: true,
  });

  const products = query.data?.products || [];
  const pagination = query.data?.pagination || { page: 1, totalPages: 1, limit: 10 };
  const canPreviousPage = pagination.page > 1;
  const canNextPage = pagination.page < pagination.totalPages;

  return {
    ...query,
    products,
    pageNumber,
    setPageNumber,
    pagination,
    canPreviousPage,
    canNextPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
  };
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOneProductService,
    onSuccess: () => {
      toast.success('Product created successfully!');
      queryClient.invalidateQueries(['admin_product']);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create product');
    },
  });
};

export const useGetOneProduct = (id) => {
  return useQuery({
    queryKey: ['admin_product', id],
    queryFn: () => getOneProductService(id),
    enabled: !!id,
    select: (data) => data.data || data,  // optional
  });
};

export const useUpdateOneProduct = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: ({ id, data }) =>
                updateOneProductService(id, data),
            onSuccess: () => {
                toast.success("product updated")
                queryClient.invalidateQueries(["admin_product"])
            },
            onError: (err) => {
                toast.error(err.message || "Failed to update")
            }
        }
    )
}

export const useDeleteOneProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOneProductService,
    mutationKey: ["admin_product_delete"],
    onSuccess: () => {
      toast.success("Product Deleted");
      queryClient.invalidateQueries(['admin_product']);
    },
    onError: (err) => {
      toast.error(err.message || "Delete failed");
    },
  });
};


