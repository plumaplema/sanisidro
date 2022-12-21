import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';

export default function Footer() {

  return (
    <Box
      position={'fixed'}
      bottom={0}
      w="100%"
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text fontSize={'xs'}>© 2022 Gilbert Loyogoy. All rights reserved</Text>
      </Container>
    </Box>
  );
}