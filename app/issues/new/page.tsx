'use client';

import {Button, Callout, TextField} from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const { control, register, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();
    const [error, setError] = useState<string>();

    return (
        <div className="max-w-xl">
            <form
                className='max-w-xl space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        console.log(data);
                        setError('');
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        console.log(error);
                        setError(error.message)
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')} />
                </TextField.Root>
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <Button>Submit New Issue</Button>
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