import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PropietarioDetail = () => {
    const { query } = useRouter();

    const [id, setId] = useState();

    console.log(id);

    useEffect(() => {
        if (query) {
            setId(query.id);
        }
    }, [query]);

    return (
        <>
            Este es la pagina de propietario detail
        </>
    )
}

export default PropietarioDetail;