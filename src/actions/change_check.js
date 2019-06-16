export const CHECK = 'checkValue';
let checkedItems =[];
export default function checkAction(value) {
  if(checkedItems.indexOf(value) === -1){
  checkedItems.push(value) ;
  } else {
    checkedItems.splice(value, 1);
  }
  return {
    type: CHECK,
    payload: {
        checkedItems
    }
  };
}
