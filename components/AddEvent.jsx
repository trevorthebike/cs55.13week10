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
import { addevent } from "../api/event";

const Addevent = () => {
    const [mytitle, setTitle] = React.useState("");
    const [mydescription, setDescription] = React.useState("");
    const [myestimatedtime, SetEstimatedtime] = React.useState("");
    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    const handleeventCreate = async () => {
    if (!isLoggedIn) {
        toast({
        title: "You must be logged in to create a event",
        status: "error",
        duration: 9000,
        isClosable: true,
        });
    return;
    }

    const event = {
    mytitle,
    mydescription,
    myestimatedtime,
    userId: user.uid,
    };

    await addevent(event);

    setTitle("");
    setDescription("");
    SetEstimatedtime("");
    toast({ title: "event created successfully", status: "success" });
    };

    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
        <Stack direction="column">

        <Input
        placeholder="Title"
        value={mytitle}
        onChange={(e) => setTitle(e.target.value)} />

        <Textarea
        placeholder="Description"
        value={mydescription}
        onChange={(e) => setDescription(e.target.value)}/>

        <Textarea
        placeholder="Estimated Time to Complete"
        value={myestimatedtime}
        onChange={(e) => SetEstimatedtime(e.target.value)}/>
        
        <Button
        onClick={() => handleeventCreate()}
        colorScheme="teal"
        variant="solid" >

        Add
        </Button>
    </Stack>
    </Box>
    );
};
export default Addevent;
