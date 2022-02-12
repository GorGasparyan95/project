import React, {useEffect, useState} from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,

} from '@chakra-ui/react'


function SideBar({handleClick, isOpen, onOpen, onClose }) {
 
  const [categories, setCategories] = useState()
  
  const btnRef = React.useRef()
  const images = async () => await fetch("https://api.thecatapi.com/v1/categories").then(res => res.json()).then(data => setCategories(data))

  useEffect(() => {
    images()
  }, [])



  return (
    <>
      <Button ref={btnRef} colorScheme='teal' m="2" onClick={onOpen}>
        Open to Choose 
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Choose Categories</DrawerHeader>

          <DrawerBody>
           {categories?.map((category) => 
           <Box key={category.id} m="2" letterSpacing="5px">
             <Button onClick={() => handleClick( category)}>{category.name.toUpperCase()}</Button></Box>)
           }
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3}  onClick={onClose}>
              Cancel
            </Button>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideBar