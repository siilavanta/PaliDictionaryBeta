function WordSearch() {

    var searchResult = []

    const isEmptyValue = (value) => {
        if (value === '' || value === null || value === undefined) {
            return true;
        } else {
            return false;
        }
    }
    this.search = function (el, arr) {
        var value = el.value;
        if (value !== '') {
            for (var i = 0; i < arr.length; i++){
                var isMatch = arr[i].startsWith(value);
                if (isMatch) {
                    searchResult.push([i, arr[i]])
                }
            }
        }
        return searchResult;
    }
}