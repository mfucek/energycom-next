import { Invoice } from '@/modules/bill/Invoice';

export default function Home() {
	return (
		<>
			<h1 className="display-3">Hello!</h1>
			<Invoice />
		</>
	);
}
