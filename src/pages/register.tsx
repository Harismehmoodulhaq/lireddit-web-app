import React from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = ({ }) => {
    const router = useRouter();
    const [, register] = useRegisterMutation()

    return (
        <Wrapper variant='regular'>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    gender: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register({ register: values })
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        router.push("/login");
                    }
                }}
            >

                {({ isSubmitting }) => {
                    return (
                        <Form>
                            <InputField
                                name="username"
                                label='Username*'
                                placeholder='useranme'
                            />

                            <Box mt={4}>
                                <InputField
                                    name='email'
                                    label='Email*'
                                    placeholder='email'
                                />
                            </Box>

                            <Box mt={4}>
                                <InputField
                                    name='password'
                                    label='Password*'
                                    placeholder='password'
                                    type='password'
                                />
                            </Box>
                            <Box mt={4}>
                                <InputField
                                    name='gender'
                                    label='Gender*'
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
export default withUrqlClient(createUrqlClient)(Register)