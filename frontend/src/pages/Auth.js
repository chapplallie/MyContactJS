import Form from '../components/form';
import { authentUser } from '../actions/users';

function Auth() {
    return (
        <div>
            <Form onSubmit={authentUser} />
        </div>
    );
}

export default Auth;