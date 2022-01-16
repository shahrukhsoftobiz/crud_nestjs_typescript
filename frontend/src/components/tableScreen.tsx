import React, {useEffect} from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getUserAsync, RemoveUserAsync} from '../features/user/userSlice';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button
  } from '@chakra-ui/react'

const TableScreen = () => {

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  const removeClick = (id: any) => {
    dispatch(RemoveUserAsync(id))
  }


  useEffect(() => { dispatch(getUserAsync()) },[])
  
    return (
        <Table size='sm' variant='striped' colorScheme='teal'>
  <TableCaption>user table</TableCaption>
  <Thead>
    <Tr>
      <Th>Full Name</Th>
      <Th isNumeric>Age</Th>
      <Th >Position</Th>
      <Th >Gender</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td></Td>
      <Td isNumeric></Td>
      <Td></Td>
      <Td></Td>
    </Tr>
            
  </Tbody>

  <Tbody>
      {userState.user && userState.user.map((user, index) => {
        return (
          <Tr bg="teal" key={Math.random()}>
            <Td>{user.name}</Td>
            <Td>{user.age}</Td>
            <Td>{user.position}</Td>
            <Td>{user.gender}</Td>
            <Td p="0">
            <Button colorScheme='green'>update</Button>
            <Button colorScheme='red' onClick={()=> removeClick(user.id)}>remove</Button>
            </Td>
          </Tr>
        )
      })}
    </Tbody>
</Table>
        
    );
};

export default TableScreen