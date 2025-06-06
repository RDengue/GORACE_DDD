import { IconDashboard } from "@tabler/icons-react";
import Title from "@/components/template/title.component";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <Title
        title="Dashboard"
        subtitle="Welcome to the dashboard"
        icon={IconDashboard}
      />
      <span>Dashboard</span>
    </div>
  );
}
