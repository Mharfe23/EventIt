import Header from "../../../components/componentsNew/Header";


import OverviewCards from "../../../components/componentsNew/analytics/OverviewCards";
import RevenueChart from "../../../components/componentsNew/analytics/RevenueChart";
import ChannelPerformance from "../../../components/componentsNew/analytics/ChannelPerformance";
import ProductPerformance from "../../../components/componentsNew/analytics/ProductPerformance";
import UserRetention from "../../../components/componentsNew/analytics/UserRetention";
import CustomerSegmentation from "../../../components/componentsNew/analytics/CustomerSegmentation";
import AIPoweredInsights from "../../../components/componentsNew/analytics/AIPoweredInsights";
const AnalyticsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title={"Analytics Dashboard"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<ChannelPerformance />
					<ProductPerformance />
					<UserRetention />
					<CustomerSegmentation />
				</div>

				<AIPoweredInsights />
			</main>
		</div>
	);
};
export default AnalyticsPage;
