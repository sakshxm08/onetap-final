import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import { Link } from "react-router-dom";
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useNavigate } from "react-router-dom";
import GoLoading from "../Loading/GoLoading";
import noImg from "../../assets/no-image.png";
import Logo from "../../onetap_logo.png";
import Header from "../Header/Header";

const Create = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
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
      <Header />
      {loading && <GoLoading />}
      <div className="createMainDiv">
        <div className="createParentDiv">
          <Link to="/">
            <img
              width="200px"
              height="200px"
              className="sideLogo"
              src={Logo}
              alt=""
            ></img>
          </Link>
          <div className="centerDiv">
            <Link to="/">
              <img
                width="100px"
                height="100px"
                className="topLogo"
                src={Logo}
                alt=""
              ></img>
            </Link>
            <div className="loginHr"></div>
            <h1>BOOKINGS</h1>
            <span className="label">Name</span>

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
              <span className="label">Category:</span>
              <select
                name="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="input"
              >
                {" "}
                <option>Select Category</option>
                <option value="Auditoriums">Auditoriums</option>
                <option value="Gyms">Gyms</option>
                <option value="Swimming Pools">Swimming Pools</option>
                <option value="Cafes">Cafes</option>
                <option value="Open Grounds">Open Grounds</option>
                <option value="Lounges">Lounges</option>
              </select>
            </div>

            <span className="label">Price</span>

            <input
              className="input"
              type="number"
              name="Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />

            <span className="label">Description</span>

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

            <span className="label">Location</span>

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
              className="noImg"
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
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
