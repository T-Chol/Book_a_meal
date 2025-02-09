import withAuth from "../../hoc/withAuth";

const Big = () => {
  return <div>Big page Page</div>;
};
export default withAuth(Big, { role: "ADMIN" });