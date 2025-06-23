"use client";

import { useOptimistic, useTransition } from "react";

export function useOptimisticUpdate<T>(currentData: T, updateFn: (data: T, formData: FormData) => T) {
  const [optimisticData, addOptimisticData] = useOptimistic(currentData, (state: T, newData: FormData) => updateFn(state, newData));

  const [isPending, startTransition] = useTransition();

  const updateOptimistically = (formData: FormData) => {
    startTransition(() => {
      addOptimisticData(formData);
    });
  };

  return {
    data: optimisticData,
    isPending,
    updateOptimistically,
  };
}
