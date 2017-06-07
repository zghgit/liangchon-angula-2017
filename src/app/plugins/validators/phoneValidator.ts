/**
 * Created by max on 2017/6/6.
 */
import{ FormControl }from'@angular/forms';
export function phoneValidator(c: FormControl){
    return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(1)\d{10}$)|^[400|800]\d{7,9}$/.test(c.value) ? null: {
            phoneValidator: {valid: false}
        }
}