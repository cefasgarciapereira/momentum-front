import { Fragment } from 'react';
import { useSession } from 'contexts/session';

import { Page } from 'components';
import UserCard from './UserCard';
import PasswordCard from './PasswordCard';
import CustomerCard from './CustomerCard';
import ActionsCard from './ActionsCard';

function Profile() {
    const { user } = useSession();

    return (
        <Page title="Perfil">
            <UserCard />
            <PasswordCard />
            {
                user.subscription_id &&
                <Fragment>
                    <CustomerCard />
                    <ActionsCard />
                </Fragment>
            }
        </Page>
    )
}

export default Profile
