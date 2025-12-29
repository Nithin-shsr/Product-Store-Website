import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL=" http://localhost:3000";

export const useProductStore = create((set,get) => ({
    products: [],
    loading: false,
    error : null,

    fetchProducts: async()=>{
        set({loading:true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products`);
            set({products:response.data.data,error:null});
        } 
        catch (err) {
            if (err.status == 429) set({error:"Rate Limit Exceeded. Please try again later.",products:[]});
            else set({error: "An error occurred while fetching products.", products:[]});
        }
        finally{
            set({loading:false});
        }
    },

    deleteProduct: async(id)=>{
        set({loading:true});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set((prev) =>({
                products:prev.products.filter((product)=>product.id !== id)
            }));
            toast.success("Product deleted successfully.");
        } catch (error) {
            console.log("Error in deleteProduct Function",error);
            toast.error("Oops! Failed to delete the product.");
        }
        finally{
            set({loading:false});
        }
    }

}));