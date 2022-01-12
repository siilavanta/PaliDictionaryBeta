var input_feild = document.getElementById('input_feild');
var navbar = document.getElementById('navbar');
var sidebar = document.getElementById('sidebar');
var more = document.getElementById('more');
var wordlist = document.getElementById('wordlist');
var meaningbox = document.getElementById('meaningbox')
var wordname = document.getElementById('wordname')
var meaning = document.getElementById('meaning')

var prev = document.getElementById('prev');
var next = document.getElementById('next');

var w_item = document.getElementById('w_item')
var mynote = document.getElementById('mynote')
var note_doc = document.getElementById('note_doc')

var notetxt = document.getElementById('notetxt')
var notesavebtn = document.getElementById('notesave')
var notedeletebtn = document.getElementById('notedelete')
var allnoteView = document.getElementById('allnoteView')
var fav = document.getElementById('fav');
var share = document.getElementById('share')
var favouritebtn = document.getElementById('favouritebtn');
var historybtn = document.getElementById('historybtn');
var favouritDiv = document.getElementById('favouritlist');
var historyDiv = document.getElementById('historylist');
var note_word = document.getElementById('note_word')
var outclickDiv = document.getElementById('outclick')
var sidebar_list_item = document.querySelectorAll('.sidebar_list_item')
var loadMore = document.getElementById('loadmore')
meaningbox.addEventListener('click', () => {
    //  outclick()
})


const clearTempHistory = () => {
    try {
        var wordlistclass = document.querySelectorAll('.wordlist')

        for (var i = 0; i < wordlistclass.length; i++) {
            var txt = wordlistclass[i].textContent
            if (wordlistclass.length > 1) {
                if (txt.includes('ইতিহাস এখনো')) {
                    wordlistclass[i].remove()
                }
            }

        }
    } catch (error) {

    }
}

const favActive = (e) => {
    w_item.innerHTML = '<p class="wordlist">পছন্দ শব্দের তালিকা শূন্য</p>'
    historybtn.removeAttribute('class')
    historybtn.setAttribute('class', 'bottom_btn')
    favouritebtn.setAttribute('class', 'bottom_btn active')

    if (e) {
        // //only btn click
        window.location.hash = 'nav'
        w_item.setAttribute('live', 'favourite')
        retrive(showFavList)
    }
}

const hisActive = (e) => {
    favouritebtn.removeAttribute('class')
    favouritebtn.setAttribute('class', 'bottom_btn')
    historybtn.setAttribute('class', 'bottom_btn active')

    if (e) {
        //only btn click
        window.location.hash = 'nav'
        w_item.setAttribute('live', 'history')
        showHistory()
        clearTempHistory();
    }
}


const letter = [
    ["অ", "bd_a"],
    ["আ", "bd_aa"],
    ["ই", "bd_i"],
    ["ঈ", "bd_ii"],
    ["উ", "bd_u"],
    ["ঊ", "bd_uu"],
    ["এ", "bd_e"],
    ["ও", "bd_o"],
    ["ক", "bd_ka"],
    ["খ", "bd_kha"],
    ["গ", "bd_ga"],
    ["ঘ", "bd_gha"],
    ["ঙ", "bd_um"],
    ["চ", "bd_ca"],
    ["ছ", "bd_cha"],
    ["জ", "bd_ja"],
    ["ঝ", "bd_jha"],
    ["ঞ", "bd_niya"],
    ["ট", "bd_tta"],
    ["ঠ", "bd_ttha"],
    ["ড", "bd_dda"],
    ["ঢ", "bd_ddha"],
    ["ণ", "bd_nna"],
    ["ত", "bd_ta"],
    ["থ", "bd_tha"],
    ["দ", "bd_da"],
    ["ধ", "bd_dha"],
    ["ন", "bd_na"],
    ["প", "bd_pa"],
    ["ফ", "bd_pha"],
    ["ব", "bd_ba"],
    ["ভ", "bd_bha"],
    ["ৰ", "bd_va"],
    ["ম", "bd_ma"],
    ["য", "bd_ya"],
    ["র", "bd_ra"],
    ["ল", "bd_la"],
    ["ল়", "bd_lla"],
    ["স", "bd_sa"],
    ["হ", "bd_ha"]
]

const search = () => {
    var val = input_feild.value;
    if (val !== '') {
        dictionary(`${val}`);
        clickTop(w_item)
        window.location.hash = 'nav'
    } else {
        homeView()
    }
    meaningboxDisplay(meaningbox, w_item)

}

