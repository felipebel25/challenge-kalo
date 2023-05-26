import { useEffect, useState } from "react";
import { Box,  Grid,  Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products/ProductList";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks/useProducts";
import { SelectFilter } from "@/components/SelectFilter/SelectFilter";
import { IProduct } from "@/interfaces";

export default function Home() {

  const { products, isError, isLoading = true, } = useProducts('/products')

  const [filters, setFilters] = useState(0)
  const [productsToShow, setProductsToShow] = useState<IProduct[]>(products)

  const lowCostProducts = () => products.slice().sort(((a, b) => a.price - b.price)) 
  const majorCostProducts = () => products.slice().sort(((a, b) => b.price - a.price)) 

  const lowDisponibilityProducts = () => products.slice().sort(((a, b) => a.inStock - b.inStock)) 
  const majorDisponibilityProducts = () => products.slice().sort(((a, b) => b.inStock - a.inStock)) 
  useEffect(() => {
    if (filters === 0) setProductsToShow(products)
    if (filters === 1) setProductsToShow(lowCostProducts())
    if (filters === 2) setProductsToShow(majorCostProducts())
    if (filters === 3) setProductsToShow(lowDisponibilityProducts())
    if (filters === 4) setProductsToShow(majorDisponibilityProducts())
  }, [filters, products])


  return (
    <>
      <ShopLayout title={"Teslita - Home"} pageDescription={"Encuentra los mejores productos de teslita aqui"} >
        <Box >
          <Box display='flex'>
            <SelectFilter
              value={filters}
              label="Filtrar por costo"
              options={filterCostsOptions}
              setFilter={setFilters}
            />
            <SelectFilter
              value={filters}
              label="Filtrar por disponibilidad"
              options={filterDisponibilidadOptions}
              setFilter={setFilters}
            />
          </Box>
          <Typography variant="h1" component='h1' sx={{ mb: 1 }}>Tienda</Typography>
          <Typography variant="h5" component='h5' sx={{ mb: 7 }}>Todos los productos</Typography>
        </Box>

        <Grid container spacing={4}>
          {isLoading
            ?
            <FullScreenLoading />
            :
            <ProductList
              products={productsToShow}
            />
          }
        </Grid>
      </ShopLayout>
    </>
  )
}

const filterCostsOptions = [
  {
    value: 1,
    name: "Menor Costo"
  },
  {
    value: 2,
    name: "Mayor Costo"
  }
]

const filterDisponibilidadOptions = [
  {
    value: 3,
    name: "Menor Disponibilidad"
  },
  {
    value: 4,
    name: "Mayor Disponibilidad"
  }
]