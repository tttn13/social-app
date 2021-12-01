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
  return list.filter(user => user.username !== removedUser.username)
  
}

export const removeWhiteSpace = (list) => {
  return list.map(item => item.trim()).filter(item => item.trim())
} 

export const removeCharsFromString = (chars, string) => {
    return string.split(chars)
}

export const getObjectFromNameProp = (namesString, objectsList) => {
  let results = []
  const namesWithoutAnd = removeCharsFromString("and", namesString)
  const listWithoutSpace = removeWhiteSpace(namesWithoutAnd)
  for (let i = 0; i< listWithoutSpace.length; i++) {
    for (let x = 0; x < objectsList.length; x++) {
        if (listWithoutSpace[i] === objectsList[x].username) {
            results.push(objectsList[x])
        }
    }
  }
  return results
}

export const sortByDate = (arr) => {
  const sortedArr = arr.sort((p1, p2) => {
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  });
  return sortedArr; 
}