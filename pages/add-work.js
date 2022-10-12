import { Container } from "@chakra-ui/react";
import AddWork from "../components/AddWork";
import Auth from "../components/Auth";

export default function AddWorkBig() {
    return (
        <Container maxW="7xl">
            <Auth />
            <AddWork />
        </Container>
    );
}

