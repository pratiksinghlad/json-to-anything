import { lazy } from "react";
import type { ComponentType } from "react";

/**
 * Custom hook to create lazy-loaded components with preload capability
 * Allows preloading components on hover for better UX
 */
export const lazyWithPreload = <T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
) => {
  const LazyComponent = lazy(factory);
  let factoryPromise: Promise<{ default: T }> | undefined;

  const preload = () => {
    if (!factoryPromise) {
      factoryPromise = factory();
    }
    return factoryPromise;
  };

  return {
    Component: LazyComponent,
    preload,
  };
};
