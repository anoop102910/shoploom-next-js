import useSWR from "swr";
import api from "./api";
const fetcher = url => api.get(url).then(res => res.data.data);

export const useCategories = (queryParams = {}) => {
  const params = new URLSearchParams();

  if (queryParams.query) params.set("name", queryParams.query);
  if (queryParams.type) params.set("type", queryParams.type);
  if (queryParams.limit) params.set("limit", queryParams.limit);
  if (queryParams.page) params.set("page", queryParams.page);
  let url = "/categories";

  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { categories: data, error, isLoading, mutate };
};

export const useBrands = (queryParams = {}) => {
  const params = new URLSearchParams();

  if (queryParams.query) params.set("name", queryParams.query);
  if (queryParams.categoryId) params.set("categoryId", queryParams.categoryId);
  let url = "/brands";

  if (params.toString()) {
    url += `?${params.toString()}`;
  }
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
  if (queryParams.page) params.set("page", queryParams.page);
  if (queryParams.categoryName) params.set("categoryName", queryParams.categoryName);
  if (queryParams.brandName) params.set("brandName", queryParams.brandName);

  params.set("limit", 15);

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

export const useUsers = (queryParams = {}) => {
  const params = new URLSearchParams();
  if (queryParams.query) params.set("name", queryParams.query);
  let url = "/users";

  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
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

export const useReviews = productId => {
  const { data, error, isLoading, mutate } = useSWR(`/reviews/product/${productId}`, fetcher);
  return { reviews: data, error, isLoading, mutate };
};

export const useOrders = () => {
  const { data, error, isLoading, mutate } = useSWR("/orders", fetcher);
  return { orders: data, error, isLoading, mutate };
};

export const useOrder = orderId => {
  const { data, error, isLoading, mutate } = useSWR(`/orders/${orderId}`, fetcher);
  return { order: data, error, isLoading, mutate };
};
