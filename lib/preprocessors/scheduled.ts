import { due } from '../due.ts';

export const scheduled = ({ date }: { date: string }) => {
    if (!due(date)) return false;
};
