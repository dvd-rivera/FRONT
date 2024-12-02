import React, { createContext, useState } from "react";
import { ProductDefault } from "../models/productos.interface";
import BASE_URL from "../../env";
import { NewTheme } from "../models/themes.interface";

// Define la interfaz del contexto
interface MaintainerContextType {
  newSelectedProduct: ProductDefault | null;
  updateProduct: (product: ProductDefault) => Promise<void>;
  addProduct: (product: ProductDefault) => Promise<void>;
  addTheme: (theme: NewTheme) => Promise<void>;
  addCategory: () => Promise<void>;
}

// Crear el contexto
export const MaintainerContext = createContext<MaintainerContextType | undefined>(
  undefined
);

// Proveedor del contexto
export const MaintainerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [newSelectedProduct, setNewSelectedProduct] = useState<ProductDefault | null>(
    null
  );

  // Actualiza un producto seleccionado
const updateProduct = async (product: ProductDefault) => {
    const token = localStorage.getItem("Auth"); // Obtiene el token del localStorage
    if (!token) {
      console.error("No se encontró un token en localStorage");
      return;
    }
    console.log(product)
    try {
      const response = await fetch(BASE_URL + "/happyart/api/v1/products/2", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(product),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }
  
      const data = await response.json();
      setNewSelectedProduct(data);
    } catch (error) {
      console.error("Error en updateProduct:", error);
    }
  };
  

  // Agrega un nuevo producto
  const addProduct = async () => {
    try {
      const response = await fetch("API_URL/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ /* datos del nuevo producto */ }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el producto");
      }

      const data = await response.json();
      console.log("Producto agregado:", data);
    } catch (error) {
      console.error("Error en addProduct:", error);
    }
  };

  // Agrega una nueva temática
  const addTheme = async (newTheme: NewTheme) => {
    try {
      const response = await fetch(BASE_URL + "/happyart/api/v1/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTheme),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la temática");
      }

      const data = await response.json();
      console.log("Temática agregada:", data);
    } catch (error) {
      console.error("Error en addTheme:", error);
    }
  };

  // Agrega una nueva categoría
  const addCategory = async () => {
    try {
      const response = await fetch(BASE_URL + "/happyart/api/v1/products/2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ /* datos de la nueva categoría */ }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la categoría");
      }

      const data = await response.json();
      console.log("Categoría agregada:", data);
    } catch (error) {
      console.error("Error en addCategory:", error);
    }
  };

  return (
    <MaintainerContext.Provider
      value={{
        newSelectedProduct,
        updateProduct,
        addProduct,
        addTheme,
        addCategory,
      }}
    >
      {children}
    </MaintainerContext.Provider>
  );
};
