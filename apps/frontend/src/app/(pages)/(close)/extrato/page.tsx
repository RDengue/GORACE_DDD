import { IconCreditCard } from "@tabler/icons-react";
import Title from "@/components/template/title.component";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <Title
        title="Extrato"
        subtitle="Sua vida financeira em um só lugar"
        icon={IconCreditCard}
      />
      <span>Extrato</span>
    </div>
  );
}