const getLetter = (valChar) => {
    for (var i = 0; i < letter.length; i++) {
        if (letter[i][0] === valChar) {
            valChar = letter[i][1]
            return valChar;
        }
    }
}


const loadScript = (val) => {
    var valFirst = getLetter(val[0]);
    var old = oldScript(`${valFirst}`);
    if (!old) {
        var script = document.createElement('script');
        script.id = valFirst;
        script.src = `./data/${valFirst}.js`;
        document.head.appendChild(script);
        console.log('new loaded' + ` ${valFirst + old} `)
    } else {
        //console.log('allready load' + + ` ${valFirst + old} `)
    }
    setTimeout(() => {
        arrName(val);
    }, 1000)

}


const arrName = (val) => {
    var arr;
    var bd_char = {
        "অ": letter[0][1],

    }
    var charName = bd_char[`${val[0]}`];
    //dictionarya(val, charName);
}



const oldScript = (id) => {
    var isHave = false;
    var olSrc = document.querySelectorAll('script')
    for (var i = 0; i < olSrc.length; i++) {
        var t = olSrc[i].getAttribute('id');
        if (t === `${id}`) {
            isHave = true;
        }
    }
    return isHave;
}

const isEmptyValue = (value) => {
    if (value === '' || value === null || value === undefined) {
        return true;
    } else {
        return false;
    }
}



const dictionary = (val) => {
    var dicName = pbd_word
    var findItem = []
    for (var i = 0; i < dicName.length; i++) {
        var isMatch = dicName[i].startsWith(val)
        if (isMatch) {
            findItem.push(`<p onclick="meaNing('${i}'),  setHistory('${pbd_word[i]}')" class="wordlist searchwordlist">
                <span>${pbd_word[i]}</span> <i class="fas fa-search"></i></p>`);
            foundWord(findItem)
            loadMore.style.display = 'none'

        } else {

        }

    }


}
var saveItem = window.localStorage.getItem('recom_dic')
const foundWord = (findItem) => {
    w_item.setAttribute('live', 'search')
    var max = saveItem ? saveItem : 10; //default 10, max 15, min 5, show in search list

    for (var j = 0; j < findItem.length; j++) {
        if (findItem.length <= max) {
            w_item.innerHTML = findItem.join('');
            // console.log(findItem)
        }
    }
}



const d = () => {
    var temp = []
    for (var i = 0; i < 100; i++) {
        temp.push(`<p onclick="meaNing('${i}'), " class="wordlist" > <span>${pbd_word[i]}<span> <i class="fas fa-search"></i></p>`)
    }
    w_item.innerHTML = temp.join('')// no need
}


function splitWord(txt, el) {
    var wordArray = [];
    var newTxt = txt.split(' ');
    //console.log(newTxt);

    var symble = ['—', '(', ')', '[', ']',]

    for (var i = 0; i < newTxt.length; i++) {
        wordArray.push(`<w>${newTxt[i]}</w>`)
    }
    setTimeout(function () {
        el.innerHTML = "<p>" + wordArray.join(' ') + "</p>";
    }, 20)
    return wordArray.join(' ');
}

