const KeywordAPI = async (str) => {
    if (!isString(str)) {
        return { err: "not string" }
    }
    // Document
    // https://developer.yahoo.co.jp/webapi/jlp/keyphrase/v2/extract.html
    const params = {
        id: "1234-1",
        jsonrpc: "2.0",
        method: "jlp.keyphraseservice.extract",
        params: {
            q: str
        }
    }
    try {
        // CORS回避のために適当にローカルサーバを立てる
        const res = await fetch(`https://us-central1-mws21-undnm-4b9fc.cloudfunctions.net/KeywordAPI`, {
            // const res = await fetch(`/KeywordAPI`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params),
        })
        if (res.status !== 200) {
            return { err: `status code:${res.status}` }
        }
        return res.json()
    } catch (e) {
        return { err: `network:${e}` }
    }
}

const KeywordAPIMock = async (str) => {
    return new Promise((ok) => {
        ok({ "id": "1234-1", "jsonrpc": "2.0", "result": { "phrases": [{ "score": 100, "text": "新型コロナウイルス" }, { "score": 86, "text": "きょう" }, { "score": 83, "text": "水曜日" }, { "score": 81, "text": "感染" }, { "score": 78, "text": "死亡" }, { "score": 72, "text": "重症化リスク" }, { "score": 69, "text": "\n年代別" }, { "score": 61, "text": "およそ3か月ぶり" }, { "score": 61, "text": "直近7日間平均" }, { "score": 55, "text": "新規感染者数" }, { "score": 52, "text": "東京都" }, { "score": 51, "text": "高齢者" }, { "score": 49, "text": "およそ590人" }, { "score": 42, "text": "52．1パーセント" }, { "score": 38, "text": "男性1人" }, { "score": 37, "text": "高い65歳以上" }, { "score": 37, "text": "6月16日以来" }, { "score": 36, "text": "20代" }, { "score": 36, "text": "30代" }, { "score": 36, "text": "40代" }] } })
    })
}

function isString(obj) {
    // https://b.0218.jp/20141007002731.html
    return (typeof (obj) === "string" || obj instanceof String);
}