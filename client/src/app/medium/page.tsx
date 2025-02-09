import withAuth from "../../hoc/withAuth";

const Medium = () => {
  return <div>Big page Page</div>;
};
export default withAuth(Medium, { role: "CATERER" });