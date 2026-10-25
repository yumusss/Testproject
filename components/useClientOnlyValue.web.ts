import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// The server snapshot is used during static rendering and hydration, so the
// server value is rendered first and the client value right after hydration.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  return isClient ? client : server;
}
