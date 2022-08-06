import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({ }) => {
    const  [, forgotPassword] = useForgotPasswordMutation();
    const [complete, setComplete] = useState(false);
    return (
        <>
            <Wrapper variant='regular'>
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    onSubmit={async (values) => {
                       await forgotPassword(values)
                       setComplete(true)
                    }}
                >

                    {({ isSubmitting }) => 
                    complete ? (
                        <Box>
                            If an account with that email exists, We sent you password reset email!
                        </Box>
                    ) : (
                            <Form>
                                <Box mt={4}>
                                    <InputField
                                        name='email'
                                        label='Email'
                                        placeholder='email'
                                        type='email'
                                    />
                                </Box>
                                
                                <Box mt={4}>
                                    <Button isLoading={isSubmitting} type='submit' colorScheme="blackAlpha">
                                        Reset Password
                                    </Button>
                                </Box>
                            </Form>
                        
    )}
                </Formik>
            </Wrapper>
        </>
    )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);