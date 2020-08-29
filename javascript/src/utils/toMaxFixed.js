export const pad_with_zeroes = (number, length) => {

  var my_string = '' + number;
  while (my_string.length < length) {
    my_string = my_string + '0';
  }
  return my_string;

}

export const toMaxFixed = (number, precision) => {
  var array = number.toString().split(".");
  if (array.length === 1) {
    array[1] = '0'
  }
  array.push(pad_with_zeroes(array.pop().substring(0, precision), precision));
  var trimmedNumber = array.join(".");
  return trimmedNumber
}

