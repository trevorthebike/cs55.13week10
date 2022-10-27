import React from "react";
import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";

const FooterNew = () => {
    return (
        <Box px={40} h={20} display = "flex" alignItems="center" justifyContent="space-between" fontsize = "xl" background = "lightgreen" >
            <Box background = "blue.500">
                <Link href="/add-todo">Add To Do</Link>
            </Box>
            <Box background = "gray.500">
                <Link href="/add-event">Add Event</Link>
            </Box>
            <Box background = "yellow.500">
                <Link href="/add-contact">Add Contact</Link>
            </Box>
        </Box>
    );
};
export default FooterNew;
