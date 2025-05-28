import axios from './axios';
import { User } from '../types/user';
import { Product } from '../types/product';
import { ProductTest } from '../types/productTest';
import { OrderTransaction } from '../types/OrderTransaction';

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get('/users');
  return response.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get('/products');
  return response.data;
};

export const getProductTests = async (): Promise<ProductTest[]> => {
  const response = await axios.get('/product-tests');
  return response.data;
};

export const getOrderTransactions = async (): Promise<OrderTransaction[]> => {
  const response = await axios.get('/order-transactions');
  return response.data;
};