import { PropsWithChildren } from "react";
import Head from "next/head"
import { Navbar, SideMenu } from "@/components/ui";
import { Box } from "@mui/material";

interface Props extends PropsWithChildren {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout = ({ children, title, pageDescription, imageFullUrl }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                {imageFullUrl && (
                    <meta name='og:image' content={imageFullUrl} />
                )}

            </Head>
            <nav>
                <Navbar />
            </nav>
            <SideMenu />
            <Box 
            component={'main'}
                sx={{
                    margin: "80px auto",
                    maxWidth: "1440px",
                    padding: { xs: "0px 1%", md: "0px 30px" }
                }}
            >
                {children}
            </Box>
            <footer>

            </footer>
        </>
    )
}