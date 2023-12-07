"use client";

import React, {useEffect} from "react";
import useAuth from "@/hooks/useAuth";
import {Box, Button, Center, Heading, Input, Select, Stack, Text, Textarea, useToast} from "@chakra-ui/react";
import {doc, getDoc, collection, onSnapshot, query, where, updateDoc} from "firebase/firestore";
import {auth, db} from "@/lib/firebase";
import { ArrowBackIcon } from '@chakra-ui/icons';
import Link from "next/link";


const Page = ({params}) => {
    const {isLoggedIn, user, uid} = useAuth();

    const [name, setName] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [relationship, setRelationship] = React.useState("");
    const [namePH, setNamePH] = React.useState("");
    const [numberPH, setNumberPH] = React.useState("");
    const [emailPH, setEmailPH] = React.useState("");
    const [relationshipPH, setRelationshipPH] = React.useState("");
    const toast = useToast();

    console.log(uid);
    console.log(params.id);



    let itemData;

    useEffect( () => {

        const callFunc = async () => {
            if (user) {
                const docRef = doc(db, user.uid, params.id);
                let docSnap;

                docSnap = await getDoc(docRef);
                if (docSnap.exists()) itemData = {
                    id: docSnap.id,
                    ...docSnap.data()
                };

                setNamePH(itemData.name);
                setNumberPH(itemData.number);
                setEmailPH(itemData.email);
                setRelationshipPH(itemData.relationship);

            }
        };

        callFunc();

    });




    const updateContact = async () => {
        const docRef = await doc(db, user.uid, params.id);

        updateDoc(
            docRef,
            {
                name: name,
                number: number,
                email: email,
                relationship: relationship
            }
        ).then(
            docRef => {
                toast({title: "Contact updated successfully", status: "success"});
            }
        ).catch(
            error => {
                setStatusMsg("Error!");
            }
        );

    }


    return (

        <div>
            <Center>
                <Heading margin={"25"} >Update Contact</Heading>
            </Center>
            <Box w={[300,400,500]} margin={"0 auto"} display="block" mt={5}>
                <Stack direction="column">

                    <Input
                        placeholder={namePH}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        placeholder={numberPH}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />

                    <Input
                        placeholder={emailPH}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder={relationshipPH}
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                    />

                    <Button
                        onClick={() => updateContact()}
                        disabled={name.length < 1 }
                        variantcolor="teal"
                        variant="solid"
                    >
                        Update
                    </Button>
                </Stack>
            </Box>
            <Center>
                <Link href={"/"}>
                    <ArrowBackIcon margin={"20"} w={12} h={12}/>
                </Link>
            </Center>

        </div>

    );

};

export default Page;


