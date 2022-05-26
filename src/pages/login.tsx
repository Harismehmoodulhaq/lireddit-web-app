import React from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { useMutation } from 'urql';

interface LoginProps {

}

const LOGIN_MUT = `
mutation Login($username: String!, $password: String!) {
    login(login: {username: $username, password: $password}) {
          errors {
          field
          message
        }
          user {
          id
          username
        }
    }
  }
`

const Login: React.FC<LoginProps> = ({ }) => {

    const [ result , login ] = useMutation(LOGIN_MUT)

    return (
        <Wrapper variant='regular'> 
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={async (values) => {
                    const response = await login(values).then((result) => {
                        console.log(result)
                    });
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