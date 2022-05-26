import React from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { useMutation } from 'urql';

interface RegisterProps {

}

const REGISTER_MUT = `
mutation register($username: String!, $password: String!, $gender: String!) {
    register(register: {username: $username, gender: $gender, password: $password}) {
        errors {
            field
            message
        }
        user {
            id
            username
            gender
        }
        
    }
}
`

const Register: React.FC<RegisterProps> = ({ }) => {

    const [result , register ] = useMutation(REGISTER_MUT)

    return (
        <Wrapper variant='regular'>
            <Formik
                initialValues={{
                    username: "",
                    gender: "",
                    password: "",
                }}
                onSubmit={async (values) => {
                    const response = await register(values).then((result) => {
                        console.log(result)
                    })
                }}
            >

                {({ isSubmitting }) => {
                    return (
                        <Form>
                            <InputField
                                name="username"
                                label='Username'
                                placeholder='useranme'
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
                            <InputField
                                    name='gender'
                                    label='Gender'
                                    placeholder='gender'
                                />
                            </Box>
                            <Box mt={4}>
                                <Button isLoading={isSubmitting} type='submit' colorScheme="teal">
                                    Register
                                </Button>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </Wrapper>
    );
}
export default Register