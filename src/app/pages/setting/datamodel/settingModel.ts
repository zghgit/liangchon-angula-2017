/**
 * Created by max on 2017/6/21.
 */
export class SettingModel {
    generation_collection: string|number="0";
    edit_resource: string|number="1";
    development_of_line: string|number="1";
    yunbi_pay: string|number="1";
    pay_success: string="恭喜!您成功支付%s元";
    welcome_page: string|number="1";
    banner_page: string|number="1";
    settlement_page: string|number="1";
    version_number: string;
    download_link: string;
    enforced_update:string|number="1";
    user_agreement: string;
}