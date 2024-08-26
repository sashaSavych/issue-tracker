'use client';

import React, {useState} from 'react';
import { Issue } from '@prisma/client';
import {Button, Callout, TextField} from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import {Controller, useForm} from "react-hook-form";
import Spinner from "@/app/components/Spinner";
import {zodResolver} from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/validationSchemas";
import {useRouter} from "next/navigation";
import axios from "axios";
import {z} from "zod";
import dynamic from "next/dynamic";

type IssueForm = z.infer<typeof issueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

interface Props {
    issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
    const { control, register, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(issueSchema),
        defaultValues: {...issue}
    });
    const router = useRouter();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsLoading(true);
            setError('');

            if (issue) {
                await axios.patch('/api/issues/' + issue.id, data)
            } else {
                await axios.post('/api/issues', data);
            }
            router.push('/issues');
            router.refresh();
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div className="max-w-xl">
            <form className='max-w-xl space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isLoading}>
                    {issue ? 'Update issue' : 'Submit issue'}
                    {isLoading && <Spinner/>}
                </Button>
            </form>
            {error && (
                <Callout.Root color="red" className="mt-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
        </div>
    );
};

export default IssueForm;