import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import { Link } from "react-router-dom";

import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useNavigate } from "react-router-dom";
import GoLoading from "../Loading/GoLoading";
import noImg from "../../assets/no-image.png";

const Create = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let [name, setName] = useState("");
  let [category, setCategory] = useState("");
  let [price, setPrice] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState();
  let [location, setLocation] = useState("");
  let [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    let date = new Date().toDateString();
    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          Firebase.firestore()
            .collection("products")
            .add({
              name,
              category,
              price,
              description,
              url,
              location,
              userId: user.uid,
              createdAt: date,
            })
            .then(() => {
              setLoading(false);
              navigate("/");
            });
        });
      });
  };

  return (
    <Fragment>
      {loading && <GoLoading />}
      <div className="centerDiv">
        <h1>BOOKINGS</h1>
        <label>Name</label>

        <input
          className="input"
          type="text"
          name="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <div className="categDrop">
          <label>Category:</label>
          <select
            name="Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="input"
          >
            {" "}
            <option>Select Category</option>
            <option value="Auditorium">Auditorium</option>
            <option value="Gym">Gym</option>
            <option value="Swimming Pool">Swimming Pool</option>
            <option value="Cafe">Cafe</option>
            <option value="Open Grounds">Open Grounds</option>
            <option value="Lounges">Lounges</option>
          </select>
        </div>

        <label>Price</label>

        <input
          className="input"
          type="number"
          name="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <label>Description</label>

        <textarea
          className="input"
          rows={"2"}
          id="textarea"
          name="Description"
          value={description}
          style={{ "border-left": "1px solid grey;" }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <label>Location</label>

        <input
          className="input"
          type="text"
          name="Description"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />

        <img
          alt="Posts"
          height="200px"
          src={image ? URL.createObjectURL(image) : noImg}
        />

        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          className="fileInp"
        />
        <button className="uploadBtn" onClick={handleSubmit}>
          Upload and Submit
        </button>
        <div className="cancelUploadDiv">
          <Link to="/" className="cancelUploadLink">
            Cancel the upload
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
