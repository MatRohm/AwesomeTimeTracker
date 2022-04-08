declare module "react-dom" {
    interface ReactRoot {
      render(children: React.ReactNode, callback?: () => void): void;
      unmount(callback?: () => void): void;
    }
  
    interface RootOptions {
      hydrate?: boolean;
      hydrationOptions?: {
        onHydrated?: (suspenseNode: unknown) => void;
        onDeleted?: (suspenseNode: unknown) => void;
      };
    }
  
    export function createBlockingRoot(
      element: HTMLElement | null,
      options?: RootOptions
    ): ReactRoot;
  
    export function createRoot(
      element: HTMLElement | null,
      options?: RootOptions
    ): ReactRoot;
  }