function getWord(i) {
    var device = window.localStorage['device'];
    if (device === 'android') {
        return Android.getWord(i)
    } else {
        var pbd = mydic.pbd
        return pbd[i][0];
    }
}
function getGram(i) {
    var device = window.localStorage['device'];
    if (device === 'android') {
        return Android.getGram(i)
    } else {
        var pbd = mydic.pbd

        console.log(pbd)
        return pbd[i][1];
    }
}
function getMeaning(i) {
    var device = window.localStorage['device'];
    if (device === 'android') {
        return Android.getMeaning(i)
    } else {
        var pbd = mydic.pbd
        return pbd[i][2];
    }
}
const meaNing = (i) => {

    var w = getWord(i)
    var g = getGram(i)
    var m = getMeaning(i)

    var w_gra = document.getElementById('w_gra')
    w_gra.innerHTML = `<span id="w_${i}"> <span class="bld">${w}</span></span>
            <span id="gra">${g}</span>`
    meaningbox.style.display = 'block'

    meaning.innerHTML = `<div id="mean" > <p id="meantxt" onclick="mainPopUpStart()"> ${m}</p>
    <p class="notice">প্রিয় ইউজার, এখানে কোনো বানান ভুল থাকলে তা কি আপনি সংশোধন করতে চান? আমরা আপনার মূল্যবান সংশোধনী পরবর্তী আপডেইটে যোগ করতে ইচ্ছুক।</p>
    <p onclick="wrongCorrect(false)" id="correctionbtn"><i class="fas fa-plus-circle"></i> এখানে সংশোধন করুন</p>
    <p onclick="wrongCorrect(true)" class="mycorrectionbtn" id="mycorrectionbtn"><i class="fas fa-check-double"></i> <span id="clength"></span></p>

    
    <h3 id="correctionResultTitle"></h3>
    <div id="correctionResult"></div>
    </div>`
    clickTop(document.getElementById('mean'))
    var minus = Number(i) - 1
    var plus = Number(i) + 1
    prev.setAttribute('onclick', `pre(${minus})`)
    // prev.innerHTML = `<i class="fas fa-chevron-left"> </i> <span>${Android.getWord(minus)}</span>`

    next.setAttribute('onclick', `nxt(${plus})`)
    //next.innerHTML = `<span>${Android.getWord(plus)}</span> <i class="fas fa-chevron-right"> </i>`

    mynote.setAttribute('onclick', `showNote("${w}")`)
    fav.setAttribute('onclick', `setFavWordToggle(${i})`)
    share.setAttribute('onclick', `ShareFun(${i})`)

    //When meaniing showing wordlist position fixed
    w_item.setAttribute('style', 'position: fixed')

    var newword = w;
    var oldword = window.localStorage.getItem(`${i}`)

    const favBtnSet = () => {
        var isfav = window.localStorage.getItem(`${i}`)
        if (isfav) {

            ///'isFav' save word but not matching with 'newword' to fixed the method
            if (isfav === newword) {
                var favFill = document.querySelector('.fa-heart');
                favFill.remove()
                fav.innerHTML = '<i id="full" class="fas fa-heart"> </i>'
            }
        } else {
            var favFill = document.querySelector('.fa-heart');
            favFill.remove()
            fav.innerHTML = '<i id="fill" class="far fa-heart"> </i>'
        }
    }

    if (newword !== oldword) {
        retrive(favBtnSet)
    } else {
        var favFill = document.querySelector('.fa-heart');
        favFill.remove()
        fav.innerHTML = '<i id="full" class="fas fa-heart"> </i>'
    }




    window.location.hash = 'nav'
    var mean = document.getElementById('mean')
    showSubword()
    //splitWord(mean.textContent, mean)
    popupbox.style.display = 'none'
    pophistory = [];
    pophislist.innerHTML = ''

    localStorage['wrong'] = JSON.stringify({
        'id': i,
        'word': w,
        'gram': g,
        'mean': m

    })
    document.getElementById('correctionResultTitle').innerHTML = ''

  
    correctionResult(i, 'correctionResult')


}





function wrongCorrect(option) {

    try {
        if (window.navigator.onLine) {
            

            if (option) {
                Android.wrongActivity()
                localStorage['cActivity'] = 'true'
               
            } else {
                Android.wrongActivity()
            }
        } else {
            alert('নেট সংযোগ দিন')
        }
    } catch (error) {

    }
    //console.log(window.navigator.onLine)
}
const updateFavitem = (oldword, newword) => {
    var favFill = document.querySelector('.fa-heart');
    for (var i = 0; i < pbd_word.length; i++) {
        if (pbd_word[i] === oldword) {
            window.localStorage.setItem(i, pbd_word[i])
            var favFill = document.querySelector('.fa-heart');
            favFill.remove()
            fav.innerHTML = '<i id="full" class="fas fa-heart"> </i>'
            // console.log(pbd_word[i])
        }

        if (pbd_word[i] === newword) {

        }
    }

}



const pre = (i) => {
    meaNing(i)
}
const nxt = (i) => {
    meaNing(i)
}

const inputFocus = () => {
    input_feild.focus()
}
const checkHistory = () => {
    var getHisData = window.localStorage.getItem('hisData')
    var temp = [
        [0, 'ইতিহাস এখনো রচনা হয়নি']
    ]
    if (getHisData == null) {
        window.localStorage.setItem('hisData', JSON.stringify(temp))
    } else {
        var h_arr = JSON.parse(getHisData)
        return h_arr;
    }

}



const setHistory = (word) => {
    var h_arr = checkHistory()
    if (h_arr) {
        h_arr.splice(h_arr.length, 0, [h_arr.length, word])
        window.localStorage.setItem('hisData', JSON.stringify(h_arr))
    }
}

