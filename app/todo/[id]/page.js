

"use client";

import React, {useEffect} from "react";
import useAuth from "@/hooks/useAuth";
import {Box, Button, Center, Heading, Input, Select, Stack, Textarea, useToast} from "@chakra-ui/react";
import {doc, getDoc, collection, onSnapshot, query, where, updateDoc} from "firebase/firestore";
import {auth, db} from "@/lib/firebase";
import { ArrowBackIcon } from '@chakra-ui/icons';
import Link from "next/link";


const Page = ({params}) => {
    const {isLoggedIn, user, uid} = useAuth();

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [titlePH, setTitlePH] = React.useState("");
    const [descriptionPH, setDescriptionPH] = React.useState("");
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
                setTitlePH(itemData.title);
                setDescriptionPH(itemData.description);
                }
        };

        callFunc();

    });




    const updateTodo = async () => {
        const docRef = await doc(db, user.uid, params.id);

        updateDoc(
            docRef,
            {
                title: title,
                description: description,
            }
        ).then(
            docRef => {
                toast({title: "Todo updated successfully", status: "success"});
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
            <Heading margin={"25"} >Update Todo</Heading>
            </Center>
            <Box w={[300,400,500]} margin={"0 auto"} display="block" mt={5}>
                <Stack direction="column">
                    <Input
                        placeholder={titlePH}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder={descriptionPH}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        onClick={() => updateTodo()}
                        disabled={title.length < 1 || description.length < 1 }
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


