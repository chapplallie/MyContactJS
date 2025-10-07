import { useEffect, useState } from "react";
import TableContact from "../../../components/table-contact";
import { useNavigate, useParams } from "react-router-dom";
import { getContactsByUserId } from "../../../actions/contacts";

function UserPage({ email }) {
    const { userId } = useParams();
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const storedUserId = localStorage.getItem('userId');
            
            if (!token || !storedUserId) {
                console.log('No token or userId found, redirecting to auth');
                navigate('/auth');
                return;
            }

            if (userId !== storedUserId) {
                console.log('URL userId does not match stored userId');
                navigate(`/${storedUserId}`);
                return;
            }
            
            try {
                if (!userId) {
                    throw new Error('User ID is required');
                }
                const data = await getContactsByUserId(userId);
                setContacts(Array.isArray(data) ? data : []);

            } catch (error) {
                console.error('Error fetching contacts:', error);
                if (error instanceof Error && error.message.includes('401')) {
                    navigate('/auth');
                }
                setContacts([]);
            }
        };
        
        fetchData();
    }, [userId, navigate]);

    return (
        <div>
            <h1>Bienvenue sur la page de {email}</h1>
            <div className="w-full flex justify-between">
                <button onClick={() => window.location.href = `/${userId}/contacts/add`}>
                    Ajouter un contact
                </button>
            </div>
            <div>
                <TableContact dataContact={contacts} userId={userId || ''} />
            </div>
        </div>
    );
}

export default UserPage;