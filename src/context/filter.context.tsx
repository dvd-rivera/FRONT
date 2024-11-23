import React, { createContext, useContext, useState } from "react";

// Define el tipo de los datos del contexto (puedes ajustarlo según tu caso)
interface FilterContextType {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

// Crea el contexto
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Hook para usar el contexto
export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext debe usarse dentro de un FilterProvider");
  }
  return context;
};

// Provider para el contexto
export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
