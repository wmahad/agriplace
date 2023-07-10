import {
  useAddFruitMutation,
  useDeleteFruitMutation,
  useUpdateFruitMutation,
} from "app/api";
import { Commodities } from "components/Commodities";
import type { Commodity } from "components/Commodities";
import { useFruits } from "hooks";

export interface FruitsProps {}

export const Fruits = () => {
  const { data, isLoading, tags } = useFruits();

  const [addFruit, addResult] = useAddFruitMutation();

  const [updateFruit, updateResult] = useUpdateFruitMutation();

  const [deleteFruit, deleteResult] = useDeleteFruitMutation({});

  return (
    <Commodities
      data={data as Commodity[]}
      tags={tags}
      isLoading={isLoading}
      isMutating={addResult.isLoading || updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      createMutation={addFruit}
      deleteMutation={deleteFruit}
      updateMutation={updateFruit}
    />
  );
};
