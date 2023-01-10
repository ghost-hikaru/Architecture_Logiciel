import http from "k6/http";
import {check, sleep, group} from "k6";

baseUrl = "http://localhost";

export const options = {
    stages: [
        {duration: '30s', target: 20},
        {duration: '1m30s', target: 10},
        {duration: '20s', target: 0},
    ],
};


export default function (data) {
    group("home", function () {
        let req, res;
        res = http.get(baseUrl + ":4200/");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });

    group("associations", function () {
        let req, res;
        res = http.get(baseUrl + ":3000/associations");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });

    group("users", function () {
        let req, res;
        res = http.get(baseUrl + ":3000/users");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });
}