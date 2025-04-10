import { CollectionsProvider } from "./collections/context";
import { QueryProvider } from "./query/context";
import { TabsProvider } from "./tabs/context";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <TabsProvider>
        <CollectionsProvider>{children}</CollectionsProvider>
      </TabsProvider>
    </QueryProvider>
  );
}
