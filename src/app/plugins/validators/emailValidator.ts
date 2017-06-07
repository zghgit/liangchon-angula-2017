/**
 * Created by max on 2017/6/6.
 */
import{ FormControl }from'@angular/forms';
export function emailValidator(c: FormControl){
    return /^\w+([\.-]?\w+)?@\w+([\.-]?\w+)?(\.\w{2,6})+$/.test(c.value) ? null: {
            emailValidator: {valid: false}
        }
}