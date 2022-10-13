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
import { addWork } from "../api/work";

const AddWork = () => {
    const [mytitle, setTitle] = React.useState("");
    const [mydescription, setDescription] = React.useState("");
    const [myestimatedtime, SetEstimatedtime] = React.useState("");
    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    const handleworkCreate = async () => {
    if (!isLoggedIn) {
        toast({
        title: "You must be logged in to create a work",
        status: "error",
        duration: 9000,
        isClosable: true,
        });
    return;
    }

    const work = {
    mytitle,
    mydescription,
    myestimatedtime,
    userId: user.uid,
    };

    await addWork(work);

    setTitle("");
    setDescription("");
    SetEstimatedtime("");
    toast({ title: "work created successfully", status: "success" });
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
        onClick={() => handleworkCreate()}
        colorScheme="teal"
        variant="solid" >

        Add
        </Button>
    </Stack>
    </Box>
    );
};
export default AddWork;
