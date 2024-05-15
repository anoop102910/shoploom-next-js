import useSWR from "swr";
import api from "./api";
const fetcher = url => api.get(url).then(res => res.data.data);

export const useCategories = query => {
  let url = "/categories";
  url = query ? `${url}?name=${query}` : url;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { categories: data, error, isLoading, mutate };
};

export const useBrands = query => {
  let url = "/brands";
  url = query ? `${url}?name=${query}` : url;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { brands: data, error, isLoading, mutate };
};

export const useProducts = (queryParams = {}) => {
  const params = new URLSearchParams();

  if (queryParams.minprice) params.set("minprice", queryParams.minprice);
  if (queryParams.maxprice) params.set("maxprice", queryParams.maxprice);
  if (queryParams.categoryId) params.set("categoryId", queryParams.categoryId);
  if (queryParams.brandId) params.set("brandId", queryParams.brandId);
  if (queryParams.mindiscount) params.set("mindiscount", queryParams.mindiscount);
  if (queryParams.minrating) params.set("minrating", queryParams.minrating);
  if (queryParams.query) params.set("title", queryParams.query);
  if (queryParams.sortBy) params.set("sortBy", queryParams.sortBy);

  let url = "/products";

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { products: data, error, isLoading, mutate };
};

export const useProduct = slug => {
  let url = `/products/${slug}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { product: data, error, isLoading, mutate };
};

export const useCarts = () => {
  const { data, error, isLoading, mutate } = useSWR("/cartitems", fetcher);
  return { cartItems: data, error, isLoading, mutate };
};

export const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR("/users", fetcher);
  return { users: data, error, isLoading, mutate };
};

export const useWishlistItems = () => {
  const { data, error, isLoading, mutate } = useSWR("/wishlistitems", fetcher);
  return { wishlistItems: data, error, isLoading, mutate };
};

export const useAddresses = () => {
  const { data, error, isLoading, mutate } = useSWR("/addresses", fetcher);
  return { addresses: data, error, isLoading, mutate };
};

export const useProfile = () => {
  const { data, error, isLoading, mutate } = useSWR("/users/profile", fetcher);
  return { profile: data, error, isLoading, mutate };
};


export const useReviews = (productId) => {
  const { data, error, isLoading, mutate } = useSWR(`/reviews/product/${productId}`, fetcher);
  return { reviews: data, error, isLoading, mutate };
};

