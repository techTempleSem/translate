const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin, // 터미널에서 입력
    output: process.stdout, // 터미널에 출력
});

let ko = ["ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄸ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅃ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ","ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"]
let en = ["r","R","rt","s","sw","sg","e","E","f","fr","fa","fq","ft","fx","fv","fg","a","q","Q","qt","t","T","d","w","W","c","z","x","v","g","k","o","i","O","j","p","u","P","h","hk","ho","hl","y","n","nj","np","nl","b","m","ml","l"]
let vowel = ["k","o","i","O","j","p","u","P","h","hk","ho","hl","y","n","nj","np","nl","b","m","ml","l"];
let first = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"]
let firstEn = ["r","R","s","e","E","f","a","q","Q","t","T","d","w","W","c","z","x","v","g"];
let second = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"]
let secondEn = ["k","o","i","O","j","p","u","P","h","hk","ho","hl","y","n","nj","np","nl","b","m","ml","l"];
let third=["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"]
let thirdEn = ["","r","R","rt","s","sw","sg","e","f","fr","fa","fq","ft","fx","fv","fg","a","q","qt","t","T","d","w","c","z","x","v","g"];

function singleKoToEn(ko){
    let uni = ko.charCodeAt(0) - 'ㄱ'.charCodeAt(0);
    process.stdout.write(en[uni]);
}
function multiKoToEn(ko){
    let uni = ko.charCodeAt(0) - '가'.charCodeAt(0);
    singleKoToEn(first[Math.floor(uni/588)]);
    singleKoToEn(second[Math.floor(uni%588/28)]);
    if(uni%28==0) return;
    singleKoToEn(third[Math.floor(uni%28)]);
}

function change(word){
    if(word == "") return;
    if(en.includes(word)){
        process.stdout.write(ko[en.indexOf(word)]);
    } else{
        let firstChar = "";
        let secondChar = "";
        let thirdChar = "";
        let curStat = 1;
        for(char of word){
            if(curStat == 1 && vowel.includes(char)) {
                curStat = 2;
            } else if(curStat==2 && !vowel.includes(char)) {
                curStat = 3;
            }
            if(curStat == 1) firstChar += char;
            else if(curStat == 2) secondChar += char;
            else if(curStat == 3) thirdChar += char;
        }

        let unicode = '가'.charCodeAt(0) + firstEn.indexOf(firstChar) * 588 + secondEn.indexOf(secondChar) * 28 + thirdEn.indexOf(thirdChar)
        process.stdout.write(String.fromCharCode(unicode));
    }
}


rl.on('line', (answer) => {

    if(answer[0] >= 'ㄱ' && answer[0] <= 'ㅣ' || answer[0] >= '가' && answer[0] <= '힣'){
        for(char of answer){
            if(char >= 'ㄱ' && char <= 'ㅣ'){
                singleKoToEn(char)
            }
            else if(char >= '가' && char <= '힣'){
                multiKoToEn(char)
            } else {
                process.stdout.write(char);
            }
        }
    }
    else {
        let stat = 0;
        let word = "";
        for(let idx = 0; idx < answer.length; idx++){
            const char = answer[idx];
            if(vowel.includes(char)){
                if(stat == 0) {
                    // 규칙 2-1
                    word += char;
                } else if(stat==2) {
                    // 규칙 2-2
                    if(['hk','ho','hl','nj','np','nl','ml'].includes(answer[idx - 1] + char)) {
                        word += char;
                    } else {
                        change(word);
                        word = char;
                    }
                } else {
                    // 규칙 2-3
                    change(word.slice(0,-1));
                    word = word[word.length - 1] + char;
                }
                stat = 2;
            } else if(char>='a' && char<='z' || char>='A' && char<='Z') {
                if(stat == 0){
                    // 규칙 3-1
                    word += char;
                    stat = 1;
                } else if(stat == 2){
                    // 규칙 3-2
                    if(vowel.includes(word[0]) || char == "Q" || char == "W" || char == "E"){
                        change(word);
                        word = char;
                        stat = 1;
                    } else {
                        word += char;
                        stat = 3;
                    }
                } else if(stat == 1){
                    // 규칙 3-3
                    change(word);
                    word = char;
                    stat = 1;
                } else {
                    // 규칙 3-4
                    if(vowel.includes(word[word.length - 2]) && 
                    ["rt","sw","sg","fr","fa","fq","ft","fx","fv","fg","qt"].includes(word[word.length - 1] + char)){
                        word += char;
                        stat = 3;
                    } else {
                        change(word);
                        word = char;
                        stat = 1;
                    }
                }
            } else {
                change(word);
                word = ""
                stat = 0;
                process.stdout.write(char);
            }
        }
        change(word);
    }

    rl.close();
});