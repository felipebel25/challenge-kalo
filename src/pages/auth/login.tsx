import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from 'next'
import { useRouter } from "next/router";
import NextLink from "next/link"
import { useForm } from "react-hook-form";
import { getProviders, getSession, signIn } from "next-auth/react";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material"

import { isEmail } from "utils";

import { AuthLayout } from "@/components/layouts"
import { ErrorOutline } from "@mui/icons-material";
import { logEvent } from "utils/gaUtils";
import { AuthContext } from "context";
type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {

    const router = useRouter()
    // const { loginUser } = useContext(AuthContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [isError, setIsError] = useState(false);

    // * si algun dia queremos usar provedores como logeo con google o github apple etc
    // const [providers, setProviders] = useState<any>({});

    // useEffect(() => {
    //     setIsError(router.query.error ? true : false)
    //     getProviders()
    //         .then(providers => {
    //             setProviders(providers);
    //         })
    // }, [])


    const destinationToGoRegister = `?p=${router.query.p?.toString()}` || '?p=/'
    const onLogin = async ({ email, password }: FormData) => {
        setIsError(false);

        logEvent('login', `login`)
        const result = await signIn('credentials', { email: email, password: password })

    }

    return (
        <AuthLayout title={"Ingresar"} >
            <form onSubmit={handleSubmit(onLogin)}>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h1" component='h1'>Iniciar Sesion</Typography>
                            {isError &&
                                <Chip
                                    label='No reconocemos ese usuario / password'
                                    color="error"
                                    icon={<ErrorOutline />}
                                    className="fadeIn"
                                />
                            }
                        </Grid>
                        <Grid item xs={12} mt={4} mb={4}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="email"
                                label='Correo'
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: isEmail
                                })}
                                //para volver booleano un objeto
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid
                            mb={4}
                            item
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                type='password'
                                label='Contrasena'
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid
                            mb={4}
                            item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className="circular-btn"
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                            <NextLink href={`/auth/register`} >
                                No tienes Cuenta?
                            </NextLink>
                        </Grid>

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req })

    const { p = '/' } = query

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: {}
    }
}


export default LoginPage