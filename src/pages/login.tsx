import React from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface LoginProps {

}

const Login: React.FC<LoginProps> = ({ }) => {

    const router = useRouter()
    const [ result , login ] = useLoginMutation()

    return (
        <Wrapper variant='regular'> 
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login({login: values})
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        router.push("/");
                    }
                }}
            >

                {({ isSubmitting }) => {
                    return (
                        <Form>
                            <InputField
                                name="username"
                                label='Username'
                                placeholder='username'
                            />
                            <Box mt={4}>
                                <InputField
                                    name='password'
                                    label='Password'
                                    placeholder='password'
                                    type='password'
                                />
                            </Box>
                            <Box mt={4}>
                                <Button isLoading={isSubmitting} type='submit' colorScheme="green">
                                    Login
                                </Button>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </Wrapper>
    );
}
export default Login