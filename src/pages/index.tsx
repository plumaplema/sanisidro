import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Button,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import Hero from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { ADDSTUDENT } from '../lib/Interfaces'
import { signIn, useSession } from "next-auth/react"
import Footer from '../components/Footer'
import { useEffect } from 'react'
import TableStudent from '../components/TableStudents'

var CryptoJS = require("crypto-js");

const Index = () => {

  const { data, status } = useSession()

  console.log(status, data)

  const addstud = () => {
    const data: ADDSTUDENT = { id: 1293, level: 9, section: 'Hugo', student_name: 'SAMPLE STUDENT' }
    var ciphertext: string = CryptoJS.AES.encrypt(JSON.stringify(data), "loyogoy").toString()
    const params = { hash: ciphertext }
    fetch('http://localhost:3000/api/addstudent', { method: 'POST', body: JSON.stringify(params) }).then(res => console.log(res.json()))
  }

  return (
    <Container>
      <Hero />
    </Container >
  )

}
export default Index
