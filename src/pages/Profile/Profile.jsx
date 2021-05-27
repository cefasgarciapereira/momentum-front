import { Page } from 'components';
import UserCard from './UserCard';
import PasswordCard from './PasswordCard';

function Profile() {
    return (
        <Page title="Perfil">
            <UserCard />
            <PasswordCard/>
        </Page>
    )
}

export default Profile
