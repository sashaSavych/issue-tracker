import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Button, Card, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import StatusBadge from "@/app/components/StatusBadge";
import ReactMarkdown from "react-markdown";
import {AiFillEdit} from "react-icons/ai";
import Link from "next/link";
import "easymde/dist/easymde.min.css";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/auth/authOptions";

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) {
        notFound();
    }

    return (
        <Grid gap="5" columns={{ initial: "1", md: "2" }}>
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex gap="3" my="2">
                    <StatusBadge status={issue.status}/>
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose' mt="4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            {session && (
                <Box>
                    <Button>
                        <AiFillEdit/>
                        <Link href={`/issues/${issue.id}/edit`}>Edit</Link>
                    </Button>
                </Box>
            )}
        </Grid>
    );
};

export default IssueDetailsPage;