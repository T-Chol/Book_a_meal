// client/src/app/small/page.tsx
import withAuth from "../../hoc/withAuth";

function Small() {
  return <div>Small page Page</div>;
};
export default withAuth(Small, { role: "USER" });