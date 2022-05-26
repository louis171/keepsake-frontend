// Creates exerpt of a string. Accepts string and limit (limit is int for number of characters required)
// Returns original and short string as object
export const getExcerpt = ( str, limit ) => {
    var fullText = str;
    var shortText = str;
    shortText = shortText.substr( 0, shortText.lastIndexOf( ' ', limit ) ) + '...';
    var returnString = {
        fullText: fullText,
        shortText: shortText
    };
    return returnString;
}

export const sqlDateConvert = ( isoDate ) => {
    const newDate = new Date(isoDate).toLocaleDateString()
    return newDate;
}