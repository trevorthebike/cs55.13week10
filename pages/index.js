import { Container, Grid, GridItem } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList"
import ContactList from "../components/ContactList"
import FooterNew from "../components/footer";

export default function Home() {
    return (
        <Container maxW="10xl">
            <Auth />
            <Grid templateColumns='repeat(3, 1fr)' gap={10}>
            <GridItem w='100%' h='100%' bg='blue.500' > <TodoList /> </GridItem>
            <GridItem w='100%' h='100%' bg='gray.500' > <EventList /> </GridItem>
            <GridItem w='100%' h='100%' bg='yellow.500' > <ContactList /> </GridItem>
            </Grid>
            <FooterNew/>
        </Container>
    );
}
