import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity?: number;
}

// Add a new product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    console.log("Adding product to Firestore:", product);
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: new Date().toISOString(),
    });
    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error in addProduct:", error);
    throw new Error("Failed to add product to Firestore");
  }
};

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, product);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}; 