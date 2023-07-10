import {
  useGetFruitTagsQuery,
  useGetFruitsQuery,
  useGetVegetableTagsQuery,
  useGetVegetablesQuery,
} from "app/api";

export function useFruits() {
  const {
    data: tags = [],
    isLoading: isFetchingTags,
    isSuccess,
  } = useGetFruitTagsQuery();
  const result = useGetFruitsQuery(undefined, {
    skip: isFetchingTags || !isSuccess,
    selectFromResult({ data = [], ...rest }) {
      return {
        ...rest,
        data: data.map((d) => ({
          ...d,
          tags:
            d.tags?.map((t) => ({
              ...tags.find((tag) => tag.id === t),
            })) ?? [],
        })),
      };
    },
  });

  return { ...result, tags };
}

export function useVegetables() {
  const {
    data: tags = [],
    isLoading: isFetchingTags,
    isSuccess,
  } = useGetVegetableTagsQuery();
  const result = useGetVegetablesQuery(undefined, {
    skip: isFetchingTags || !isSuccess,
    selectFromResult({ data = [], ...rest }) {
      return {
        ...rest,
        data: data.map((d) => ({
          ...d,
          tags:
            d.tags?.map((t) => ({
              ...tags.find((tag) => tag.id === t),
            })) ?? [],
        })),
      };
    },
  });

  return { ...result, tags };
}
