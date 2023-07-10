import {
  useAddVegetableMutation,
  useDeleteVegetableMutation,
  useUpdateVegetableMutation,
} from "app/api";

import { Commodities } from "components/Commodities";
import type { Commodity } from "components/Commodities";
import { useVegetables } from "hooks";

export const Vegetables = () => {
  const { data, isLoading, tags } = useVegetables();

  const [addVegetable, addResult] = useAddVegetableMutation();

  const [updateVegetable, updateResult] = useUpdateVegetableMutation();

  const [deleteVegetable, deleteResult] = useDeleteVegetableMutation({});

  return (
    <Commodities
      data={data as Commodity[]}
      tags={tags}
      isLoading={isLoading}
      isMutating={addResult.isLoading || updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      createMutation={addVegetable}
      deleteMutation={deleteVegetable}
      updateMutation={updateVegetable}
    />
  );
};
