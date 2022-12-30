import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>
    </>
  );
}

// Cada página exige roles e permissões diferentes
// o withSSRAuth vai ter como primeiro parâmetro
// ele recebe qual a função vai executar
// para buscar os dados que eu preciso do SSR
// e como segundo parâmetro para ele enviaremos um objeto
// que tem uma opção permissions que são quais permissões
// eu quero verificar que o usuário tem para mostrar essa tela
// e também pode receber um role, que é o cargo

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    // Precisamos fazer uma tratativa de erro nessa requisição
    // Por isso dentro do withSSRAuth, faremos essa tratativa
    // Para não ser necessário ficar repetindo código
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);
