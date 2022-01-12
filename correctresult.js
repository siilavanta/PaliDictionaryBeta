var appVersion;

function correctionResult(wordId, element) {
    fdb.ref().on('value', function (data) {
        if (data.exists()) {
            var mylArr = []
            var arr = []
            var cData = data.val();
            var keys = Object.keys(cData)
            //desending order
            for (var key = (keys.length - 1); key >= 0; key--){
                var o = keys[key];
                var { id, name, wrong, correct, comment, update, email } = cData[o];
                if (id == wordId) {
                    var d = new Date(Number(o));
                    // console.log(o)
                    var ud = new Date(Number(update));
                    var updatetext = 'আপডেইট করেছেন: ' + ud.toLocaleString()
                    arr.push(`<div class="correctionview">
                    <p> ভুল: <span class="red">${wrong} <span></p>
                    <p> শুদ্ধ: <span class="blue">${correct}<span><span></span></p>
                    <p> মন্তব্য: <span class="commenttxt">${comment == '' ? 'কোন মন্তব্য নেই' : comment}</span></p>
                    <p> সংশোধন করেছেন: ${name} <span class="createdate">${d.toLocaleString()}</span></p>
                    <p> <span class="updatedate"> ${update !== '' ? updatetext : ''}</p>

                </div>`)
                    document.getElementById('correctionResultTitle').innerHTML = 'সংশোধনী তালিকা'
                }

                if (id == wordId && email == localStorage['useremail']) {
                    document.getElementById('mycorrectionbtn').style.display = 'inline'
                    
                    mylArr.push(cData[o])
                    document.getElementById('clength').innerHTML = mylArr.length;
                }
            }
            // asending oredr
            // for (var o in cData) {
            //     var { id, name, wrong, correct, comment, update } = cData[o];
            //     if (id == wordId) {
            //         var d = new Date(Number(o));
            //         // console.log(o)
            //         var ud = new Date(Number(update));
            //         var updatetext = 'আপডেইট করেছেন: ' + ud.toLocaleString()
            //         arr.push(`<div class="correctionview">
            //         <p> ভুল: <span class="red">${wrong} <span></p>
            //         <p> শুদ্ধ: <span class="blue">${correct}<span><span></span></p>
            //         <p> মন্তব্য: <span class="commenttxt">${comment == '' ? 'কোন মন্তব্য নেই' : comment}</span></p>
            //         <p> সংশোধন করেছেন: ${name} <span class="createdate">${d.toLocaleString()}</span></p>
            //         <p> <span class="updatedate"> ${update !== ''? updatetext : ''}</p>

            //     </div>`)
            //         document.getElementById('correctionResultTitle').innerHTML = 'সংশোধনী তালিকা'
            //     }
            //     //console.log(id)
            // }

                
                //console.log(id)

            document.getElementById(element).innerHTML = arr.join('')
        } else {
            document.getElementById('correctionResultTitle').innerHTML = ''
        }

    })
}

var myTime = setInterval(sync, 1000);
function sync() {
    if (localStorage['save'] !== undefined) {
        try {
            var i = JSON.parse(localStorage['wrong']).id
            correctionResult(i, 'correctionResult')
            localStorage.removeItem('save')
        } catch (error) {

        }
    }
}