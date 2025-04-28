export default interface User {
    id: number;
    name: string;
    email: string;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: number;
    updatedAt: number;
}