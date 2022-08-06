import React from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';

interface LoginProps {

}

const Login: React.FC<LoginProps> = ({ }) => {

    const router = useRouter()
    const [ , login ] = useLoginMutation()

    return (
        <Wrapper variant='regular'> 
            <Formik
                initialValues={{
                    usernameOrEmail: "",
                    password: "",
                }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login(values)
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
                                name="usernameOrEmail"
                                label='Username or Email'
                                placeholder='username or email'
                            />
                            <Box mt={4}>
                                <InputField
                                    name='password'
                                    label='Password'
                                    placeholder='password'
                                    type='password'
                                />
                            </Box>
                            <Flex>
                            <NextLink href='/forgot-password'>
                                <Link ml="auto" color="GrayText">Forgot your password ?</Link>
                            </NextLink>
                            </Flex>
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
export default withUrqlClient(createUrqlClient)( Login )