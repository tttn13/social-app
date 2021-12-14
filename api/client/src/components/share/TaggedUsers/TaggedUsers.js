import './taggedUsers.css';
import { HighlightOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const TaggedUsers = ({
  classname,
  taggedList,
  taggedUsersForPost,
  currentUser,
  removeUsersFn,
}) => {
  const names = taggedList.map((u) => u.username);
  const namesString = names.join(' and ');
  return (
    <span
      className={classname}
      style={{
        display: `${taggedList.length > 0 ? 'flex' : 'none'}`,
        fontSize: '13px',
      }}
    >
      {taggedUsersForPost ? (
        <>
          {taggedList.length > 0 && (
            <span className={taggedUsersForPost}>
              is with <span className="nameString">{namesString}</span>
            </span>
          )}
        </>
      ) : (
        <div style={{ fontWeight: 500 }}>
          <span style={{ paddingRight: '5px' }}>{currentUser.username}</span>
          is with
          <span> {namesString}</span>
        </div>
      )}

      {removeUsersFn && (
        <IconButton size="small" aria-label="Delete" onClick={removeUsersFn}>
          <HighlightOff />
        </IconButton>
      )}
    </span>
  );
};

export default TaggedUsers;
