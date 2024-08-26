interface PurchaseOrder {
    orderTotal: number;
    approvals: Array<{
        userName: string;
        approvalAmount: number;
        isApproved: boolean;
    }>;
}
