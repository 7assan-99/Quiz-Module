import { Exam } from "../entities/exam.entity";
import moment from 'moment';

export const canTakeExam = (e: Exam)=>{

  let enTime = new Date(e.TimeToEnd)
    .toISOString()
    .toLocaleString()
    .replace(',', '');

  let endTime = moment(enTime, 'YYYY MM DD hh:mm:ss');
  endTime.add(3, 'h');

  let stTime = new Date(e.TimeToStart)
    .toISOString()
    .toLocaleString()
    .replace(',', '');

  let startTime = moment(stTime, 'YYYY MM DD hh:mm:ss');
  startTime.add(3, 'h');

  let now = moment();
  now.format('YYYY-MM-DD hh:mm:ss');

  if (now.diff(startTime) >= 0 && now.diff(endTime) <= 0) {
    return true;
  }
  return false;
}

export const calculateTimeToEnd = (t: any)=>{
  //calculate the time remaining for the exam
  
    let ti = moment(t)
    let now = moment(new Date()).format(
      'YYYY-MM-DDTHH:mm:ss'
    );
    let time = ti.diff(now);
    if (ti.diff(now) > 0) {
      let displayTime = moment(time).subtract(2,'hours').format('HH:mm:ss');
      return displayTime;
    }
    else{
      return '00:00';
    }
}
