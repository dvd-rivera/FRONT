import React, { useEffect } from "react";
import { createContext, useState } from "react";

interface Context {
  products: Product;
}

// interface creada solo de ejemplo para que no de error el provider
interface Product {
  name: string;
}

export const pageContext = createContext<Context | undefined>(undefined);

const PageContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // acá van los useState junto con las funciones que modifican cada uno de sus valores

  // use state de ejemplo para que no de error el provider luego cambiar
  const [products, setProducts] = useState<Product>({ name: "" });
  setProducts({ name: "hola" });

  return (
    <pageContext.Provider value={{ products }}>{children}</pageContext.Provider>
  );
};

export default PageContextProvider;
