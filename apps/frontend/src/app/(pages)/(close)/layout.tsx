import ForceLoggedInUser from "@/components/auth/force-loggedin-user.component";
import AdminTemplate from "@/components/template/admin.template";

export default function Page(props: { children: React.ReactNode }) {
  return (
    <ForceLoggedInUser>
      <AdminTemplate>{props.children}</AdminTemplate>
    </ForceLoggedInUser>
  );
}