const getHistory = () => {
    var getHisData = window.localStorage.getItem('hisData')
    var history = JSON.parse(getHisData)
    // console.log(history[1][0])
    //console.log(JSON.parse(getHisData))
    return history;
}


function newToOld(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

function oldToNiw(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function index(element) {
    //var indices = [];
    var array = pbd_word
    var idx = array.indexOf(element);
    // while (idx != -1) {
    //     indices.push(idx);
    //     idx = array.indexOf(element, idx + 1);
    // }
    console.log(pbd_word)
    return idx
}

const showHistory = () => {
    var history = getHistory();
    var sorted = history.sort(newToOld);
    //console.log(sorted)

    var finalHis = []
    for (var i = 0; i < sorted.length; i++) {
        finalHis.push(`<p onclick="meaNing('${index(sorted[i][1])}')" class="wordlist hiswordlist" > 
                    <span>${sorted[i][1]}</span> <i  class="fas fa-history"></i> </p>`)
    }
    w_item.innerHTML = finalHis.join('')
    try {
        loadMore.style.display = 'none'
    } catch (error) {

    }

}


const showNote = (word) => {
    outclickDiv.style.display = 'block'
    notetxt.value = ''
    var notedata = window.localStorage.getItem(`${word}`)
    if (notedata !== null) {
        note_word.innerHTML = ' মূল শব্দ : ' + word;
        notetxt.value = notedata;
        note_doc.style.display = 'block'
        window.location.hash = 'nav'
        notesavebtn.innerHTML = 'আপডেইট করুন'
        notetxt.setAttribute('oninput', `isChangeNote()`)


    } else {
        note_word.innerHTML = ' মূল শব্দ : ' + word;
        note_doc.style.display = 'block'
        window.location.hash = 'nav'
        notesavebtn.setAttribute('onclick', `notesave('${word}')`)
        notetxt.setAttribute('oninput', `isChangeNote()`)
    }

    notesavebtn.setAttribute('onclick', `notesave('${word}')`)
    notedeletebtn.setAttribute('onclick', `notedelete('${word}')`)


}

const notesave = (word) => {
    var notetxtVal = notetxt.value;
    outclickDiv.style.display = 'none'
    if (notetxtVal !== '') {
        window.localStorage.setItem(`${word}`, notetxtVal)
        note_doc.style.display = 'none'
        try {
            Android.toast('নোট সংরক্ষণ করা হয়েছে')
        } catch (error) {

        }
    } else {
        notesavebtn.innerHTML = 'খালি নোট গ্রহণযোগ্য নয়'
        Android.toast('খালি নোট গ্রহণযোগ্য নয়')

    }
}

const notedelete = (word) => {
    var notetxtVal = notetxt.value;
    outclickDiv.style.display = 'none'
    if (notetxtVal !== '') {
        window.localStorage.removeItem(`${word}`)

    }
    notetxt.value = ''
    note_doc.style.display = 'none'
    Android.toast('নোট মুছে ফেলা হয়েছে')
    allNoteRetrive();
}



const noteclose = () => {
    notesavebtn.innerHTML = 'সংরক্ষণ করুন'
    notetxt.value = ''
    note_doc.style.display = 'none'
    outclickDiv.style.display = 'none'
}

const isChangeNote = () => {
    notesavebtn.innerHTML = 'সংরক্ষণ করুন'

}
const getVassa = (upasampadaDate) => {
    return Math.floor((new Date() - new Date(upasampadaDate).getTime()) / 3.15576e+10)
}

function test() {

    var indices = [];
    var array = pbd_word
    var element = 'ব্যাকত';
    var idx = array.indexOf(element);
    while (idx != -1) {
        indices.push(idx);
        idx = array.indexOf(element, idx + 1);
    }
    //console.log(indices);
    // [0, 2, 4]
}



const setFavWordToggle = (id) => {
    var favFill = document.querySelector('.fa-heart');
    // var word = document.getElementById(`w_${id}`)
    //var w_id = word.getAttribute('id')
    // new fav word add method
    if (favFill.getAttribute('class') === 'far fa-heart') {
        favFill.remove()
        window.localStorage.setItem(id, pbd_word[id])
        fav.innerHTML = '<i id="full" class="fas fa-heart"> </i>'
        try {
            Android.showToast('পছন্দ শব্দের তালিকায় যোগ করেছেন ❤')
        } catch (error) {
            
        }


    } else if (favFill.getAttribute('class') === 'fas fa-heart') {
        window.localStorage.removeItem(id)
        favFill.remove()
        fav.innerHTML = '<i id="fill" class="far fa-heart"> </i>'
        //console.log('fls')
        // showFavList();
        try {
            Android.showToast('পছন্দ শব্দের তালিকা থেকে সরানো হয়েছে!')
            Android.onFocus();
        } catch (error) {
            
        }

    }

    window.localStorage.setItem('favData', true)

}

const showFavList = () => {


    try {
        var favlist = []

        for (var i = 0; i < pbd_word.length; i++) {
            var fv = window.localStorage.getItem(`${i}`)
            if (fv !== null) {
                favlist.push(`<p onclick="meaNing('${i}')" class="wordlist favwordlist" > 
                            <span>${fv}</span> <i class="fas fa-star"></i></p>`)

            }
        }

        w_item.innerHTML = favlist.join('');
        //console.log(favlist)
    } catch (error) {

    }
    try {
        loadMore.style.display = 'none'
    } catch (error) {

    }
}

const checkFavList = () => {

    var oldfavlist = []

    for (var i = 0; i < pbd_word.length; i++) {
        var fv = window.localStorage.getItem(`${i}`)
        if (fv !== null) {
            oldfavlist.push(fv)
            window.localStorage.removeItem(i)
        }
    }

    // console.log(oldfavlist)
    return oldfavlist;
}


const updateFavlist = (element) => {
    var array = pbd_word
    var idx = array.indexOf(element);
    window.localStorage.setItem(idx, array[idx])
    var indices = [];
    // while (idx != -1) {
    //     indices.push(idx);
    //     idx = array.indexOf(element, idx + 1);
    // }
    //console.log(idx);
    // [0, 2, 4]


}

const retrive = (favlistload) => {

    var old = checkFavList() //check and return new favlist;
    for (var i = 0; i < old.length; i++) {
        updateFavlist(old[i])
        if (i === (old.length - 1)) {
            //callback
            favlistload()
        }
    }
    try {
        loadMore.style.display = 'none'
    } catch (error) {

    }
}




//showFavList();
const meaningboxDisplay = (meaningbox, w_item) => {
    meaningbox.style.display = `none`
    w_item.setAttribute('style', `position: relative`)
}
const outclick = () => {
    more.style.display = 'none'
    sidebar.style.display = 'none'
    outclickDiv.style.display = 'none'
    noteclose()
    if (meaningbox.getAttribute('style') === 'display: block;') {

    } else {
        window.history.back()
    }
}

const androidback = () => {
    var misBlock = meaningbox.getAttribute('style') === 'display: block;'
    var sideBlock = sidebar.getAttribute('style') === 'display: block;'
    var moreisBlock = more.getAttribute('style') === 'display: block;'
    var note_docblock = note_doc.getAttribute('style') === 'display: block;'
    var note_Alldocblock = allnoteView.getAttribute('style') === 'display: block;'

    try {
        // not declear firstly
        var relative = w_item.getAttribute('style').includes('relative')
    } catch (error) {

    }

    var search = w_item.getAttribute('live') === 'search'
    var fav = w_item.getAttribute('live') === 'favourite'
    var history = w_item.getAttribute('live') === 'history'

    //when phone backpress if meaningbox context
    if (misBlock && sideBlock || moreisBlock) {
        more.style.display = 'none'
        sidebar.style.display = 'none'
        outclickDiv.style.display = 'none'
        note_doc.style.display = 'none'
        window.location.hash = 'nav'
    } else if (misBlock && note_docblock || note_Alldocblock) {
        outclickDiv.style.display = 'none'
        window.location.hash = 'nav'
        noteclose();
        allnoteViewClose();
    } else {
        outclick();
        cls();
    }

    if (relative && search) {
        homeView()
        input_feild.value = ''
        window.history.back();
        defaultview()

    } else if (relative && fav && (localStorage['homeview_dic'] == undefined)) {
        homeView()
        input_feild.value = ''
        window.history.back();
        defaultview()

    } else if (relative && history && (localStorage['homeview_dic'] == undefined)) {
        homeView()
        input_feild.value = ''
        window.history.back();
        defaultview()

    }
    if (isDefaultSave()) {
        historybtn.setAttribute('class', 'bottom_btn')
        favouritebtn.setAttribute('class', 'bottom_btn')
    }



}

function isDefaultSave() {
    if (localStorage['homeview_dic'] == undefined) {
        return true;
    } else {
        return false;
    }
}

const cls = () => {
    meaningboxDisplay(meaningbox, w_item)
    var search = w_item.getAttribute('live') === 'search'
    if (search) {
        window.location.hash = 'nav'

    } else {
        homeView()
        window.history.back();
    }



}


var nav_item = document.querySelectorAll('.nav_item')
nav_item.forEach((el) => {
    el.addEventListener('click', () => {
        var id = el.getAttribute('id')
        contex(`${id}`)
    })
})

const contex = (id) => {

    if (id === 'nav_left') {
        sidebar.style.display = 'block'
        outclickDiv.style.display = 'block'
        more.style.display = 'none'
        window.location.hash = 'nav'


    } else if (id === 'nav_right') {
        sidebar.style.display = 'none'
        outclickDiv.style.display = 'block'
        more.style.display = 'block'
        window.location.hash = 'nav'

    }

}

for (var i = 0; i < sidebar_list_item.length; i++) {
    var id = sidebar_list_item[i].getAttribute('id')
    if (id === 'update') {
        sidebar_list_item[i].addEventListener('click', () => {
            UpdateApp.rate();
        })
    }
    if (id === 'share') {
        sidebar_list_item[i].addEventListener('click', () => {
            Share.shareApp();

        })
    }
    if (id === 'rate') {
        sidebar_list_item[i].addEventListener('click', () => {
            Rate.rate();
        })
    }
    if (id === 'ourapp') {
        sidebar_list_item[i].addEventListener('click', () => {
            OurApp.ourapp();
        })
    }
    if (id === 'about') {
        sidebar_list_item[i].addEventListener('click', (e) => {
            // alert(e.target.textContent)
            try {
                Android.activityRun("AboutOur.html", 'আমাদের সম্পর্কে')
            } catch (error) {
                window.location.href = './AboutOur.html'

            }
        })
    }

    if (id === 'app_about') {
        sidebar_list_item[i].addEventListener('click', (e) => {
            try {
                Android.activityRun("AboutApp.html", 'অ্যাপটি সম্পর্কে')
            } catch (error) {
                window.location.href = './AboutApp.html'

            }

        })
    }

    if (id === 'help') {
        sidebar_list_item[i].addEventListener('click', (e) => {
            //Help.help('https://google.com')

            try {
                Android.activityRun("help.html", 'সাহায্য')
            } catch (error) {
                window.location.href = './help.html'

            }

        })
    }
}



const ShareFun = (i) => {

    var tword = `“${getWord(i)}”`
    var word = getWord(i);
    var gram = getGram(i)
    var mean = getMeaning(i)
    shareMeaning = `${word}\n${gram}\n${mean}`
    WordShare.shareWord(tword, shareMeaning)
}

var favword = document.getElementById('favword')
favword.addEventListener('click', () => {
    outclickDiv.style.display = 'none'
    meaningboxDisplay(meaningbox, w_item)
    more.style.display = 'none'
    favActive()
    showFavList()
    // window.history.back()
    w_item.setAttribute('live', 'favourite')
    window.location.hash = 'nav'

})


var hisword = document.getElementById('hisword')
hisword.addEventListener('click', () => {
    outclickDiv.style.display = 'none'
    meaningboxDisplay(meaningbox, w_item)
    more.style.display = 'none'

    showHistory()
    // window.history.back()
    w_item.setAttribute('live', 'history')
    window.location.hash = 'nav'
    hisActive()
    clearTempHistory()

})

const allNoteRetrive = () => {
    var allnote = []
    const getKey = (key) => {
        for (var i = 0; i < pbd_word.length; i++) {
            if (key === pbd_word[i]) {
                allnote.push(`<p class="note_item" onclick="showNote('${pbd_word[i]}')" > <i class="far fa-edit"></i> ${pbd_word[i]}</p>`)
            }
        }
        //console.log(allnote)
        allnote_word.innerHTML = allnote.join('')
    }


    for (let [key, value] of Object.entries(localStorage)) {
        var isNam = Number(key)
        if (isNam) {

        } else {
            getKey(key)
            // console.log(key)
        }
    }
}

var allnote_word = document.getElementById('allnote_word')
var noteMorebtn = document.getElementById('note')
noteMorebtn.addEventListener('click', () => {
    outclickDiv.style.display = 'none'
    more.style.display = 'none'
    allnoteView.style.display = 'block';
    window.location.hash = 'nav'

    allNoteRetrive()

})

const allnoteViewClose = () => {
    allnoteView.style.display = 'none';
    //window.history.back();

}
var setting = document.getElementById('setting').addEventListener('click', () => {
    window.location.href = './setting.html'
    //window.open('./setting.html')

})

const isBack = (url) => {
    var len = window.history.length
    console.log(len)

    if (url.includes("#")) {
        return true;
    } else {
        return false;
    }

}


var fontsize = window.localStorage.getItem('fontsize_dic')
if (fontsize !== null) {
    document.body.style.fontSize = fontsize + 'px';
}

function clickTop(el) {
    el.scrollIntoView(true);
    el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    window.scrollBy(0, -170);
    
    // setTimeout(() => {

    //     if (el.id === ('popupShow' || 'popupmean')) {
    //         el.setAttribute('style', 'margin-top: 50px')
    //         console.log('pop')
    //     }


    // },10)

}


const homeView = () => {
    var homeview_dic = window.localStorage.getItem('homeview_dic')
    if (homeview_dic === 'favourite') {
        w_item.setAttribute('live', 'favourite')
        retrive(showFavList);
        setTimeout(function () {
            showFavList()
        }, 500)
        favActive()
    } else if (homeview_dic === 'history') {
        var getHisData = window.localStorage.getItem('hisData')
        if (getHisData !== null) {
            w_item.setAttribute('live', 'history')
            setTimeout(function () {
                showHistory();
                hisActive()
                clearTempHistory()
           }, 500)
        }

    } else {
        checkHistory()
        //w_item.setAttribute('live', 'history')
        // w_item.setAttribute('view', 'normal')
        // w_item.setAttribute('style', 'relative')

        //window.localStorage.getItem('homeview_dic', 'history')
        //showHistory();
        ////clearTempHistory()
        //hisActive()

        //normalView(0, 1000, 500)



    }
}

homeView();

function defaultview() {
    var homeview_dic = window.localStorage.getItem('homeview_dic')
    if (homeview_dic == undefined || null) {
        w_item.innerHTML = ''
        w_item.setAttribute('style', 'position:relative')
        normalView(1, 500, 500)

    }
}
defaultview()
function normalView(start, target, time) {
    setTimeout(function () {
        for (var i = start; i < target; i++) {

            w_item.insertAdjacentHTML('beforeend', `<p onclick="meaNing('${i}'),  setHistory('${pbd_word[i]}')" class="wordlist searchwordlist">
                <span>${pbd_word[i]}</span></p>`)

        }
        loadMore.style.display = 'block'
    }, time)

}

var nav_key = document.getElementById('nav_key')

function softKey(letter) {
    input_feild.setRangeText(
        letter,
        input_feild.selectionStart,
        input_feild.selectionEnd,
        'end'
    )
    inputFocus();
    search();
}
inputFocus();

var popupbox = document.getElementById('popupbox')
var popqueryresult = document.getElementById('popqueryresult')

var popupword = document.getElementById('popupword')
var popupgram = document.getElementById('popupgram')
var popupmean = document.getElementById('popupmean')
var popupShow = document.getElementById('popupShow')
var popupnavigation = document.getElementById('popupnavigation')
var popprev = document.getElementById('popprev')
var popnext = document.getElementById('popprev')
var pophislist = document.getElementById('pophislist')
var mypoptoglebtn = document.getElementById('mypop')

var popsearch = document.getElementById('popsearch')
var wordMeanig = document.getElementById('meaning');
wordMeanig.addEventListener('click', function (e) {
    //poppuView()
})

mypoptoglebtn.addEventListener('click', function () {
    popupbox.toggleAttribute('style')
})

function mainPopUpStart() {
    poppuView()
}
popupmean.addEventListener('click', function (e) {

    poppuView()
    popupnavigation.style.display = 'block'
    pophislist.style.display = 'none'
    pophisTag = true

})

var pophisTag = true;
function pophisbtn() {
    if (pophisTag) {
        pophislist.style.display = 'block'
        pophisTag = false
    } else {
        pophislist.style.display = 'none'
        pophisTag = true
    }


    var arr = []
    for (var i = (pophistory.length - 1); i >= 0; --i) {
        arr.push(`<li onclick="popHisView(${i})"> <i class="fas fa-history"></i> ${pophistory[i][0]} </li>`)
    }
    pophislist.innerHTML = arr.join('')
}

function popHisView(id) {
    popupword.innerHTML = pophistory[id][0]
    popupgram.innerHTML = pophistory[id][1]
    popupmean.innerHTML = pophistory[id][2]
    pophislist.style.display = 'none'
    pophisTag = true
}

function poppuView() {
    var s = window.getSelection();
    s.modify('extend', 'backward', 'word');
    var backWardText = s.toString();

    s.modify('extend', 'forward', 'word');
    var forWardText = s.toString();

    s.modify('move', 'backward', 'word');
    var finalWord = backWardText + forWardText;

    finalWord = finalWord.trim()
    finalWord = finalWord.replace('।', '')
    finalWord = finalWord.replace(',', '')
    finalWord = finalWord.replace(']', '')
    finalWord = finalWord.replace('[', '')
    finalWord = finalWord.replace('(', '')
    finalWord = finalWord.replace(')', '')
    finalWord = finalWord.replace(';', '')
    finalWord = finalWord.replace(':', '')
    finalWord = finalWord.replace(':-', '')
    finalWord = finalWord.replace('—', '')
    finalWord = finalWord.replace('”', '')
    finalWord = finalWord.replace('“', '')
    finalWord = finalWord.replace('’', '')
    finalWord = finalWord.replace('‘', '')
    finalWord = finalWord.replace('?', '')
    finalWord = finalWord.replace('-', '')
    finalWord = finalWord.replace('{', '')
    finalWord = finalWord.replace('}', '')







    //console.log(e)
    // console.log(finalWord);
    //document.querySelector('#fav').innerHTML = finalWord

    popsearch.value = finalWord
    var matchList = popQuerylist(finalWord)

    if (finalWord !== '') {
        popupWindow(matchList, finalWord, true)
    }

}

function popupWindow(matchList, finalWord, click) {



    popupbox.style.display = 'block'
    if (matchList.length !== 0) {

        var id = matchList[0][0]
        var word = matchList[0][1]

        if (word === finalWord && click) {
            console.log(id)
            popUpDetailView(id)
            popqueryresult.innerHTML = ''
        } else {


            var list5 = matchList.length <= 5
            console.log(list5)
            var arr = []
            if (list5) {
                for (var i = 0; i < matchList.length; i++) {
                    arr.push(`<li onclick="popUpDetailView(${matchList[i][0]})"> <i class="fas fa-search"></i> ${matchList[i][1]}</li>`)
                }
                popqueryresult.innerHTML = arr.join('')
                popqueryresult.style.display = 'block'

            } else {

                click ? popupword.innerHTML = "" : ''
                click ? popupgram.innerHTML = '' : ''
                click ? popupmean.innerHTML = '' : ''

                for (var i = 0; i < 5; i++) {
                    arr.push(`<li onclick="popUpDetailView(${matchList[i][0]})"> <i class="fas fa-search"></i> ${matchList[i][1]}</li>`)
                }
                popqueryresult.innerHTML = arr.join('')
                popqueryresult.style.display = 'block'
            }

            console.log(matchList)
        }
    } else {
        click ? popupword.innerHTML = "কোনো শব্দের সাথে মিল নেই" : ''
        click ? popupgram.innerHTML = '' : ''
        click ? popupmean.innerHTML = '' : ''
        click ? popqueryresult.innerHTML = '' : ''


    }
}

var pophistory = []
function popUpDetailView(id) {

    var word = getWord(id)
    var gra = getGram(id)
    var mean = getMeaning(id)

    popupword.innerHTML = word
    popupgram.innerHTML = gra
    popupmean.innerHTML = mean
    popqueryresult.style.display = 'none'

    pophistory.push([word, gra, mean])


}


function popclose() {
    popupbox.style.display = 'none'

}

function showSubword() {




}

popupShow.addEventListener('click', function () {
    popqueryresult.style.display = 'none'
    pophislist.style.display = 'none'
    pophisTag = true

})

popsearch.addEventListener('click', function () {
    popqueryresult.style.display = 'block'
    pophislist.style.display = 'none'
    pophisTag = true

})
function popQuerylist(word) {
    var matchsWord = []
    for (var i = 0; i < pbd_word.length; i++) {
        if (pbd_word[i].startsWith(word)) {
            matchsWord.push([i, pbd_word[i]]);
        }
    }

    return matchsWord
}

function popupSearch() {
    var word = popsearch.value
    var matchList = popQuerylist(word)
    popupWindow(matchList, word, false)
    pophislist.style.display = 'none'
    pophisTag = true

}


function loadMoreWordList() {
    var wlist = w_item.querySelectorAll('.wordlist')
    var newTarget = wlist.length + 1000
    var newStart = wlist.length

    normalView(newStart, newTarget, 10)
    console.log(wlist.length)
}
