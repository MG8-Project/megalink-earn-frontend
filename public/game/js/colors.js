


function byte2Hex(n) {
	var nybHexString = "0123456789ABCDEF";
	return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }
  
  function RGB2Color(r,g,b) {
	  return '0x' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }
  
  function RGB2Color2(r,g,b) {
	  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }
  
  function getColor(item, maxitem, rank) {
  
	// if(rank == 1)
	// {
	//   red = 156;
	//   green = 209;
	//   blue  = 238;
	// }
	// else 
	if(item < 0)
	{
	  red = 29;
	  green = 30;
	  blue  = 34;
	}
	else if(item%2 == 0)
	{
	  red = 16;
	  green = 112;
	  blue  = 189;
	}
	else
	{
	  red = 248;
	  green = 248;
	  blue  = 248;
	}
  
	return RGB2Color(red,green,blue);
  }
  
  function getTxtColor(item, maxitem) {
	// var phase = 0;
	// var center = 128;
	// var width = 127;
	// var frequency = Math.PI*2/maxitem;
	//
	// red   = Math.sin(frequency*item+2+phase) * width + center;
	// green = Math.sin(frequency*item+0+phase) * width + center;
	// blue  = Math.sin(frequency*item+4+phase) * width + center;
  
	if(item < 0)
	{
	  red = 0;
	  green = 0;
	  blue  = 0;
	}
	else if(item%2 == 0)
	{
		red = 255;
		green = 255;
		blue  = 255;
	}
	else
	{
		red = 64;
		green = 128;
		blue  = 215;
	}
  
	return RGB2Color2(red,green,blue);
  }