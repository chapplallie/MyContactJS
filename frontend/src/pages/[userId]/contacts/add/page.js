import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { createContact } from "../../../../actions/contacts";

function AddContactPage() {
    const navigate = useNavigate();
    const { userId } = useParams();

    // Check for authentication when component mounts
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        
        if (!token || !storedUserId) {
            console.log('No token or userId found, redirecting to auth');
            navigate('/auth');
            return;
        }

        if (userId !== storedUserId) {
            console.log('URL userId does not match stored userId');
            navigate(`/${storedUserId}/contacts`);
            return;
        }
    }, [userId, navigate]);

    return (
        <section>
            <div>
                <h1>Ajouter un contact pour l'utilisateur {userId}</h1>
            </div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const formData = new FormData(e.currentTarget);
                        const firstname = formData.get("firstname");
                        const lastname = formData.get("lastname");
                        const phone = formData.get("phone");

                        if (!userId) {
                            throw new Error('User ID is required');
                        }

                        await createContact(
                            firstname,
                            lastname,
                            phone
                        );

                        navigate(`/${userId}/contacts`);
                    } catch (error) {
                        console.error('Error adding contact:', error);
                        alert(error instanceof Error ? error.message : 'Failed to add contact');
                    }
                }}
            >
                <div>
                    <label>
                        Prénom :
                        <input type="text" name="firstname" required />
                    </label>
                </div>
                <div>
                    <label>
                        Nom :
                        <input type="text" name="lastname" required />
                    </label>
                </div>
                <div>
                    <label>
                        Téléphone:
                        <input type="text" name="phone" required />
                    </label>
                </div>
                <button type="submit">Ajouter le contact</button>
            </form>
        </section>
    );
}

export default AddContactPage;