import appConstants from "./appConstants";

export function getTableStats(tableData) {
  if (!tableData || tableData.length === 0) {
    return {
      itemNames: [],
      itemCount: {
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
        sat: 0,
        sun: 0,
      },
      choreList: {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
      },
    };
  }

  let itemNames = [];
  let itemCount = {
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0,
  };
  let choreList = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  };

  for (const item of tableData) {
    // get item names
    item &&
      item.title &&
      itemNames.push({
        title: item.title,
        id: item.id,
      });

    appConstants.days.map((day) => {
      // get item count
      item.days && day in item.days && itemCount[day]++;

      // get chores
      let task_id = item.id + "_" + day;
      item.days[day]
        ? choreList[day].push({ ...item.days[day], task_id })
        : choreList[day].push(null);
    });
  }

  return { itemNames, itemCount, choreList };
}

export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function getTodayDay() {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[new Date().getDay()];
}

export function combineClassNames(...classNames) {
  // Filter out any falsy values (like empty strings, undefined, null) and join them with a single space
  return classNames.filter(Boolean).join(" ");
}
