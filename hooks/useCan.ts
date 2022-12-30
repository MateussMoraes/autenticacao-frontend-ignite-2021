import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermissions";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  if (permissions?.length > 0) {
    // O método every só ira retornar true caso todas as
    // as condições estiverem satisfeitas
    const hasAllPermissions = permissions.every((permission) => {
      // Iremos acessar as permissions do usuário e se caso
      // nas pemissions tiver incluso essa permissão que
      // estamos esperando
      return user?.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    // O método every só ira retornar true caso todas as
    // as condições estiverem satisfeitas
    const hasAllRoles = roles.some((role) => {
      // Iremos acessar as roles do usuário e se caso
      // nas pemissions tiver incluso essa permissão que
      // estamos esperando
      return user?.roles.includes(role);
    });

    if (!hasAllRoles) {
      return false;
    }
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  // se ele passar por todas as permissões que podem
  // acabar dando falso ai sim ele tem permissão, então true

  return userHasValidPermissions;
}
