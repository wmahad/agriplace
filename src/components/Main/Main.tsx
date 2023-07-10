import styled from "@emotion/styled";
import { useFruits, useVegetables } from "hooks";
import { Link, useParams } from "react-router-dom";

import { Table, Tag as ATag } from "antd";
import { Tag } from "types/Tag";
import { Commodity } from "components/Commodities";

// NOTE - this is intentional

// const App = styled.div`
//   display: grid;
//   grid-template:
//     "products product-view cart" 50%
//     "products product-view recent" 50%/ 300px 1fr 300px;
//   height: 100vh;

//   .products {
//     grid-area: products;
//     background-color: lightblue;
//   }

//   .product-view {
//     grid-area: product-view;
//   }

//   .cart {
//     grid-area: cart;
//     background-color: lightgray;
//   }

//   .recent-products {
//     grid-area: recent;
//     background-color: lightgreen;
//   }
// `;

const App = styled.div`
  display: flex;
  flex-direction: column;
  .products,
  .product-view {
    flex: 1;
  }

  .product-view {
    background: #eee;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    & pre {
      white-space: pre-wrap;
    }
  }
`;

const { Column } = Table;

export const Main = () => {
  const { id } = useParams();

  const vegieResponse = useVegetables();
  const fruitResponse = useFruits();

  const isLoading = vegieResponse.isLoading || fruitResponse.isLoading;

  const data = [...vegieResponse.data, ...fruitResponse.data];

  const item = data.find((d) => d.id === id);
  return (
    <App>
      <div className="products">
        <Table loading={isLoading} dataSource={data} rowKey="id">
          <Column
            title="Name"
            dataIndex="name"
            render={(text: string, record: Commodity) => (
              <Link to={`/${record.id}`}>{text}</Link>
            )}
          />
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
        </Table>
      </div>
      {id && (
        <div className="product-view">
          {<pre>{JSON.stringify(item, null, 2)}</pre>}
        </div>
      )}
      {/* <div className="cart"></div> */}
    </App>
  );
};
