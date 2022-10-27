import { useParams } from "react-router-dom";

export default function IntegrationAdd(props) {
  const params = useParams();

  return (
    <div>
      <h1>Integration Configuration for {params.kind}</h1>
    </div>
  );
}
