declare interface String {
    contains(stringA: string): boolean;
}

String.prototype.contains = function(text) {
    return this.toLowerCase().indexOf(text.toLowerCase()) > -1;
};