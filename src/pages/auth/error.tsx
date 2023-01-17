import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Player } from '@lottiefiles/react-lottie-player';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router'

export default function Error() {
    const router = useRouter()
    const { error } = router.query
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            void router.push("/");
        }
    }, [status]);

    return (
        <Box textAlign="center" py={10} px={6}>
            <Box display="inline-block">
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bg={'red.500'}
                    rounded={'100px'}
                    w={'150px'}
                    h={'150px'}
                    textAlign="center">
                    <Player src='https://assets4.lottiefiles.com/datafiles/hYQRPx1PLaUw8znMhjLq2LdMbklnAwVSqzrkB4wG/bag_error.json'
                        className="player"
                        loop
                        autoplay />
                </Flex>
            </Box>
            {
                (error == 'AccessDenied') ?
                    (<>
                        <Heading as="h2" size="xl" mt={6} mb={2}>
                            Access Denied
                        </Heading>
                        <Text color={'black'}>
                            Contact Mr. G Loyogoy and ask him to verify your account.
                        </Text>
                    </>) :

                    (<>
                        <Heading as="h2" size="xl" mt={6} mb={2}>
                            Unknown Error
                        </Heading>
                        <Text color={'black'}>
                            Report to Mr. Gilbert Loyogoy.
                        </Text>
                    </>)

            }
        </Box>
    );
}