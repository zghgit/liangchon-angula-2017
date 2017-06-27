/**
 * Created by max on 2017/6/2.
 */
import{ FormControl }from'@angular/forms';
export function TenValidator(c: FormControl){
    return Number(c.value)%10 == 0 ? null: {
            TenValidator: {valid: false}
        }
}