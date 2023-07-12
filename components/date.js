import {parseISO, format} from 'date-fns';

export default function Date({dateString}) {
    if (!dateString) {
        console.warn('dateString is not defined or null');
        return null; 
    }

    const date = parseISO(dateString);

    if (isNaN(date)) {
        console.warn(`dateString "${dateString}" is not a valid date.`);
        return null;
    }

    return (
        <time dateTime={dateString}>
            {format(date, 'LLLL d, yyyy')}
        </time>
    );
}

