/**
 * Created by max on 2017/6/6.
 */
import { Directive,Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
    selector: '[validateEqual]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EqualValidator, multi: true }
    ]
})
export class EqualValidator implements Validator {
    @Input()validateEqual: string;
    @Input()reverse: boolean;
    constructor() { }

    validate(control: AbstractControl): { [key: string]: any } {
        //当前控件的值
        let selfValue = control.value;

        // 需要比较的控件，根据属性名称获取
        let targetControl = control.root.get(this.validateEqual);
        let targetValue = targetControl.value;
        // 值不相等
        if(targetControl&&selfValue&&targetValue){
            if (selfValue !== targetControl.value ) {
                //repassword
                if(!this.reverse){
                    return {
                        validateEqual: true
                    }
                }else{
                    //password
                    targetControl.setErrors({
                        validateEqual: false
                    })
                }
            }else{//值相等，清空错误信息
                targetControl.setErrors(null);
            }
        }
    }
}