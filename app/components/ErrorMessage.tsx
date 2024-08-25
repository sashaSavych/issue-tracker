import React, {PropsWithChildren} from 'react';
import {Text} from "@radix-ui/themes";

const ErrorMessage = ({children}: PropsWithChildren) => {
    return children
        ? <Text color="red" as="p">{children}</Text>
        : null;
};

export default ErrorMessage;