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
    const [mystatus, setStatus] = React.useState("pending");
    //const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    const handleTodoCreate = async () => {
    if (!isLoggedIn) {
        toast({
        title: "You must be logged in to create a todo",
        status: "error",
        duration: 9000,
        isClosable: true,
        });
    return;
    }

    const todo = {
    mytitle,
    mydescription,
    mystatus,
    userId: user.uid,
    };

    await addWork(todo);

    setTitle("");
    setDescription("");
    toast({ title: "Todo created successfully", status: "success" });
    };

    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
        <Stack direction="column">

        <Input
        placeholder="Title"
        value={mytitle}
        onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
        placeholder="Description"
        value={mydescription}
        onChange={(e) => setDescription(e.target.value)}
        />
        
        <Button
        onClick={() => handleTodoCreate()}
        //disabled={mytitle.length < 1 || mydescription.length < 1 || isLoading}
        colorScheme="teal"
        variant="solid"
        >
        Add
        </Button>
    </Stack>
    </Box>
    );
};
export default AddWork;
