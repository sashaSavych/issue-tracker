'use client';

import {Button, Callout, TextField} from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from "zod";
import {createIssueSchema} from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

const NewIssuePage = () => {
    const { control, register, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsLoading(true);
            setError('');
            await axios.post('/api/issues', data);
            router.push('/issues');
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
                    Submit New Issue
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

export default NewIssuePage;