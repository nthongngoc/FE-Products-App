import React, { useState } from "react";
import { connect } from "react-redux";
import "./productItem.css";
import ItemModal from "../../shared/ItemForm";
import axios from "axios";
import { editItemAC, removeItemAC, setProductsListAC } from "../../../reducers";
import { Modal, Button , notification} from "antd";

const editNotification = (content) => {
  const text = {
    message: content,
    duration: 3,
  };
  notification.open(text);
};

const removeNotification = (content) => {
  const text = {
    message: content,
    duration: 3,
  };
  notification.open(text);
};

const ProductItem = ({
  _id,
  name,
  price,
  quantity,
  imageURL,
  editItem,
  removeItem,
  setInitialProductList,
  limit,
  currentPageNumber
}) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenEditModal(false);
  };

  const handleEditItem = async item => {
    editItem(item);

    var bodyFormData = new FormData();
    bodyFormData.append("name", item.name);
    bodyFormData.append("price", item.price);
    bodyFormData.append("quantity", item.quantity);
    bodyFormData.append(
      "image",
      item.image && item.image.fileList[0].originFileObj
    );
    const config = { header: { "Content-Type": "multipart/form-data" } };
    await axios
      .put(`http://localhost:3001/products/${item._id}`, bodyFormData, config)
      .then(() => editNotification('Edit item successfully'))
      .catch(() => {
        editNotification('Edit item failed')
      });

    let url = `http://localhost:3001/products?limit=${limit}&currentPageNumber=${currentPageNumber}`;
    await axios.get(url).then(
      response => {
          setInitialProductList(response.data.data);
      },
      error => {
        console.log(error);
      }
    );
  };

  const handleRemoveItem = id => {
    setIsOpenRemoveModal(false);
    removeItem(id);
    axios.delete(`http://localhost:3001/products/${_id}`)
    .then(() => removeNotification('Remove item successfully'))
    .catch(() => removeNotification('Remove item fail'))
  };
  return (
    <div className="item-wrapper">
      <div className="image-wrapper">
        <img src={imageURL} />
      </div>
      <h3 className="name">{name}</h3>
      <div>
        <div className="properties">
          <p>Price:</p>
          <p>${price}</p>
        </div>
        <div className="properties">
          <p>Quantity:</p>
          <p>{quantity}</p>
        </div>
      </div>

      <div className="items-button">
        <Button
          className="detail-button"
          onClick={() => setIsOpenRemoveModal(true)}
        >
          Remove
        </Button>
        <Button
          className="detail-button"
          type="primary"
          onClick={handleOpenModal}
        >
          Update
        </Button>
      </div>

      <Modal
        title="Delete Item"
        visible={isOpenRemoveModal}
        onOk={() => handleRemoveItem(_id)}
        onCancel={() => setIsOpenRemoveModal(false)}
      >
        <p>Are you sure to delete this Item?</p>
      </Modal>

      <ItemModal
        initialValues={{ name, price, _id, quantity, imageURL }}
        handleSubmit={handleEditItem}
        isOpenModal={isOpenEditModal}
        handleCloseModal={handleCloseModal}
        modalTitle="Edit item"
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  editItem: item => dispatch(editItemAC(item)),
  removeItem: id => dispatch(removeItemAC(id)),
  setInitialProductList: data => dispatch(setProductsListAC(data))
});

export default connect(null, mapDispatchToProps)(ProductItem);
