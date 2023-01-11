import http from "k6/http";
import {check, sleep, group} from "k6";

export const options = {
    stages: [
        {duration: '30s', target: 20},
        {duration: '1m30s', target: 10},
        {duration: '20s', target: 0},
    ],
};


export default function (data) {
    const baseUrl = "172.26.0.1";
    group("home", function () {
        let req, res;
        res = http.get(baseUrl + "/");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });

    group("associations", function () {
        let req, res;
        res = http.get(baseUrl + "api/associations");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });

    group("users", function () {
        let req, res;
        res = http.get(baseUrl + "api/users");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });
}