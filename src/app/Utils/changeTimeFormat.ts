import * as moment from 'moment';

export const ChangeTimeToTextFormat= (data:any[])=>{
    data.map((v: any) => {
      let oldDate = new Date(v.Created_On)
        .toISOString()
        .toLocaleString()
        .replace(',', '');
      let date = moment(oldDate, 'YYYY-MM-DDThh:mm:ss');
      v.Created_On = date.format('DD MMM YYYY').toString();
    });
    return data
}

export const ChangeDateFormat = (data: any)=>{
  let oldDate = new Date(data)
    .toISOString()
    .toLocaleString()
    .replace(',', '');
  let date = moment(oldDate, 'YYYY-MM-DDThh:mm:ss');
  return date.add(3,'hours').format('DD MMM YYYY HH:mm:ss').toString();
}
