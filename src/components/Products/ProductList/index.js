import React, { useState, useEffect } from "react";
import { setProductsListAC, addItemAC } from "../../../reducers";
import { connect } from "react-redux";
import ProductItem from "../ProductItem";
import ItemModal from "../../shared/ItemForm";
import axios from "axios";
import { Pagination, Button, notification } from "antd";
import "./productList.css";

const initialValues = {
  name: null,
  price: null,
  id: null,
  quantity: null,
  imageURL: null
};

const addNotification = content => {
  const text = {
    message: content,
    duration: 3
  };
  notification.open(text);
};

const ProductsList = ({ setInitialProductList, productsList, addItem }) => {
  const limit = 15;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  useEffect(() => {
    let url = `http://localhost:3001/products?limit=${limit}&currentPageNumber=${currentPageNumber -
      1}`;
    axios.get(url).then(response => {
      // wait for get image src for displaying
      setTimeout(() => {
        setInitialProductList(response.data.data);
        setTotalItems(response.data.total);
      }, 1500);
    });
  }, [currentPageNumber, productsList.length]);

  const handleAddItem = item => {
    addItem(item);
    var bodyFormData = new FormData();
    bodyFormData.append("name", item.name);
    bodyFormData.append("price", item.price);
    bodyFormData.append("quantity", item.quantity);
    bodyFormData.append("image", item.image.fileList[0].originFileObj);

    const config = { header: { "Content-Type": "multipart/form-data" } };
    axios
      .post("http://localhost:3001/products", bodyFormData, config)
      .then(() => {
        addNotification("Add item successfully");
      })
      .catch(err => {
        addNotification("Add item failed");
      });
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <p className="fixed-btn">
        <Button type="primary" onClick={handleOpenModal}>
          + Add Item
        </Button>
      </p>

      <div className="product-wrapper">
        <h1 className="title">All products</h1>
        <ItemModal
          handleSubmit={handleAddItem}
          isOpenModal={isOpenModal}
          handleCloseModal={handleCloseModal}
          modalTitle="Add item"
          initialValues={initialValues}
        />

        <div className="items-list-wrapper">
          {productsList.map((item, idx) => (
            <ProductItem
              key={idx}
              setInitialProductList
              limit
              currentPageNumber
              {...item}
            />
          ))}
        </div>
      </div>
      <Pagination
        style={{ textAlign: "center", margin: "20px" }}
        defaultCurrent={currentPageNumber}
        total={totalItems}
        defaultPageSize={limit}
        showQuickJumper
        onChange={pageNumber => {
          setCurrentPageNumber(pageNumber);
        }}
      />
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    productsList: state
  };
};

const mapDispatchToProps = dispatch => ({
  addItem: data => dispatch(addItemAC(data)),
  setInitialProductList: data => dispatch(setProductsListAC(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
