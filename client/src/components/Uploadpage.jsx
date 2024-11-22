import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./Context/auth";

const Uploadpage = ({ OpenUpload, handleClosedUpload }) => {
  const [description, setDiscription] = useState("");
  const [photo, setPhoto] = useState("");
  const [hashtag, setHashtag] = useState([]);
  const [totallikes, setTotallikes] = useState(0);
  const [auth] = useAuth();
  const [spinner, setSpinner] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const CreatePost = new FormData();
      CreatePost.append("author", auth?.user?.id);
      CreatePost.append("description", description);
      CreatePost.append("photo", photo);
      CreatePost.append("hashtag", hashtag);
      CreatePost.append("totallikes", totallikes);

      setSpinner(true);

      const { data } = await axios.post("api/v1/post/create-post", CreatePost);
      if (data?.sucess) {
        console.log("here worng")
        toast.success("Post uploaded");
        setSpinner(false);
        handleClosedUpload();
      } else {
        handleClosedUpload();
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={OpenUpload}
      onClick={handleClosedUpload}
      className="modal-backdrop"
    >
      <div
        className="modal-content bg-bg-light"
        style={{ minHeight: "200px" }}
        // onClick={e.stopPropagation()}
      >
        <div className="mb-3 text-bg-white h-auto w-100">
          <label
            htmlFor="Upload-post"
            className="className='btn btn-outline-light col-md-12 mb-3"
          >
            <input
              className="w-100"
              type="file"
              id="upload-images"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img img-reponsive"
              />
            </div>
          )}

          <div className="mb-3 d-flex flex-column">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="discription"
                placeholder="caption"
                onChange={(e) => setDiscription(e.target.value)}
                value={description}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="hashtag"
                placeholder="#Hastags"
                onChange={(e) => setHashtag(e.target.value)}
                value={hashtag}
                required
              />
            </div>

            <button
              className="w-25 rounded-2 align-self-center"
              onClick={handleCreatePost}
            >
          
              {spinner ? (
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              ) : (
                <h3>Post</h3>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploadpage;
