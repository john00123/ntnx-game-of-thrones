let index = Math.floor(Math.random() * Math.floor(9));

const bg = [
  'https://media.vanityfair.com/photos/5cc9e32b1c0b0773cacd0dfd/master/w_2400,h_1800,c_limit/Helen%2520Sloan%2520-%2520HBO%2520(2).jpg',

  'https://media.vanityfair.com/photos/5cc0a4c342ae0b19c49f3b57/master/w_2400,h_1800,c_limit/Helen%2520Sloan%2520-%2520HBO%2520(2).jpg',

  'https://media.vanityfair.com/photos/5cc9e32aaa8a176cc69e3c19/master/w_2400,h_1800,c_limit/Helen%2520Sloan%2520-%2520HBO%2520(1).jpg',

  'https://pbs.twimg.com/media/Dyvy7guW0AA9Rx1.jpg:large',

  'https://media.vanityfair.com/photos/5cc9e3301d6b8739f44c2c93/master/w_2400,h_1800,c_limit/Helen%2520Sloan%2520-%2520HBO%2520(4).jpg',

  'https://fanfest.com/wp-content/uploads/2017/08/helen-sloan-hbo-photo-31.jpg',

  'https://fanfest.com/wp-content/uploads/2017/08/1-xhgwmh8z8zlfwk5ond9kbg.jpg',
  'https://fanfest.com/wp-content/uploads/2017/08/helen-sloan-hbo-photo-22.jpg',

  'https://media.vanityfair.com/photos/5cc9e32faa8a176cc69e3c1b/master/w_2400,h_1800,c_limit/Helen%2520Sloan%2520-%2520HBO%2520(5).jpg'
]


$('aside').css('background-image', `url('${bg[index]}')`);
