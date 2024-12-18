import { API_REFRESH_PATH } from "../constants/ApiPathes"
import { get_access_token } from "../local-storage/access_token"

export default function update_token_middleware(response: Response) : Promise<{access_token: string, updated: boolean}> {
    return new Promise<{access_token: string, updated: boolean}>(
        (resolve) => {
            if (response.status === 401 || response.status === 403) {
                fetch(API_REFRESH_PATH, {method: "POST",
                    credentials: "include",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Access-Control-Allow-Origin' : 'https://ocrv-game.ru'
                    },
                    })
                    .then((response) => 
                        refresh_token_middleware(response.status, response.json()))
                    .then((data) => resolve({access_token: data.data.access_token, updated: true}), 
                        () => resolve({access_token: "", updated: true}))
            }
            else {
                resolve({access_token: get_access_token(), updated: false})
            }
    })
}

function refresh_token_middleware(status: number, json: Promise<any>) : Promise<any> {
    return new Promise<any>(
        (resolve, reject) => {
            if (status !== 403) {
                console.log(status)
                console.log("not 403")
                return resolve(json)
            } 
            else {
                console.log("403")
                return reject()
            }
        }
    )
}