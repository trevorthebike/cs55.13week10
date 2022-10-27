import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addcontact } from "../api/contact";

const Addcontact = () => {
    const [myname, setName] = React.useState("");
    const [myphonenumber, setPhoneNumber] = React.useState("");
    const [myaddress, SetAddress] = React.useState("");
    const [myjob, SetJob] = React.useState("");
    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    const handlecontactCreate = async () => {
    if (!isLoggedIn) {
        toast({
        title: "You must be logged in to create a contact",
        status: "error",
        duration: 9000,
        isClosable: true,
        });
    return;
    }

    const contact = {
        myname, 
        myphonenumber, 
        myaddress, 
        myjob,
        userId: user.uid,
    };

    await addcontact(contact);

    setName("");
    setPhoneNumber("");
    SetAddress("");
    SetJob("");
    toast({ title: "contact created successfully", status: "success" });
    };

    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
        <Stack direction="column">

        <Input
        placeholder="Name"
        value={myname}
        onChange={(e) => setName(e.target.value)} />

        <Textarea
        placeholder="Phone Number"
        value={myphonenumber}
        onChange={(e) => setPhoneNumber(e.target.value)}/>

        <Textarea
        placeholder="Address"
        value={myaddress}
        onChange={(e) => SetAddress(e.target.value)}/>


        <Textarea
        placeholder="Job"
        value={myjob}
        onChange={(e) => SetJob(e.target.value)}/>
        
        <Button
        onClick={() => handlecontactCreate()}
        colorScheme="teal"
        variant="solid" >

        Add
        </Button>
    </Stack>
    </Box>
    );
};
export default Addcontact;
