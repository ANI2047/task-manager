import Dashboard from "@/components/dashboard/Dashboard";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Home() {
	return (
	<div>
		<div className="flex justify-between border border-slate-900">
			<div className="text-3xl font-extrabold tracking-tight leading-none py-4">Kanban Model</div>
			<div className="h-12 w-12 hover:bg-slate-900 hover:cursor-pointer pl-3 rounded-md"><GitHubLogoIcon className="w-6 h-12"/></div>
		</div>
		<Dashboard />
	</div>);
}