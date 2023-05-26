import { GetStaticProps, GetStaticPropsContext } from "next"

import { ShopLayout } from "@/components/layouts"
import { ProductSlideShow } from "@/components/products"
import { IProduct } from "@/interfaces"
import { Box, Grid, Rating, Typography } from "@mui/material"
import { getAllProductSlugs, getProductBySlug } from "database/dbProducts"


interface Props {
  product: IProduct;
}


const ProductPage = ({ product }: Props) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow
            images={product.images}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* -----------------Titulos----------------------*/}
            <Typography variant="h1" component='h1'>{product.title}</Typography>
            <Typography variant="subtitle1" component='h2'>{`$${product.price}`}</Typography>
            {/* -------Descripcion----------- */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
            <Typography sx={{ mt: 3 }} variant="subtitle2">Reseñas:</Typography>
            {product.reviews.map((review) => (
              <Box key={review.description} sx={{ border: "1px solid gray", borderRadius: "1rem", padding: "2%", m: '2% 0' }}>
                <Rating value={review.stars} />
                <Typography variant="subtitle2">{review.user}:</Typography>
                <Typography  variant="body2">{review.description}</Typography>
              </Box>
            ))}

          </Box>
        </Grid>
      </Grid>
    </ShopLayout >
  )
}
export const getStaticPaths: any = async (ctx: any) => {
  const slugs = await getAllProductSlugs()

  return {
    paths: slugs.map(({ slug }) => ({
      params: { slug }
    })),
    fallback: 'blocking'
  }
}
export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {

  const { slug } = ctx.params as { slug: string };
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      product
    },
    // per 24 hours
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage