import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, {useState, useEffect} from 'react';

import deskChairImage from './img/deskchair.jpg'
import greyCouchImage from './img/greycouch.jpg'
import './index.css';

function ItemCard(props) {
  const imageMapping = {
    deskChair: deskChairImage,
    greyCouch: greyCouchImage
  }
  return (
    //onClick={handleCardClick}
    <div className="d-flex"> 
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <img src={imageMapping[props.furniData.image]} className="card-img" alt={props.furniData.name}/>
            </div>
            <h4 className="card-title">
                {props.furniData.name}
                {/* {isClaimed ? ' (Claimed)' : ''} */}
            </h4>
             {/*  <h3 className="text-muted"> {props.furniData.location}</h3>
              <p className="card-text"> {props.furniData.description}</p> */}
              {/* <div 
                className={`btn btn-dark blue-btn ${isClaimed ? 'claimed' : ''}`} 
                onClick={handleClaimClick}
                style={{ 
                  pointerEvents: isClaimed ? 'none' : 'auto', 
                  backgroundColor: isClaimed ? 'gray' : '' }}>
                {isClaimed ? 'Claimed' : 'Claim It!'}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      /* {/* {showModal && (
        <ModalContent furniData={props.furniData} toggleModal={toggleModal} claim={handleClaimClick} isClaimed={isClaimed} />
      )} */
    //</div> 
  );
}


// function ModalContent(props) {
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([]);

//   const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };
  
//   const handleCommentSubmit = () => {
//     if (comment.trim() !== '') {
//       setComments([...comments, comment]);
//       setComment('');
//     }
//   }

//   const handleClaim = () => {
//     if (!props.isClaimed) {
//       props.claim();
//     }
//   };

//   const handleModalClick = (event) => {
//     event.stopPropagation();
//   };

//   return (
//     //onClick={handleModalClick}
//     <div className="modal-overlay" onClick={props.toggleModal}>
//     <div className="modal" >
//       <span className="close" onClick={props.toggleModal}>&times;</span>
//       <div className="modal-content">
//         <img src={props.furniData.imageURL} className="card-img pb-3" alt={props.furniData.name} />
//         <div className="text-content">
//           <h2 className="card-title">{props.furniData.name}</h2>
//           <h3 className="text-muted">{props.furniData.location}</h3>
//           <p className="card-text">{props.furniData.description}</p>
//         </div>
//         <div className="comments-section">
//           {comments.map((comment, index) => (
//             <div key={index}>{comment}</div>
//           ))}
//         </div>
//         <div className="comment-wrap">
//           <textarea placeholder="Add your comment here..." value={comment} onChange={handleCommentChange}></textarea>
//           <button className="comment" onClick={handleCommentSubmit}>Comment</button>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// }

function ItemList(props) {
    console.log(props);
    return (
      // this stores all the cards until the json the json is over
        <div className="row">
            {props.furni.map((item) => (
                <ItemCard key={item.name} furniData={item} claim={props.claim}/>
         ))}
        </div>
    );
}

export default ItemList;

// //this is the prop that allows it to read the json 
  // const [showModal, setShowModal] = useState(false);
  // const [isClaimed, setIsClaimed] = useState(props.furniData.claimed);
  // const [user, setUser] = useState(false);

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unregister = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return () => unregister();
  // }, []);

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  // const handleClaimClick = (event) => {
  //   event.stopPropagation();
  //   if(!isClaimed && user) {
  //     setIsClaimed(true);
  //     props.claim(props.furniData.name);
  //   } else if (!user) {
  //     alert("Please sign in");
  //   }
  // };


  // const handleCardClick = () => {
  //   if (!isClaimed) {
  //     toggleModal();
  //   }
  // };