import Header from "../../../components/componentsNew/Header";

import ConnectedAccounts from "../../../components/componentsNew/settings/ConnectedAccounts";
import DangerZone from "../../../components/componentsNew/settings/DangerZone";
import Notifications from "../../../components/componentsNew/settings/Notifications";
import Profile from "../../../components/componentsNew/settings/Profile";
import Security from "../../../components/componentsNew/settings/Security";

const SettingsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Settings' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
				<Notifications />
				<Security />
				<ConnectedAccounts />
				<DangerZone />
			</main>
		</div>
	);
};
export default SettingsPage;
