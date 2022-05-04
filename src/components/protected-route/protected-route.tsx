import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProtectedRoute(props: any) {
    const {condition, redirectTo, element} = props;
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