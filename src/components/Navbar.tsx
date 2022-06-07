import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link"
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = ({ }) => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery();
    let body = null

    if (fetching) {

    } else if (!data?.me) {
        body = (
            <>
                <NextLink href={"/login"}>
                    <Link color="#47E3FF" mr={2}>
                        Login
                    </Link>
                </NextLink>
                <NextLink href={"/register"}>
                    <Link color="#47E3FF" mr={2} >
                        Register
                    </Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box mr={2}>
                    {data.me.username}
                </Box>

                <Button 
                onClick={
                    () => {
                        logout()
                    }
                }
                isLoading={logoutFetching }
                variant={"link"}>
                    Logout
                </Button>

            </Flex>
        )
    }

    return (
        <Flex bg="tan" p={4} ml={'auto'} >
            <Box ml={"auto"} >
                {body}
            </Box>
        </Flex>
    );
}
export default Navbar