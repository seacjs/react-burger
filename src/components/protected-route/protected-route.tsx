import { useNavigate } from 'react-router-dom';

function ProtectedRoute(props: any) {
    const {condition, redirectTo, element} = props;
    const navigate = useNavigate();

    if (!condition) { 
         navigate(redirectTo);
         return (
             <></>
         );
    }

    return (
        <>
            {element}
        </>
    )
 }
 
 export default ProtectedRoute;