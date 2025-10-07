import Form from '../components/form';
import { createUser } from '../actions/users';

function Signup() {
    return (
        <div>
            <Form onSubmit={createUser} />
        </div>
    );
}

export default Signup;