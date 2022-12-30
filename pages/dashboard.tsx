import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  //Não é porque estamos validando essa permissão no
  // Front-end que a validação no Back-end não deve
  // acontecer também, se isso for um componente de
  // métrica que busca as métricas no back-end
  // essa requisição de buscar as métricas lá no back-end
  // lá no lado do back-end tem que validar se o usuario
  // que esta fazendo essa requisição tem a permissão de
  // listagem de métricas, no front-end e so uma questão visual

  // isso retornará true se o usuário tiver as
  // permissões para listar as métricas

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Deshboard: {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>

      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  // Precisamos fazer uma tratativa de erro nessa requisição
  // Por isso dentro do withSSRAuth, faremos essa tratativa
  // Para não ser necessário ficar repetindo código
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  return {
    props: {},
  };
});
