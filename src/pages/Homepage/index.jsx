import React, {useEffect, useState } from 'react'
import { Image, Grid, GridItem, Container, useDisclosure, Button } from '@chakra-ui/react'
import SideBar from './SideBar'


const Homepage = () => {
  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [category, setCategory] = useState()
  const [limit, setLimit] = useState(10)
  
  const fetchImages = async () => await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=1&category_ids=1`,
).then(res => res.json().then(res => setData([...data,...res])))



const categorySelect = async () => await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=1&category_ids=${category}`).then(res => res.json()).then(res=> 
setData([...res]))

const handleMore = () => {
  const newImages = limit + 10
 setLimit(newImages)
}

  const handleClick = (category) => {
   
    setCategory(category?.id)
    onClose()
    }


   useEffect(() => {
    fetchImages()
  }, [limit])

  useEffect(() => {
    categorySelect()
   
  }, [category, limit])



 console.log(data)


  return (
 
    <Container maxW="7xl" mt="10">
      <SideBar 
      handleClick={handleClick} 
      isOpen={isOpen} 
      onOpen={onOpen} 
      onClose={onClose}
      category={category}
      setCategory={setCategory}
     />
      <Grid templateColumns={{sm:'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
     {data?.map((item) => (
      <GridItem  key={item.id} m="2">
        <Image  w="full" height="200px" src ={item.url}/>
       </GridItem>
    ))}
    </Grid>
    <Button  variant='solid' m="2" colorScheme='teal' onClick={handleMore} >Load More</Button>
    </Container>
   
  )
}

export default Homepage