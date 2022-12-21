import { Flex, FlexProps } from '@chakra-ui/react'
import Footer from './Footer'

export const Main = (props: FlexProps) => {
  return (
    <>
      <Flex
        direction="column"
        alignItems="stretch"
        justifyContent="flex-start"
        width={"100%"}
        {...props}
      />
      <Footer />
    </>

  )
}
