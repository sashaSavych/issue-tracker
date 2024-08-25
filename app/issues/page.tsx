import React from 'react';
import {Button} from '@radix-ui/themes';
import Link from "next/link";

const IssuesPage = () => {
    return <Button><Link href="/issues/new">Create new issue</Link></Button>;
};

export default IssuesPage;