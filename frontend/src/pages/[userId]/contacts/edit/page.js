import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patchContact, getContactByContactId } from "../../../../actions/contacts";

function EditContactPage() {
    const navigate = useNavigate();
    const { userId, contactId } = useParams();
    const [contact, setContact] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                if (!contactId) {
                    throw new Error('Contact ID is required');
                }
                const data = await getContactByContactId(contactId);
                setContact({
                    _id: data._id,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    phone: data.phone
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur lors du chargement du contact');
            }
        };

        if (contactId) {
            fetchContact();
        }
    }, [userId, contactId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (!contactId) {
                throw new Error('Contact ID is required');
            }

            const formData = new FormData(e.currentTarget);
            const updatedContact = {
                firstname: formData.get("firstname"),
                lastname: formData.get("lastname"),
                phone: formData.get("phone")
            };

            if (!updatedContact.firstname || !updatedContact.lastname || !updatedContact.phone) {
                throw new Error('All fields are required');
            }

            const result = await patchContact(contactId, updatedContact);
            if (!result) {
                throw new Error('Failed to update contact');
            }

            navigate(`/${userId}/contacts`);
        } catch (err) {
            console.error('Error updating contact:', err);
            setError(err instanceof Error ? err.message : 'Failed to update contact');
        }
    };

    if (!contact) return <div>Chargement du contact...</div>;

    return (
        <section className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Modifier le contact</h1>

            {/* ✅ Affichage du message d’erreur */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Prénom:
                        <input
                            type="text"
                            name="firstname"
                            defaultValue={contact.firstname}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nom:
                        <input
                            type="text"
                            name="lastname"
                            defaultValue={contact.lastname}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Téléphone:
                        <input
                            type="tel"
                            name="phone"
                            defaultValue={contact.phone}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </label>
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Enregistrer
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/${userId}/contacts`)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </section>
    );
}

export default EditContactPage;
