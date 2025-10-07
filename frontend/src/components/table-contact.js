import { useEffect, useState } from "react";
import { deleteContact, getContactsByUserId } from "../actions/contacts";
import { useNavigate } from "react-router-dom";

function TableContact({ userId, dataContact = [] }) {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            setError(null);
            setLoading(true);
            try {
                if (dataContact && dataContact.length > 0) {
                    setContacts(dataContact);
                } else {
                    const data = await getContactsByUserId(userId);
                    setContacts(data || []);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch contacts');
                if (error instanceof Error && error.message === 'Authentication required') {
                    navigate('/auth');
                }
                setContacts([]);
            } finally {
                setLoading(false);
            }
        };
        
        if (userId) {
            fetchContacts();
        }
    }, [userId, navigate, dataContact]);

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Contacts</h2>
            {loading ? (
                <p>Chargement des contacts...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : contacts.length === 0 ? (
                <p>Aucun contact trouvé</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 p-2">Prénom</th>
                            <th className="border border-gray-300 p-2">Nom</th>
                            <th className="border border-gray-300 p-2">Téléphone</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="">
                                <td className="border border-gray-300 p-2">{contact.firstname}</td>
                                <td className="border border-gray-300 p-2">{contact.lastname}</td>
                                <td className="border border-gray-300 p-2">{contact.phone}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => navigate(`/${userId}/contacts/edit/${contact._id}`)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await deleteContact(contact._id);
                                                setContacts(contacts.filter(c => c._id !== contact._id));
                                            } catch (error) {
                                                setError(error instanceof Error ? error.message : 'Failed to delete contact');
                                            }
                                        }}
                                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TableContact;