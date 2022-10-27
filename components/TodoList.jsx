import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    IconButton,
    } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash, FaPlusSquare } from "react-icons/fa";
import { deleteTodo, updateTodo} from "../api/todo";

const TodoList = () => {
    const [todo, settodo] = React.useState([]);

    const {  user } = useAuth();
    const toast = useToast();
    useEffect(() => {
        if (!user) {
            settodo([]);
        return;
        }
        const q = query(collection(db, "todo"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
        let ar = [];
        querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
        });
        settodo(ar);
        });
    }, [user]);

    const handleTodoDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this todo?")) {
            deleteTodo(id);
            toast({ title: "todo deleted successfully", status: "success" });
        }
    };
    
    const handletodoUpdate = async (id) => {
        updateTodo(id);
        console.log("first")
    };


    return (
        <Box mt={5}>
            <Text fontSize={"xl"}> Todo List </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {todo &&
            todo.map((todo) => (
            <Box
            key={todo.id}
            p={3}
            background = "lightblue"
            boxShadow="2xl"
            transition="0.2s"
            _hover={{ boxShadow: "sm" }}
            >

            <Heading as="h1" fontSize={"xl"}>
            <IconButton
            color="red.500"
            float="right"
            onClick={() => handleTodoDelete(todo.id)}
            icon = {<FaTrash />}
            >
            </IconButton>

            <IconButton
            size = 'lg'
            color="yellow"
            background = "black"
            float="right"
            onClick={() => handletodoUpdate(todo.id)}
            icon={<FaPlusSquare/>}
            >
            </IconButton>

            {todo.title}{" "}
            </Heading>

            <Text>{"Todo Description: "}{todo.description}</Text>
            
            </Box>
            ))}
            </SimpleGrid>
        </Box>
    );
};
export default TodoList;