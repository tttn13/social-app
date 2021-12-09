import EditPostModal from "./EditPostModal";

const ModalBoxContainer = ({
  currentPost,
  user,
  setModalActive,
  setPostIsBeingEdited,
  postIsBeingEdited,
}) => {

  return (
    <div
      className="ModalBoxContainer"
      style={{
        display: `${postIsBeingEdited ? "flex" : "none"}`,
      }}
    >
      {postIsBeingEdited && (
      <>
      <EditPostModal
        currentPost={currentPost}
        user={user}
        setModalActive={setModalActive}
        setPostIsBeingEdited={setPostIsBeingEdited}
      /> 
      </>)
      }
    </div>
  );
};

export default ModalBoxContainer;
