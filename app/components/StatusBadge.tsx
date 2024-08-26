import React from 'react';
import Status from "@prisma/client";
import {Badge} from "@radix-ui/themes";

const statusMap: Record<Status, { label: string, color: "red" | "violet" | "green" }> = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" }
}

const StatusBadge = ({status}: { status: Status }) => {
    const statusRecord = statusMap[status];

    return <Badge color={statusRecord.color}>{statusRecord.label}</Badge>;
};

export default StatusBadge;