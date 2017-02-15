/**
 * Created by taranjeet.s on 1/24/2017.
 */
export const selectedCompany = (company) => {
    console.log("company is selected");
    return {
        type : 'selected_company',
        payload : company
    };
};