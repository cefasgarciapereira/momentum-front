import { useSession } from 'contexts/session';

import { Page } from 'components';
import UserCard from './UserCard';
import PasswordCard from './PasswordCard';
import CustomerCard from './CustomerCard';

function Profile() {
    const { user } = useSession();

    return (
        <Page title="Perfil">
            <UserCard />
            <PasswordCard/>
            {
                user.subscription_id &&
                <CustomerCard/>
            }
        </Page>
    )
}

export default Profile
