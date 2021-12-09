import { useRef } from "react";
import { Close } from "@mui/icons-material";
import Picker from "emoji-picker-react";
import "./EmojiModal.css";
import { useOutsideAlerter } from "../../customHooks/useOutsideAlerter";

const EmojiModal = ({
  emojiModalActive,
  setEmojiModalActive,
  addEmojiToPost,
}) => {
  const emojiModalContent = useRef(false);
  useOutsideAlerter({
    ref: emojiModalContent,
    setModalActive: setEmojiModalActive,
  });

  return (
    <div
      className="emojiModal"
      id="emojiModal"
      style={{ display:  "flex" }}
      // style={{ display: `${emojiModalActive ? "flex" : "none"}` }}
    >
      <div 
      ref={emojiModalContent} 
      className="emojiModalContent">
        <Picker
          groupVisibility={{
            flags: false,
            travel_places: false,
            animals_nature: false,
            symbols: false,
            objects: false,
            activities: false,
            food_drink: false,
          }}
          onEmojiClick={(event, emojiObject) => {
            addEmojiToPost(emojiObject.emoji);
            setEmojiModalActive(false);
          }}
          className="emojiPickerMenu"
        />
        <Close
          className="closeEmojiModal"
          onClick={(e) => setEmojiModalActive(false)}
        />
      </div>
    </div>
  );
};

export default EmojiModal;
