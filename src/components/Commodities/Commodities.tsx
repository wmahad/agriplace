import {
  Button,
  Table,
  Tag as ATag,
  Space,
  Modal,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { type Product } from "types/Product";
import { Tag } from "types/Tag";
import {
  useAddVegetableMutation,
  useDeleteVegetableMutation,
  useUpdateVegetableMutation,
} from "app/api";
import { Vegetable } from "types/Vegetable";

const { Column } = Table;

const { confirm } = Modal;

export interface Commodity extends Product {
  tags: Tag[];
}
type CreateMutation = ReturnType<typeof useAddVegetableMutation>;
type UpdateMutation = ReturnType<typeof useUpdateVegetableMutation>;
type DeleteMutation = ReturnType<typeof useDeleteVegetableMutation>;

export function Commodities({
  isLoading,
  isMutating,
  isDeleting,
  data,
  tags,
  updateMutation,
  createMutation,
  deleteMutation,
}: {
  isLoading: boolean;
  isMutating: boolean;
  isDeleting: boolean;
  data: Commodity[];
  tags: Tag[];
  updateMutation: UpdateMutation[0];
  createMutation: CreateMutation[0];
  deleteMutation: DeleteMutation[0];
}) {
  const [form] = Form.useForm();
  const [param, setParam] = useSearchParams();
  const id = param.get("edit");

  const handleCancel = () => {
    setParam();
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      const mutation = !!id ? updateMutation : createMutation;
      await mutation({ ...values, id });
      setParam();
    });
  };

  const deleteItem = (record: Commodity) => {
    confirm({
      title: `Do you want to delete ${record.name}?`,
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      content: "This is going to completely remove the item",
      onOk(close) {
        deleteMutation(record as unknown as Vegetable).then(() => {
          close();
        });
      },
      okButtonProps: {
        loading: isDeleting,
      },
      cancelButtonProps: {
        disabled: isDeleting,
      },
      onCancel(close) {
        close();
      },
    });
  };

  const itemToEdit = data.find((d) => d.id === id);

  const initialValues = id
    ? { ...itemToEdit, tags: itemToEdit?.tags?.map((tag) => tag.id) }
    : { name: "", description: "", tags: [] };

  return (
    <>
      <Row justify="end">
        <Col span={4} style={{ paddingBottom: "20px" }}>
          <Button onClick={() => setParam({ new: "" })}>Add new item</Button>
        </Col>
      </Row>
      <Table loading={isLoading} dataSource={data} rowKey="id">
        <Column title="Name" dataIndex="name" />
        <Column title="Description" dataIndex="description" ellipsis />
        <Column
          title="Tags"
          dataIndex="tags"
          render={(records: Tag[]) => {
            return (
              <>
                {records.map((tag) => {
                  return (
                    <ATag color="blue" key={tag.id}>
                      {tag.name}
                    </ATag>
                  );
                })}
              </>
            );
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record: Commodity) => (
            <Space size="middle">
              <Button
                icon={<EditOutlined />}
                onClick={() => setParam({ edit: record.id })}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => deleteItem(record)}
              />
            </Space>
          )}
        />
      </Table>
      {(param.has("new") || !!id) && (
        <Modal
          title={`${itemToEdit ? "Update" : "Add new"} Item`}
          centered
          open
          onOk={handleSubmit}
          confirmLoading={isMutating}
          onCancel={handleCancel}
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            preserve={false}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="name"
              rules={[{ required: true, message: "Please enter a title!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a description!" },
              ]}
            >
              <Input.TextArea autoSize={{ minRows: 4, maxRows: 7 }} />
            </Form.Item>

            <Form.Item name="tags" label="Tags">
              <Checkbox.Group>
                <Row>
                  {tags.map((tag) => (
                    <Col key={tag.id}>
                      <Checkbox value={tag.id} style={{ lineHeight: "32px" }}>
                        {tag.name}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}
