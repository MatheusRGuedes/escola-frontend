import { AbstractControl } from "@angular/forms";

export class DateValidators {

    static valid(control :AbstractControl) {
        const dataInput = control.value + "";
        const error = { invalid: true };
        
        if (dataInput.trim().length == 8 || dataInput.trim().length == 10) {
            let data = convertStringToDate(dataInput);
            return isNaN(data.getTime()) ? error : null;
        } else if (dataInput.trim().length > 0) {
            return error;
        }
        return null;
    }

    static past(control :AbstractControl) {
        const dataInput = control.value + "";

        const validDate = DateValidators.valid(control);
        if (validDate != null) return validDate;

        const past = convertStringToDate(dataInput);
        const today = new Date();

        //console.log(past.getTime() +" "+ today.getTime());
        //verifica se a data n é posterior ou atual
        if (past.getTime() < today.getTime() 
            && getFormattedDate(past) != getFormattedDate(today)) {
            return null;
        }

        return {
            isNotPast: true
        }
    }
}

function getFormattedDate(date :Date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
  }

  function convertStringToDate(dataInput :string) {
    let dia = '', mes = '', ano = '';
    if (dataInput.trim().length == 8) {
        dia = dataInput.substring(0, 2);
        mes = dataInput.substring(2, 4);
        ano = dataInput.substring(4, 8);
    } else {
        dia = dataInput.substring(0, 2);
        mes = dataInput.substring(3, 5);
        ano = dataInput.substring(6, 10);
    }
    return new Date(mes +'-'+ dia +'-'+ ano);
  }