export class APIurls {
    public static ApiUrl = "https://localhost:7286";
    public static addProductUrl: string = APIurls.ApiUrl + '/product/create'
    public static updateProductUrl: string = APIurls.ApiUrl + '/product/update'
    public static deleteProductUrl: string = APIurls.ApiUrl + '/product/delete/?id='
    public static getAllProductsUrl: string = APIurls.ApiUrl + '/product/getall'
    public static getProductUrl: string = APIurls.ApiUrl + '/product/get/?id='
}