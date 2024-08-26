import React from 'react';
import {Button} from "@radix-ui/themes";
import Link from "next/link";

const IssueActions = () => {
    return (
        <div className='mb-5'>
            <Button><Link href="/issues/new">Create new issue</Link></Button>
        </div>
    );
};

export default IssueActions;