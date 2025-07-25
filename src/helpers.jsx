import appConstants from "./appConstants";

export function getTableStats(tableData) {
    if (!tableData || tableData.length === 0) {
        return [];
    }

    let itemNames = [];
    let itemCount = {
        mon:0,
        tue:0,
        wed:0,
        thu:0,
        fri:0,
        sat:0,
        sun:0,
    }
    let choreList = {
        mon:[],
        tue:[],
        wed:[],
        thu:[],
        fri:[],
        sat:[],
        sun:[],
    }

    for (const item of tableData) {

        // get item names
        item && 
        item.title && 
        itemNames.push({
            title:item.title, 
            id:item.id
        });
        
        appConstants.days.map( (day, ind) => {
            // get item count
            item.days && (day in item.days) && itemCount[day]++;
            
            // get chores
            let task_id = item.id + '_' + day
            item.days[day] ? choreList[day].push({...item.days[day], task_id}) : choreList[day].push(null)
        })

        // appConstants.days.map( (day, ind) => item.days[day] ? choreList[day].push(item.days[day]) : choreList[day].push(null) )
    }

    return {itemNames,itemCount,choreList}

}

export function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

export function getTodayDay() {
    const days = [
        "sun",
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat",
    ]
    return days[new Date().getDay()];
}

export function combineClassNames(...classNames) {
    // Filter out any falsy values (like empty strings, undefined, null) and join them with a single space
    return classNames.filter(Boolean).join(' ');
}

export function formatTime(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let result = '';
  if (hrs > 0) result += `${hrs} hr${hrs > 1 ? 's' : ''}`;
  if (hrs > 0 && mins > 0) result += ' ';
  if (mins > 0) result += `${mins} min${mins > 1 ? 's' : ''}`;
  
  return result || '0 min';
}

export function checkDuplication(arr, checkProperty) {
    const property = new Set();

    return arr.some(item => {
        if (property.has(item[checkProperty])) return item;
        property.add(item[checkProperty]);
        return false;
    });
};
