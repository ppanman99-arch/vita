import { useState, useEffect, useCallback } from 'react';
import { ContextManager } from './ContextManager';
import { LocalStorageContextAdapter } from '../../infrastructure/adapters/context/LocalStorageContextAdapter';
import type { UserContext } from '../../domain/context/UserContext';
import type { Role } from '../../domain/user/Role';
import type { Permission } from '../../domain/user/Permission';

const adapter = new LocalStorageContextAdapter();
const contextManager = new ContextManager(adapter);

const USER_ID_KEY = 'user_id';

function getUserId(): string {
  return typeof window !== 'undefined'
    ? sessionStorage.getItem(USER_ID_KEY) || localStorage.getItem(USER_ID_KEY) || 'demo-user'
    : 'demo-user';
}

export function useContextManager() {
  const [currentContext, setCurrentContext] = useState<UserContext | null>(null);
  const [loading, setLoading] = useState(true);

  const loadContext = useCallback(async () => {
    try {
      const userId = getUserId();
      const ctx = await contextManager.getCurrentContext(userId);
      setCurrentContext(ctx);
    } catch (e) {
      console.error('Failed to load context:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContext();
  }, [loadContext]);

  const switchContext = useCallback(
    async (newRole: Role) => {
      const userId = getUserId();
      try {
        const ctx = await contextManager.switchContext(userId, newRole);
        setCurrentContext(ctx);
        return ctx;
      } catch (e) {
        console.error('Failed to switch context:', e);
        throw e;
      }
    },
    []
  );

  return {
    currentContext,
    switchContext,
    loading,
    loadContext,
    hasPermission: (permission: Permission) =>
      currentContext ? contextManager.hasPermission(currentContext, permission) : false,
    canAccessModule: (module: string) =>
      currentContext ? contextManager.canAccessModule(currentContext, module) : false,
  };
}
