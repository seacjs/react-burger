import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type TProtectedRoute = {
    condition: boolean;
    redirectTo: string; 
    element: JSX.Element;
}

const ProtectedRoute: FC<TProtectedRoute> = ({condition, redirectTo, element}) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!condition) { 
            navigate(redirectTo, {state: {from: location}});
       }
    }, [condition, redirectTo])


    return (
        <>
            {element}
        </>
    )
 }
 
 export default ProtectedRoute;