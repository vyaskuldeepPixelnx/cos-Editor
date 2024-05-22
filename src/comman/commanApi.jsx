import { toast } from "react-toastify";
// import Cookies from "js-cookie";
const apiCall = async (params, cb) => {
    // console.log("url", url)
    try {
        if (!params.url) {
            toast.error("trying to call Api without url", { toastId: 'toast' });
            return
        }
        // let nav = navigator || null;
        // if (nav && nav.onLine) {
        //     toast.error('please check your inernet connection or try again later.', { toastId: 'toast' });
        //     return
        // }
        var detail = {
            method: params.method,
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow"
        };
        if (params.isFormData) {
            detail.headers = {}
            detail["body"] = params.data;
        } else if (['POST', 'PATCH', 'PUT'].includes(params.method?.toUpperCase())) {
            detail['headers'] = {
                "Content-Type": "application/json",
            }
            detail['body'] = JSON.stringify(params.data);
        } else {
            if (Object.keys(params.data).length) {
                var str = [];
                for (var p in params.data) {
                    if (params.data.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params.data[p]));
                    }
                }
                if (params.url.indexOf('?') !== -1) {
                    params.url += "&" + str.join("&");
                } else {
                    params.url += "&" + str.join("&");
                }
            }
        }
        let urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)?/;
        params.url = urlRegex.test(params.url) ? params.url : Local.API_URL + params.url;
        detail.headers.Authorization = Cookies.get('token');
        const response = await fetch(params.url, detail);
        let resp = await response.json();
        resp = typeof resp == "object" ? resp : JSON.parse(resp)
        if (resp.status == 200) {
            if (resp.massage && resp.massage != "") {
                toast.success(resp.massage, { toastId: "toast" })
            }
            cb(resp);
            return;
        } else {
            if (resp?.massage == 'jwt malformed') {
                window.location = '/'
            }
            if (resp.massage && resp.massage !== '') {
                toast.error(resp.massage, { toastId: '' })
            }
            cb({}, resp.massage);
        }
    }
    catch (error) {
        cb({}, error.massage);
    }
}
export default apiCall;
