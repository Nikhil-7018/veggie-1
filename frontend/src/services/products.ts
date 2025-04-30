import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  userId: string;
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
    console.log("Fetching products from Firestore...");
    const querySnapshot = await getDocs(collection(db, 'products'));
    console.log("Query snapshot received:", querySnapshot.size, "documents");
    
    const products = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log("Processing document:", doc.id, data);
      
      // Ensure all required fields are present
      const product: Product = {
        id: doc.id,
        name: data.name || '',
        price: data.price || 0,
        image: data.image || '',
        description: data.description || '',
        category: data.category || '',
        userId: data.userId || '',
        quantity: data.quantity || 0
      };
      
      return product;
    });
    
    console.log("Final products array:", products);
    return products;
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
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "products", productId));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}; 