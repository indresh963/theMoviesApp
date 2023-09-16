
function useDateSetter(befOrAf,byDays) {

    let date;
    switch(befOrAf){
        case("before"):
            date = new Date(Date.now() - byDays * 24 * 60 * 60 * 1000 );
            break;
        case("after"):
            date = new Date(Date.now() + byDays * 24 * 60 * 60 * 1000 );
            break;
        default:
            return;
    }

    let year = date.getFullYear();
    let month = (date.getMonth()+1) > 9 ? date.getMonth() : "0"+(date.getMonth()+1);
    let day = (date.getDate()) > 9 ? date.getDate() : "0"+date.getDate();

  return year + "-" + month + "-" + day;

}

export default useDateSetter;
