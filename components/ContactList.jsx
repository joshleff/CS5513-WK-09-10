import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {collection, deleteDoc, doc, onSnapshot, query, where} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import Link from "next/link";
const ContactList = () => {
    const [contacts, setContacts] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
        if (!user) {
            setContacts([]);
            return;
        }
        const q = query(collection(db, user.uid), where("type", "==", "contact"));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setContacts(ar);
        });
    };
    useEffect(() => {
        refreshData();
    }, [user]);
    const deleteContact = async (user, docId) => {

        try {
            const todoRef = doc(db, user, docId);
            await deleteDoc(todoRef);
        } catch (err) {
            console.log(err);
        }
    };
    const handleContactDelete = async (user, id) => {
        if (confirm("Are you sure you wanna delete this contact?")) {
            await deleteContact(user, id);
            toast({ title: "Contact deleted successfully", status: "success" });
        }
    };

    return (

        <Box mt={5}>

                {contacts &&
                    contacts
                        .sort((a, b) => a.name > b.name ? 1 : -1 )
                        .map((contact) => (
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                            margin={"0 auto"}
                            mt={"10"}
                            w={[300,500,600]}
                        >
                            <Heading as="h3" fontSize={"xl"}>
                                {contact.name}{" "}
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleContactDelete(user.uid, contact.id)}
                                >
                                    <FaTrash />
                                </Badge>


                            </Heading>
                            <Text>{contact.number}</Text>
                            <Text>{contact.email}</Text>
                            <Text>{contact.relationship}</Text>

                            <Link key={contact.id} href={`contact/${contact.id}`}
                            >
                                Edit
                            </Link>
                        </Box>
                    ))}

        </Box>

    );
};
export default ContactList;