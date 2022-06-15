export const isEmpty = (obj) => {
  return typeof obj === "undefined" || (obj && Object.keys(obj).length === 0);
};

export const extractSearchQuery = (string) => {
  for (const char of string) {
    if (char === "=") {
      return string.slice(string.indexOf(char) + 1);
    }
  }
};

export const pause = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const hasWhiteSpace = (s) => {
  return s.indexOf(" ") >= 0;
};

export const startsWithSpace = (string) => {
  return string.indexOf(string.trim()) !== 0;
};

export function containsObject(obj, list) {
  return list.some((elem) => elem === obj);
}

export const removeOverlappedUsers = (list, otherList) => {
  let filterList = [...list];
  for (let x = 0; x < otherList.length; x++) {
    filterList = filterList.filter((e) => e._id !== otherList[x]._id);
  }
  return filterList;
};

export const removeUserFromList = (list, removedUser) => {
  return list.filter((user) => user.username !== removedUser.username);
};

export const removeWhiteSpace = (list) => {
  return list.map((item) => item.trim()).filter((item) => item.trim());
};

export const removeCharsFromString = (chars, string) => {
  return string.split(chars);
};

export const getObjectFromNameProp = (namesString, objectsList) => {
  let results = [];
  const namesWithoutAnd = removeCharsFromString("and", namesString);
  const listWithoutSpace = removeWhiteSpace(namesWithoutAnd);
  for (let i = 0; i < listWithoutSpace.length; i++) {
    for (let x = 0; x < objectsList.length; x++) {
      if (listWithoutSpace[i] === objectsList[x].username) {
        results.push(objectsList[x]);
      }
    }
  }
  return results;
};

export const sortByDate = (arr) => {
  const sortedArr = arr.sort((p1, p2) => {
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  });
  return sortedArr;
};

export const getMatches = (searchInput, list) => {
  const removedSpace = searchInput.trim()
  const allMatches = list.filter((fr) =>
    fr.username.toLowerCase().includes(removedSpace.toLowerCase())
  );
  return allMatches;
};

export const getFirstNameMatches = (searchInput, friendsList) => {
  const friendMatches = friendsList.filter((fr) =>
    fr.username.toLowerCase().startsWith(searchInput.toLowerCase())
  );
  return friendMatches;
};

export const combineAllResults = (user, searchInput, friendsList, postsList) => {
  const allUsers = [...friendsList, user];
  const friendMatches = getMatches(searchInput, allUsers)
  const postMatches = postsList.filter((p) =>
    p.desc.toLowerCase().includes(searchInput.toLowerCase())
  );
  const allResults = friendMatches.concat(postMatches);
  return allResults;
};

export const formatAMPM = (hrs, mns) => {
  hrs = parseInt(hrs);
  mns = parseInt(mns);
  let ampm = hrs >= 12 ? "pm" : "am";
  hrs = hrs % 12;
  hrs = hrs ? hrs : 12;
  mns = mns.toString().padStart(2, "0");
  let strTime = hrs + ":" + mns + " " + ampm;
  return strTime;
};

// export const countMutualFriends = (random, currUser) => {
//   let count = 0
//   const randomFollowings = new Set(random.followings)
//   const currUserFollowers = new Set(currUser.followers)
//   const currUserFollowings = new Set(currUser.followings)
//   for (const id of random.followers) {
//       if (randomFollowings.has(id) && currUserFollowers.has(id) && currUserFollowings.has(id)) {
//           count += 1
//       }
//   }
//   return count
// }