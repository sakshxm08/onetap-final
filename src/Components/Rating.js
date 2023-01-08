import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

import "./Rating.css";

function Rate(props) {
  const [rate, setRate] = useState(0);
  let givenRating;
  const giveRate = () => {
    setRate(givenRating);
    alert(`Are you sure you want to give ${givenRating} stars ?`);
    const db = getFirestore();
    const docRef = doc(db, "users", `${props.userid}`);
    const data = { rate: rate };
    updateDoc(docRef, data)
      .then((docRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // Firebase.firestore()
    //   .collection("products")
    //   .doc(`${props.postid}`)
    //   .update({ rate: rate });
  };
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        givenRating = index + 1;
        return (
          <label>
            <Radio type="radio" value={givenRating} onClick={giveRate} />
            <Rating>
              <FaStar
                size={30}
                color={
                  givenRating < rate || givenRating === rate
                    ? "000"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
}

export default Rate;
