let getTweets = () => {
    twitter.api('https://api.twitter.com/1.1/search/tweets.json', {
        q: hashTag+" -RT",
        result_type: "mixed",
        count: 10,
        since_id: twitterNextId,
        callback: "analyzeTweets"
    });
}

let analyzeTweets = (data) => {
    if(twitterNextId){
        if(data.statuses.length){
            for(let i = data.statuses.length; i>0; i--){
                renderTextillate(data.statuses[i-1].text+' (@'+data.statuses[i-1].user.screen_name+')');
            }
            twitterNextId = data.statuses[0].id_str;
        }
    } else {
        twitterNextId = data.search_metadata.max_id_str;
    }
}

let requestTextillate = (val) => {
    let replaceValue = val.replace(/(http(s)?:\/\/[a-zA-Z0-9-.!'()*;/?:@&=+$,%#]+)/gi, ""); // URLを削除
    replaceValue = replaceValue.replace(new RegExp(hashTag, 'g'), ''); // ハッシュタグを削除
    
    textArea.css('left', '110%');
    textArea.text(replaceValue);
    textArea.css('display', 'block');

    let goal = 460;
    let goalLeft = 460;
    let addSpeed = 1000;
    let maxWidth = 1920 - goal - 20;

    feederArea.fadeIn(500, () => {
        textArea.animate({left: goal}, 1300, 'swing', () => { // 移動
            textArea.animate({left: goal}, 1000, 'swing', () => { // 停止
                
                let areaWidth = parseInt(textArea.css('width'));
                if(areaWidth >= maxWidth) {
                    goalLeft = goal - (areaWidth - maxWidth);
                    addSpeed = (areaWidth - maxWidth) * 2;
                }
                
                textArea.animate({left: goalLeft }, addSpeed, 'linear', () => { // 長文を更に移動
                    textArea.animate({left: goalLeft }, 2000, 'swing', () => { // 停止
                        if(!renderText.length) feederArea.fadeOut(200); // ストックなしで非表示
                        else {
                            textArea.fadeOut(500, () => {
                                requestTextillate(renderText[0]);
                                renderText.splice(0,1);
                            });
                        }
                    });
                });
            });
        });
    });
}

let checkFunc = () => {
    if(demo) {
        if(renderText.length <= 10) renderTextillate(demoFunc());
    }
    
    if(renderText.length){
        if(feederArea.css('display') == 'none') {
            requestTextillate(renderText[0]);
            renderText.splice(0,1);
        }
    }
}

let demoFunc = () => {
    var demoText = ["まるでテレビみたいですね(@vtubersuki)","こんなにエモい生放送は初めてだ！(@tknsr)","みんな最高だ！(@jintokai)","ちょっと長めのコメントもこうやってスライドして表示することができます。ハッシュタグとURLは自動で削除されます。(@twitterHashTagGetter)","最高の生放送です！(@jintokai)","みんな大好き！是非またやってほしい(@mksaaa)","長めのツイートも表示できるの？？？？枠より長いツイートはどうなっちゃうの？？？(@dounarunokana)","こうやってツイートすれば表示されるのかな？(@testUser)","試しにツイートしてみました(@tameshist)","デモ用のテキスト！！！(@demoText)","デモモードではランダムに文字が流れます。(@demoTest)","【拡散希望】とても最高の生放送をやっています。是非みんな見に来てください(@saikoLive)","ほんと神メンバー(@userAcc)","このメンバーでまたやってほしい！(@mtytt)","このメンバーみんなすこ(@VTsksk)","やっぱりTwitterっておもしろい(@mkak)"];
    return demoText[Math.floor(Math.random() * demoText.length)];
}

let renderTextillate = (val) => {
    renderText.push(val);
    console.log('stock+1 ',val);
}

let del = () => {
    renderText = [];
    console.log('%cストックを全て削除しました。','background-color: red; color: white;')
}

// Main
let twitterNextId = 0;
let twitter = new Twitter();
let renderText = [];
if(!demo) setInterval(getTweets, 7000, twitterNextId);
let check = setInterval(checkFunc, 1000);
let textArea = $('#twitter-feeder-text');
let feederArea = $('#twitter-feeder-area');

// ハッシュタグ名の表示調整
$('#twitter-feeder-tag').text(hashTag);

let TagfontSize = 58, TagTop = 54;
if(hashTag.length == 6) TagfontSize = 52, TagTop = 59;
else if(hashTag.length == 7) TagfontSize = 46, TagTop = 61;
else if(hashTag.length == 8) TagfontSize = 41, TagTop = 63;
else if(hashTag.length >= 9) TagfontSize = 36, TagTop = 65;
    
$('#twitter-feeder-tag').css('font-size', TagfontSize+'px');
$('#twitter-feeder-tag').css('top', TagTop+'px');
$('#twitter-feeder-tag').text(hashTag);

