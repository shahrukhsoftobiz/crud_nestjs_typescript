import React, { useState, useEffect } from "react";
import { useAppDispatch } from '../app/hooks';
import { getUserAsync, AddUserAsync } from '../features/user/userSlice';
import { Button, ButtonGroup, FormControl, FormLabel, Input, Wrap} from '@chakra-ui/react'

  interface IUser {
    name?: string;
    age?: number;
    position?: string;
    gender?: string;
  }

  export function FormScreen() {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<IUser>({});
  
    const handleInput = (e: React.SyntheticEvent) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        id: string,
        value: string,
      };
      setUser({ ...user, [target.id]: target.value })
    }
  
    const handleClick = (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(AddUserAsync(user))
    }
  
    useEffect(() => { dispatch(getUserAsync()) }, [])
    return (
          <Wrap justify='center'>

            <ButtonGroup size='sm' >
            <FormControl isRequired>
            <Input id='name' value={user.name || ''} placeholder='Full Name' onInput={handleInput} />
            <Input type="number" value={user.age || ''} id='age' placeholder='Age' onInput={handleInput} />
            <Input id='position' value={user.position || ''} placeholder='Position' onInput={handleInput} />
            <Input mb="3" id='gender' value={user.gender || ''} placeholder='Gender' onInput={handleInput} />
            <Button type="submit" mb="10" colorScheme='blue' cursor="pointer" onClick={handleClick}>Submit</Button>
            </FormControl>
            </ButtonGroup>

          </Wrap>
          
         
    );
  };

  export default FormScreen